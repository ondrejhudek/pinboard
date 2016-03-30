import moment from 'moment'
import CryptoJS from 'crypto-js'

import { SECRET_KEY } from '../../../../../config'

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

/**
 * Encrypt password
 * @param string
 * @returns {string}
 */
export const encrypt = (string) => {
    return CryptoJS.AES.encrypt(string, SECRET_KEY).toString()
}

/**
 * Decrypt password
 * @param string
 * @returns {string}
 */
export const decrypt = (string) => {
    return CryptoJS.AES.decrypt(string, SECRET_KEY).toString(CryptoJS.enc.Utf8)
}
