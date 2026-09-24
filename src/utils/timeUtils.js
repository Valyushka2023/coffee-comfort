export const generateAvailableSlots = (
  interval = 10,
  fullyBookedSlots = []
) => {
  const slots = [];
  const now = new Date();

  const currentRunner = new Date(now.getTime() + 10 * 60 * 1000);

  // Округлення
  const remainder = currentRunner.getMinutes() % interval;
  if (remainder !== 0) {
    currentRunner.setMinutes(
      currentRunner.getMinutes() + (interval - remainder)
    );
  }
  currentRunner.setSeconds(0);
  currentRunner.setMilliseconds(0);

  const openTime = new Date(now);
  openTime.setHours(8, 0, 0, 0);

  const ORDER_LIFETIME_BUFFER = 20; // хвилин на видачу
  const closeTime = new Date(now);
  closeTime.setHours(21, 0, 0, 0);
  closeTime.setMinutes(closeTime.getMinutes() - ORDER_LIFETIME_BUFFER);
  // ----------------------

  if (currentRunner < openTime) {
    currentRunner.setTime(openTime.getTime());
  }

  while (currentRunner <= closeTime) {
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
