export const generateBookingEmailHtml = data => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
      <h2 style="color: #3e2b24; text-align: center;">☕ Нова заявка CoffeeComfort</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; background: #f9f9f9;"><b>Ім'я:</b></td>
          <td style="padding: 10px; border: 1px solid #eee;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee;"><b>Email:</b></td>
          <td style="padding: 10px; border: 1px solid #eee;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; background: #f9f9f9;"><b>Телефон:</b></td>
          <td style="padding: 10px; border: 1px solid #eee;">${data.phone}</td>
        </tr>
        
        <tr style="background-color: #fff9f4;">
          <td style="padding: 10px; border: 1px solid #eee; color: #d35400;"><b>ОБРАНА ЗОНА:</b></td>
          <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; color: #d35400;">
            ${data.selectedZone || 'Не вказано'}
          </td>
        </tr>
        
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; background: #f9f9f9;"><b>Період бронювання:</b></td>
          <td style="padding: 10px; border: 1px solid #eee;">${data.bookingStartDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee;"><b>Коментар:</b></td>
          <td style="padding: 10px; border: 1px solid #eee;">${data.comment || '—'}</td>
        </tr>
      </table>
    </div>
  `;
};

export const generateCallbackEmailHtml = callback => {
  return `
    <table style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <thead style="background-color: #f8f9fa;">
        <tr>
          <th colspan="2" style="padding: 16px; font-size: 20px; text-align: left; color: #333;">
            📞 Новий запит на дзвінок CoffeeComfort
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style="background-color: #ffffff;">
          <td style="padding: 12px; font-weight: bold; width: 30%;">Ім’я</td>
          <td style="padding: 12px;">${callback.name}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 12px; font-weight: bold;">Телефон</td>
          <td style="padding: 12px;">
            <a href="tel:${callback.phone}" style="color: #4b2c20; text-decoration: none; font-weight: bold;">
              ${callback.phone}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  `;
};
