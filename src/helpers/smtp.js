//Fazendo as importações necessárias
import {smtp} from './sendEmailConfig.js';

//Arquivo para as configurações de envio de e-mail
//Variável objeto contendo as configurações
const config = {
	host: smtp.host,
	port: smtp.port,
	auth: {
		user: smtp.user,
		pass: smtp.pass
	},
	secure: false,
	tls: {
		rejectUnauthorized: false,
	}
};

//Exportando
export {config};