import { createNotification } from "./notifications";

export function copyToClipboard(content: string) {
    navigator.clipboard.writeText(content);
    createNotification('O email foi copiado para o teu clipboard :)');
  }
