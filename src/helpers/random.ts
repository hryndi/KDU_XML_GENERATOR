import { v4 as uuidv4 } from "uuid";

const usedIds = new Set<string>();

export function generateUniqueID(length: number = 6): string {
  if (length < 1 || length > 20) {
    throw new Error("Length must be between 1 and 20 digits");
  }
  let id: string;

  do {
    // Use UUID to generate a base random source
    const uuid = uuidv4();

    // Strip non-digits and take the first 6 digits
    const digitsOnly = uuid.replace(/\D/g, "");
    // Ensure we have at least 6 digits
    id = digitsOnly.slice(0, length).padStart(length, "0");

    // If we didn’t get 6 digits, retry
  } while (usedIds.has(id) || id.length < 6);

  usedIds.add(id);
  return id;
}
