"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sendEmailConfigjs = require('./sendEmailConfig.js');

//Arquivo para as configurações de envio de e-mail
//Variável objeto contendo as configurações
const config = {
	host: _sendEmailConfigjs.smtp.host,
	port: _sendEmailConfigjs.smtp.port,
	auth: {
		user: _sendEmailConfigjs.smtp.user,
		pass: _sendEmailConfigjs.smtp.pass
	},
	secure: false,
	tls: {
		rejectUnauthorized: false,
	}
};

exports.config = config;