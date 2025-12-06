/**
 * Utility functions per validare dati
 */

/**
 * Valida un indirizzo email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida una password (minimo 8 caratteri, almeno una maiuscola, una minuscola e un numero)
 */
export function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}

/**
 * Valida un numero di telefono italiano
 */
export function isValidItalianPhone(phone: string): boolean {
  const phoneRegex = /^(\+39|0039)?[3][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Valida un codice fiscale italiano (formato base)
 */
export function isValidCodiceFiscale(cf: string): boolean {
  const cfRegex = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i;
  return cfRegex.test(cf);
}

/**
 * Valida un URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida che una stringa non sia vuota
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Valida che un numero sia in un range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Valida che una stringa rispetti un pattern regex
 */
export function matchesPattern(value: string, pattern: string | RegExp): boolean {
  const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
  return regex.test(value);
}

