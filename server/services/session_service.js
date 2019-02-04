"use strict";

const uuid = require('uuid')
const logger = require('../utils/logger')

exports.setCartIdCookie = (res, cartId) => {
    logger.info("["+ cartId+ "] Setting new cart session")
    res.locals.cartId = cartId
    res.cookie('cartId', cartId, {encode: String, expires: new Date(Date.now() + 1 * 60 * 60 * 1000) })
}

exports.setSessionContextFromCookie = (res, sessionCookie) => {
    res.locals.session = JSON.parse(sessionCookie.replace(/\\/g, '')).userId
}

exports.setCartContextFromCookie = (res, cartCookie) => {
    res.locals.cartId = cartCookie
}

exports.setSessionCookie = (res, session_id) => {
    logger.info("["+ session_id+ "] Setting new user session")
    res.locals.session = session_id
    res.cookie('epi.context', '"{\\"userId\\":\\"'+ session_id +'\\"}"', {encode: String })
}

exports.generateSessionCookie = (res) => {
    this.setSessionCookie(res, "chkw-" + uuid.v4().substr(5))
}

exports.clearSessionCookies = (res) => {

    logger.info("["+ res.locals.session+ "] ["+ res.locals.cartId+ "] Cleaning user and cart sessions")
    res.locals.cartId = null
    res.clearCookie('cartId', { path: '/' })
    res.locals.session = null
    res.clearCookie('epi.context', { path: '/' })
}
