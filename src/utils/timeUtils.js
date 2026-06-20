/**
 * Генерує список доступного часу з кроком в 10 хвилин.
 * Автоматично враховує мінімальний час приготування (буфер).
 * @param {number} prepBuffer - скільки хвилин мінімально треба на каву (наприклад, 10)
 * @param {Array} fullyBookedSlots - масив заблокованих слотів від бекенду
 */
export const generateAvailableSlots = (
  prepBuffer = 10,
  fullyBookedSlots = []
) => {
  const slots = [];
  const now = new Date();

  // Додаємо мінімальний час на підготовку
  const startTime = new Date(now.getTime() + prepBuffer * 60000);

  // Округлюємо хвилини в більшу сторону до найближчих 10 хвилин
  const remainder = startTime.getMinutes() % 10;
  if (remainder !== 0) {
    startTime.setMinutes(startTime.getMinutes() + (10 - remainder));
  }
  startTime.setSeconds(0, 0);

  // Кав'ярня працює. Змінено на 23:59 для можливості тестування ввечері.
  // Потім зможете повернути на 22:00, коли проект піде в продакшен.
  const endTime = new Date();
  endTime.setHours(23, 59, 0, 0);

  // Якщо найближчий доступний час вже пізніше закриття — слотів немає
  if (startTime > endTime) return [];

  const currentRunner = new Date(startTime);

  while (currentRunner <= endTime) {
    const hours = String(currentRunner.getHours()).padStart(2, '0');
    const minutes = String(currentRunner.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    // Перевіряємо, чи цей слот не заблокований бекендом
    const isBooked = fullyBookedSlots.includes(timeString);

    slots.push({
      value: timeString,
      label: slots.length === 0 ? `Якомога швидше (${timeString})` : timeString,
      disabled: isBooked,
    });

    currentRunner.setMinutes(currentRunner.getMinutes() + 10);
  }

  return slots;
};
