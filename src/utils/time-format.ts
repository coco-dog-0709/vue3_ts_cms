const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
import dayjs from 'dayjs'

export default function timeFormat(time: string | number, format = TIME_FORMAT): string {
  return dayjs(time).format(format)
}
