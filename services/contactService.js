import emailjs from '@emailjs/browser';

// Reemplaza estas constantes con las claves de tu panel en EmailJS (https://dashboard.emailjs.com)
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'TU_SERVICE_ID';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'TU_TEMPLATE_ID';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'TU_PUBLIC_KEY';

export async function sendContactEmail(formData) {
  try {
    const templateParams = {
      user_name: formData.name,
      user_lastname: formData.lastName,
      user_email: formData.email,
      user_phone: formData.phone,
      message: formData.message,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return { success: true, response };
  } catch (error) {
    console.error('[CONTACT SERVICE] ❌ Error enviando la consulta:', error);
    return { success: false, error };
  }
}