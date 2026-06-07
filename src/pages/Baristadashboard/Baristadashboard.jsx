import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Налаштування базового URL для axios (заміни на свій Render, якщо тестуєш на продакшені)
const API_URL = 'https://coffee-comfort.onrender.com/api/orders';

const BaristaDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Завантаження активних замовлень (new, preparing, ready)
  const fetchActiveOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setOrders(response.data);
      setError(null);
    } catch (err) {
      console.error('Помилка завантаження замовлень:', err);
      setError('Не вдалося завантажити активні замовлення');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveOrders();
    // Оновлюємо список кожні 30 секунд для ефекту "реального часу"
    const interval = setInterval(fetchActiveOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  // Зміна статусу на проміжний (preparing або ready)
  const handleUpdateStatus = async (orderId, nextStatus) => {
    try {
      await axios.patch(`${API_URL}/${orderId}`, { status: nextStatus });
      // Оновлюємо стейт локально, щоб інтерфейс зреагував миттєво
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: nextStatus } : order
        )
      );
    } catch (err) {
      console.error('Помилка оновлення статусу:', err);
      alert('Не вдалося оновити статус замовлення');
    }
  };

  // Фінальне закриття замовлення баристою (Оплата та Видача)
  const handleCompleteOrder = async (orderId, method) => {
    try {
      await axios.patch(`${API_URL}/${orderId}`, {
        status: 'completed',
        isPaid: true,
        paymentMethod: method, // 'cash' або 'card' відповідно до схеми
      });

      // Видаляємо виконане замовлення з екрана активних
      setOrders(prevOrders =>
        prevOrders.filter(order => order._id !== orderId)
      );
      alert('Замовлення успішно виконано та оплачено!');
    } catch (err) {
      console.error('Помилка при закритті замовлення:', err);
      if (err.response?.data?.message === 'INSUFFICIENT_STOCK') {
        alert(
          `Помилка списання! На складі не вистачає інгредієнта: ${err.response.data.details}`
        );
      } else {
        alert('Не вдалося завершити замовлення. Перевірте залишки на складі.');
      }
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="p-6 text-center text-xl">Завантаження замовлень...</div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-stone-100 text-stone-800">
      <h1 className="mb-6 text-3xl font-bold text-center">Панель баристи ☕</h1>

      {error && (
        <div className="p-4 mb-6 text-center text-red-700 bg-red-100 rounded-lg">
          {error}{' '}
          <button
            onClick={fetchActiveOrders}
            className="ml-2 underline font-semibold"
          >
            Повторити
          </button>
        </div>
      )}

      {orders.length === 0 ? (
        <p className="text-center text-stone-500 text-lg">
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
                {/* Шапка картки замовлення */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-amber-700">
                    #{order.orderNumber || order._id.slice(-4)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
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
                        : 'Готово'}
                  </span>
                </div>

                {/* Дані клієнта */}
                <div className="mb-4 text-sm text-stone-600">
                  <p className="font-semibold text-stone-900 text-base">
                    {order.customerName}
                  </p>
                  <p>{order.customerPhone}</p>
                  {order.pickupTime && (
                    <p className="mt-1 text-amber-600 font-medium">
                      🕒 Час виклику: {order.pickupTime}
                    </p>
                  )}
                </div>

                <hr className="mb-3 border-stone-200" />

                {/* Список товарів у чеку */}
                <div className="space-y-2 mb-4">
                  {order.items?.map(item => (
                    <div
                      key={item._id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        <span className="font-medium text-stone-900">
                          {item.name?.uk || item.name}
                        </span>
                        <span className="text-xs text-stone-400 block">
                          slug: {item.slug}
                        </span>
                      </span>
                      <span className="font-semibold text-stone-700">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Нижня частина з ціною та кнопками дій */}
              <div>
                <div className="flex justify-between items-center mb-4 pt-2 border-t border-dashed border-stone-200">
                  <span className="text-stone-500 text-sm">До сплати:</span>
                  <span className="text-xl font-extrabold text-stone-900">
                    {order.totalPrice} грн
                  </span>
                </div>

                {/* Логіка кнопок керування статусом */}
                <div className="space-y-2">
                  {order.status === 'new' && (
                    <button
                      onClick={() => handleUpdateStatus(order._id, 'preparing')}
                      className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition"
                    >
                      Почати готувати ⏳
                    </button>
                  )}

                  {order.status === 'preparing' && (
                    <button
                      onClick={() => handleUpdateStatus(order._id, 'ready')}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
                    >
                      Приготовано (В очікуванні) 🎉
                    </button>
                  )}

                  {order.status === 'ready' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleCompleteOrder(order._id, 'cash')}
                        className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition"
                      >
                        💵 Готівка
                      </button>
                      <button
                        onClick={() => handleCompleteOrder(order._id, 'card')}
                        className="py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium text-sm transition"
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
