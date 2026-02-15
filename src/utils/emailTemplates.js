export const generateBookingEmailHtml = booking => {
  return `
    <table style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <thead style="background-color: #f8f9fa;">
        <tr><th colspan="2" style="padding: 16px; font-size: 20px; text-align: left; color: #333;">
  ☕️ Нова заявка CoffeeComfort
</th>
        </tr>
      </thead>
      <tbody>
      
        <tr style="background-color: #ffffff;">
          <td style="padding: 12px; font-weight: bold;">Ім’я</td>
          <td style="padding: 12px;">${booking.name}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 12px; font-weight: bold;">Email</td>
          <td style="padding: 12px;">${booking.email}</td>
        </tr>
        <tr style="background-color: #ffffff;">
          <td style="padding: 12px; font-weight: bold;">Телефон</td>
          <td style="padding: 12px;">${booking.phone || '—'}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 12px; font-weight: bold;">Період бронювання</td>
          <td style="padding: 12px;">
             ${booking.bookingStartDate} 
          </td>
        </tr>
        ${
          booking.comment
            ? `<tr style="background-color: #ffffff;">
                <td style="padding: 12px; font-weight: bold;">Коментар</td>
                <td style="padding: 12px;">${booking.comment}</td>
              </tr>`
            : ''
        }
      </tbody>
    </table>
  `;
};
