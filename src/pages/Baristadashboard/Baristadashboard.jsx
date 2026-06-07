import { useEffect, useState } from 'react';
import axios from 'axios';

// Базовий URL твого бекенду на Render
const API_URL = 'https://coffee-comfort.onrender.com/api/orders';

const BaristaDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Завантаження замовлень із сервера
  const fetchOrders = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log('--- ЗАВАНТАЖЕНО ЗАМОВЛЕННЯ ---', response.data);
      // Фільтруємо, щоб бариста бачив лише активні замовлення (нові, в процесі, готові)
      const activeOrders = response.data.filter(
        order => order.status !== 'completed'
      );
      setOrders(activeOrders);
      setError(null);
    } catch (err) {
      console.error('Помилка завантаження активних замовлень:', err);
      setError('Не вдалося завантажити замовлення');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 20000); // Оновлення кожні 20 секунд
    return () => clearInterval(interval);
  }, []);

  // Крок 1: Зміна проміжного статусу (наприклад, з new -> preparing або з preparing -> ready)
  const handleStatusChange = async (orderId, nextStatus) => {
    try {
      console.log(
        `Відправка PATCH на оновлення статусу до: ${nextStatus} для ID: ${orderId}`
      );

      const response = await axios.patch(`${API_URL}/${orderId}`, {
        status: nextStatus,
      });

      console.log('Успішна відповідь сервера:', response.data);

      // Локально оновлюємо замовлення у стейті
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: nextStatus } : order
        )
      );
    } catch (err) {
      console.error('Помилка оновлення статусу:', err);
      const serverMsg =
        err.response?.data?.message || 'Невідома помилка бекенду';
      alert(`Не вдалося оновити статус: ${serverMsg}`);
    }
  };

  // Крок 2: Фінальне закриття замовлення через Оплату (Готівка / Термінал)
  const handlePaymentAndComplete = async (orderId, method) => {
    try {
      console.log(
        `Спроба закрити замовлення ${orderId}. Метод оплати: ${method}`
      );

      // Передаємо параметри строго за схемою: статус завершено, оплачено — true, метод збережено
      const response = await axios.patch(`${API_URL}/${orderId}`, {
        status: 'completed',
        isPaid: true,
        paymentMethod: method, // 'cash' або 'card'
      });

      console.log(
        'Замовлення успішно оплачене та закрите на бекенді:',
        response.data
      );

      // Видаляємо виконане замовлення з екрана баристи
      setOrders(prev => prev.filter(order => order._id !== orderId));
      alert(
        `Замовлення успішно оплачено (${method === 'cash' ? 'Готівка' : 'Термінал'}) та закрите!`
      );
    } catch (err) {
      console.error('Помилка під час оплати/завершення замовлення:', err);
      if (
        err.response?.data?.message === 'INSUFFICIENT_STOCK' ||
        err.response?.data?.message === 'OUT_OF_STOCK_RESERVE'
      ) {
        alert(
          `Помилка списання! На складі не вистачає інгредієнтів: ${err.response.data.details || ''}`
        );
      } else {
        const errorDetails = err.response?.data?.message || err.message;
        alert(`Не вдалося провести оплату: ${errorDetails}`);
      }
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="p-6 text-center text-xl">
        Оновлення списку замовлень...
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-stone-100 text-stone-800">
      <h1 className="mb-6 text-3xl font-bold text-center">Панель баристи ☕</h1>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded text-center">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <p className="text-center text-stone-500">
          Зараз немає активних замовлень. Відпочиньте! 😊
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => (
            <div
              key={order._id}
              className="p-5 bg-white rounded-xl shadow-md border border-stone-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-amber-700">
                    #{order.orderNumber || order._id.slice(-4)}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      order.status === 'new'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'preparing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {order.status === 'new'
                      ? 'Нове'
                      : order.status === 'preparing'
                        ? 'Готується'
                        : 'Очікує видачі'}
                  </span>
                </div>

                <div className="mb-3 text-sm">
                  <p className="font-bold text-base text-stone-900">
                    {order.customerName}
                  </p>
                  <p className="text-stone-500">{order.customerPhone}</p>
                  {order.pickupTime && (
                    <p className="text-amber-600 mt-1">
                      🕒 На час: {order.pickupTime}
                    </p>
                  )}
                </div>

                <hr className="my-2 border-stone-200" />

                <div className="space-y-1 mb-4">
                  {order.items?.map(item => (
                    <div
                      key={item._id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-stone-800">
                        {item.name?.uk || item.name}
                      </span>
                      <span className="font-semibold">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4 pt-2 border-t border-dashed border-stone-200">
                  <span className="text-stone-500 text-sm">До сплати:</span>
                  <span className="text-xl font-extrabold text-stone-900">
                    {order.totalPrice} грн
                  </span>
                </div>

                {/* Динамічні кнопки керування статусом */}
                <div className="space-y-2">
                  {order.status === 'new' && (
                    <button
                      onClick={() => handleStatusChange(order._id, 'preparing')}
                      className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition"
                    >
                      Почати готувати ⏳
                    </button>
                  )}

                  {order.status === 'preparing' && (
                    <button
                      onClick={() => handleStatusChange(order._id, 'ready')}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
                    >
                      Приготовано / Очікує клієнта 🎉
                    </button>
                  )}

                  {(order.status === 'ready' || !order.status) && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() =>
                          handlePaymentAndComplete(order._id, 'cash')
                        }
                        className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition"
                      >
                        💵 Готівка
                      </button>
                      <button
                        onClick={() =>
                          handlePaymentAndComplete(order._id, 'card')
                        }
                        className="py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition"
                      >
                        💳 Термінал
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaristaDashboard;
