export const generateAvailableSlots = (
  interval = 10,
  fullyBookedSlots = []
) => {
  const slots = [];
  const now = new Date();

  // Додаємо 10 хвилин до поточного часу для першого доступного слота
  const currentRunner = new Date(now.getTime() + 10 * 60 * 1000);

  // Формуємо робочий час з 08:00 до 21:00
  const openTime = new Date(now);
  openTime.setHours(8, 0, 0, 0);

  const closeTime = new Date(now);
  closeTime.setHours(21, 0, 0, 0);

  // Якщо поточний час раніше за відкриття — починаємо з 08:00
  if (currentRunner < openTime) {
    currentRunner.setTime(openTime.getTime());
  }

  while (currentRunner < closeTime) {
    const hours = String(currentRunner.getHours()).padStart(2, '0');
    const minutes = String(currentRunner.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    const isBooked = fullyBookedSlots.includes(timeString);
    const isFirstSlot = slots.length === 0;

    slots.push({
      value: timeString,
      isAsap: isFirstSlot,
      time: timeString,
      label: timeString,
      disabled: isBooked,
    });

    currentRunner.setMinutes(currentRunner.getMinutes() + interval);
  }

  return slots;
};
