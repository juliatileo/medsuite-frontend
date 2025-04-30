export function validatePhone(phone: string) {
  const phoneRegex = /^\d{11}$/;

  return phoneRegex.test(phone);
}
