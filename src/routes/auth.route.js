const express = require('express')
const router = express.Router()
const controller = require("../controller/auth.controller.js");

/**
 *  @path POST /api/auth/register
 */
router.post('/register',controller.registerController)


/**
 * @path POST /api/auth/login
 */
router.post('/login', controller.loginController)


module.exports = router