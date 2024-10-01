import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

export function generateUniqueCode(prefix: string): string {
  const uuid: string = uuidv4();
  const hash: string = CryptoJS.SHA256(uuid).toString(CryptoJS.enc.Hex);
  const uniqueCode: string =
    prefix + parseInt(hash, 16).toString(36).slice(0, 10).toUpperCase();

  // Return the unique code with the prefix
  return uniqueCode;
}
