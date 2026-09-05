import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTicketEmail({ email, name, lastName, ticketCode, qrDataUrl }) {
  console.log(`[EMAIL SERVICE] 1. Preparando envío para: ${email}`);

  try {
    const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, '');

    const data = await resend.emails.send({
      from: 'Santo Desvío Festival <onboarding@resend.dev>',
      to: [email],
      subject: '🎟️ Tu entrada para Santo Desvío Festival',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #121212; color: #ffffff; padding: 20px; text-align: center;">
          <h1 style="color: #D4AF37;">Santo Desvío Festival</h1>
          <p style="font-size: 16px;">¡Hola <strong>${name} ${lastName}</strong>! Tu pago ha sido aprobado con éxito.</p>
          <div style="background-color: #000; padding: 20px; display: inline-block; border: 2px solid #D4AF37; margin: 20px 0;">
            <img src="cid:qrcode_image" alt="QR Ticket" style="width: 200px; height: 200px;" />
            <p style="color: #D4AF37; font-weight: bold; margin-top: 10px;">Código: ${ticketCode}</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'qr-ticket.png',
          content: base64Data,
          content_type: 'image/png',
          cid: 'qrcode_image',
        },
      ],
    });

    // Validar si Resend devolvió un error interno de API
    if (data.error) {
      console.error('[EMAIL SERVICE] ❌ Error retornado por Resend:', data.error);
      return false;
    }

    console.log(`[EMAIL SERVICE] 2. 🟢 ¡Mail enviado con éxito! ID de Resend:`, data.id);
    return data;

  } catch (error) {
    console.error('[EMAIL SERVICE] ❌ Excepción al intentar enviar el correo:', error);
    throw error;
  }
}