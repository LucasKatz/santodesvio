import QRCode from 'qrcode';

export function generateTicketCode() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SD-FEST-${timestamp}-${randomStr}`;
}

export async function generateQRCode(text) {
  try {
    return await QRCode.toDataURL(text, {
      color: { dark: '#010101', light: '#F0EDE4' },
      margin: 1,
      width: 300,
    });
  } catch (err) {
    console.error('Error generando QR:', err);
    return null;
  }
}