import emailjs from '@emailjs/browser';
import { portfolioData } from '../data/portfolio';

export interface SendEmailPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  source?: 'contact_form' | 'chat_assistant';
}

export interface SendEmailResult {
  success: boolean;
  message: string;
  method?: 'emailjs' | 'web3forms' | 'mailto';
  autoReply?: string;
  errorDetail?: string;
}

export async function sendEmailMessage(payload: SendEmailPayload): Promise<SendEmailResult> {
  const { name, email, subject = 'Message from Portfolio', message, source = 'contact_form' } = payload;
  const config = portfolioData.emailConfig;

  const publicKey =
    (typeof window !== 'undefined' && localStorage.getItem('lk_emailjs_public_key')) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_PUBLIC_KEY) ||
    config.publicKey;

  const serviceId =
    (typeof window !== 'undefined' && localStorage.getItem('lk_emailjs_service_id')) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_SERVICE_ID) ||
    config.serviceId;

  const templateId =
    (typeof window !== 'undefined' && localStorage.getItem('lk_emailjs_template_id')) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_TEMPLATE_ID) ||
    config.templateId;

  const formattedSubject = `[Portfolio ${source === 'chat_assistant' ? 'Chat Assistant' : 'Inquiry'}] ${subject}`;

  const autoReplyText = config.autoReplyMessage || 
    `Thanks for contacting Latheesh K. We have received your message regarding "${subject}" and will get back to you shortly. Keep in touch with us!`;

  // Comprehensive parameter mapping to match ANY template variable names in EmailJS
  const templateParams = {
    // Sender Name
    from_name: name,
    name: name,
    user_name: name,

    // Sender Email & Reply-To
    from_email: email,
    reply_to: email,
    user_email: email,
    email: email,

    // Subject
    subject: formattedSubject,
    title: formattedSubject,

    // Message Body
    message: message,
    message_html: message,
    content: message,

    // Recipient & Auto-Reply variables
    to_email: config.recipientEmail,
    to_name: 'Latheesh K',
    recipient: config.recipientEmail,
    auto_reply: autoReplyText,
    source: source,
  };

  // 1. Try EmailJS with the user's configured Public Key
  if (publicKey && publicKey !== 'YOUR_PUBLIC_KEY' && publicKey.trim() !== '') {
    try {
      // Initialize EmailJS
      emailjs.init({
        publicKey: publicKey.trim(),
      });

      console.log('Dispatching via EmailJS...', {
        serviceId: serviceId,
        templateId: templateId,
        recipient: config.recipientEmail,
      });

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey.trim()
      );

      console.log('EmailJS response:', response);

      if (response.status === 200 || response.text === 'OK') {
        return {
          success: true,
          message: `Message transmitted to Latheesh's mailbox (${config.recipientEmail})!`,
          method: 'emailjs',
          autoReply: autoReplyText,
        };
      }
    } catch (err: any) {
      console.error('EmailJS submission error:', err);
      const errMsg = err?.text || err?.message || JSON.stringify(err);
      
      // If Web3Forms key is not provided, return the error details so user can see it
      const web3Key =
        (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY) ||
        config.web3FormsAccessKey;

      if (!web3Key) {
        return {
          success: false,
          message: `EmailJS encountered an issue: ${errMsg}`,
          errorDetail: errMsg,
          method: 'emailjs',
          autoReply: autoReplyText,
        };
      }
    }
  }

  // 2. Try Web3Forms (if access key provided)
  const web3Key =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY) ||
    config.web3FormsAccessKey;

  if (web3Key && web3Key.trim() !== '') {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3Key,
          name: name,
          email: email,
          replyto: email,
          subject: formattedSubject,
          message: message,
          to: config.recipientEmail,
        }),
      });

      const data = await res.json();
      if (data.success) {
        return {
          success: true,
          message: `Message transmitted to Latheesh (${config.recipientEmail}) via Web3Forms!`,
          method: 'web3forms',
          autoReply: autoReplyText,
        };
      }
    } catch (err) {
      console.warn('Web3Forms dispatch error:', err);
    }
  }

  // 3. Fallback: Direct Mailto
  return {
    success: true,
    message: 'Routing through your local mail client to send directly to Latheesh.',
    method: 'mailto',
    autoReply: autoReplyText,
  };
}

export function openMailtoDraft(payload: SendEmailPayload) {
  const recipient = portfolioData.personal.email;
  const subject = encodeURIComponent(`[Portfolio Inquiry] ${payload.subject || 'Opportunity Inquiry'}`);
  const body = encodeURIComponent(
    `From: ${payload.name} (${payload.email})\nSource: ${payload.source || 'Contact Form'}\n\nMessage:\n${payload.message}\n\n---\nAuto-Reply Note: Thanks for contacting Latheesh K. Keep in touch with us!`
  );
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
}
