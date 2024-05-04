import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(6, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;
}

export function getPeriodFromDate(date: Date): string {
  const mes = date.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11 en JavaScript
  if (mes >= 1 && mes <= 6) {
      return `ene/${date.getFullYear()}-jun/${date.getFullYear()}`;
  } else {
      return `ago/${date.getFullYear()}-dec/${date.getFullYear()}`;
  }
}

export function normalizeString (str: string): string{
  return str
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();
}