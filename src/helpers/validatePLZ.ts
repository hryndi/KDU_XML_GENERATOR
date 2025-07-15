const postalCodePatterns: Record<string, RegExp> = {
  AT: /^\d{4}$/, // Austria
  BE: /^\d{4}$/, // Belgium
  BG: /^\d{4}$/, // Bulgaria
  CY: /^[0-9]{4}$/, // Cyprus
  CZ: /^\d{3}\s?\d{2}$/, // Czech Republic
  DE: /^\d{5}$/, // Germany
  DK: /^\d{4}$/, // Denmark
  EE: /^\d{5}$/, // Estonia
  ES: /^\d{5}$/, // Spain
  FI: /^\d{5}$/, // Finland
  FR: /^\d{5}$/, // France
  GR: /^\d{3}\s?\d{2}$/, // Greece
  HR: /^\d{5}$/, // Croatia
  HU: /^\d{4}$/, // Hungary
  IE: /^[A-Z]\d{2}\s?[A-Z0-9]{4}$/, // Ireland (simplified)
  IT: /^\d{5}$/, // Italy
  LT: /^\d{5}$/, // Lithuania
  LU: /^\d{4}$/, // Luxembourg
  LV: /^\d{4}$/, // Latvia
  MT: /^[A-Z]{3}\s?\d{2,4}$/, // Malta
  NL: /^\d{4}\s?[A-Z]{2}$/, // Netherlands
  PL: /^\d{2}-\d{3}$/, // Poland
  PT: /^\d{4}-\d{3}$/, // Portugal
  RO: /^\d{6}$/, // Romania
  SE: /^\d{3}\s?\d{2}$/, // Sweden
  SI: /^\d{4}$/, // Slovenia
  SK: /^\d{3}\s?\d{2}$/, // Slovakia
};

export function validatePostalCodeEU(countryCode: string, postalCode: string): boolean {
  const pattern = postalCodePatterns[countryCode.toUpperCase()];
  if (!pattern) {
    throw new Error(`Postal code validation not supported for country code: ${countryCode}`);
  }
  return pattern.test(postalCode.trim());
}
