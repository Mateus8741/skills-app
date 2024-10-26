import { format, formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

/**
 * Formata uma data para o formato especificado.
 * @param date - A data a ser formatada.
 * @param dateFormat - O formato desejado para a data.
 * @returns A data formatada como string.
 */
export function formatDate(date: Date, dateFormat: string): string {
  return format(date, dateFormat);
}

/**
 * Calcula o intervalo entre duas datas.
 * @param startDate - A data inicial.
 * @param endDate - A data final.
 * @returns O intervalo entre as datas.
 */
export function calculateInterval(startDate: Date, endDate: Date): string {
  return formatDistance(startDate, endDate, { addSuffix: true, locale: pt });
}
