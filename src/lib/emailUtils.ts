
export const createGmailUrl = (
  to: string,
  subject: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  message: string
) => {
  const body = `From: ${firstName} ${lastName}
Email: ${email}${phone ? `\nPhone: ${phone}` : ''}
Subject: ${subject}

Message:
${message}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  return gmailUrl;
};
