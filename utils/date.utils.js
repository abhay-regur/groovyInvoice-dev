import { DateTime } from 'luxon'

export const formatDateTime = (date) => {
  return DateTime.fromISO(new Date(date).toISOString()).toFormat('MM/dd/yyyy hh:mm a')
}

export const formatDate = (date, format) => {
  return DateTime.fromISO(new Date(date).toISOString()).toFormat(format)
}

export const addDaysInDate = (date, days = 0) => {
  return DateTime.fromISO(new Date(date).toISOString()).plus({ day: days });
}