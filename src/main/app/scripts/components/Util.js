import moment from 'moment'

/**
 * Get date object from date and time
 * @param date
 * @param time
 * @returns {Date}
 */
export const getDatetime = (date, time) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds())
}

/**
 * Get formatted date
 * @param date
 * @returns {String}
 */
export const getFormatedDate = (date) => {
    return moment(date).format('DD/MM/YYYY [at] h:mm a')
}
