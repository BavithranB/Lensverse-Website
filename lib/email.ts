import { Resend } from 'resend';

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date?: string;
  location?: string;
  budget?: string;
  message?: string;
}

export async function sendBookingEmail(data: BookingData) {
  const apiKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.BOOKING_EMAIL || 'lensversecontact@gmail.com';

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const resend = new Resend(apiKey);

  try {
    const { data: result, error } = await resend.emails.send({
      from: 'Lensverse <onboarding@resend.dev>',
      to: [emailTo],
      subject: `New Lensverse Booking — ${data.service} — ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #1a1a1a;
                color: #fafafa;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background-color: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #1a1a1a;
                display: block;
                margin-bottom: 5px;
              }
              .value {
                color: #666;
                padding: 10px;
                background-color: white;
                border-radius: 4px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Booking Request</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Name:</span>
                  <div class="value">${data.name}</div>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <div class="value">${data.email}</div>
                </div>
                <div class="field">
                  <span class="label">Phone:</span>
                  <div class="value">${data.phone}</div>
                </div>
                <div class="field">
                  <span class="label">Service:</span>
                  <div class="value">${data.service}</div>
                </div>
                <div class="field">
                  <span class="label">Preferred Date:</span>
                  <div class="value">${data.date || 'Not specified'}</div>
                </div>
                <div class="field">
                  <span class="label">Location:</span>
                  <div class="value">${data.location || 'Not specified'}</div>
                </div>
                <div class="field">
                  <span class="label">Budget Range:</span>
                  <div class="value">${data.budget || 'Not specified'}</div>
                </div>
                <div class="field">
                  <span class="label">Message:</span>
                  <div class="value">${data.message || 'No message provided'}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Lensverse Booking Request

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service}
Preferred Date: ${data.date || 'Not specified'}
Location: ${data.location || 'Not specified'}
Budget Range: ${data.budget || 'Not specified'}
Message: ${data.message || 'No message provided'}
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

