
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

  // Use mailto: scheme for better mobile app compatibility
  const gmailUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  return gmailUrl;
};
