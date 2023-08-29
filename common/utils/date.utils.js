import { DateTime } from 'luxon'

export const formatDate = (date) => {
  return DateTime.fromISO(new Date(date).toISOString()).toFormat('MM/dd/yyyy hh:mm a')
}
