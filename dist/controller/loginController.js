"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Importando o express
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _loginServicejs = require('../service/loginService.js'); var _loginServicejs2 = _interopRequireDefault(_loginServicejs);
var _registerServicejs = require('../service/registerService.js'); var _registerServicejs2 = _interopRequireDefault(_registerServicejs);
var _userFeaturesjs = require('../helpers/userFeatures.js');

//Criando uma instância do express
const router = _express2.default.Router();

//Login
router.post('/', async (req, res) => {
	const {userEmail, password} = req.body;
	
	try{
		const userFind = await _loginServicejs2.default.login(userEmail, password);

		//Fazendo a verificação
		if(userFind.length > 0){
			//Criando as variaveis
			const {id_login, usuario} = userFind[0];

			//Criando o Token
			const token = _userFeaturesjs.generatedToken.call(void 0, id_login, usuario);
			
			res.status(200).send({message: 'Login efetuado com sucesso!', token});
		}else{
			res.status(401).send({message: 'Login incorreto!'});
		}
	}catch(err){
		res.status(500).send({message: 'Internal Server Error!'});
	}
});

//Reset de Senha
router.post('/reset', async (req, res) => {
	//Criando a variável que recebe as informações do front
	const {userEmail} = req.body;
	const newPassword = _userFeaturesjs.generatedPassword.call(void 0, );

	try{
		//Checando o email
		const emailUserDB = await _registerServicejs2.default.checkEmail(userEmail);

		//Verificando se o email existe
		if(emailUserDB.length <= 0){
		  return res.status(400).send({message: 'Email não cadastrado no sistema!'});
		}
		
		//Mandando os dados para a função
		await _loginServicejs2.default.changePassword(newPassword, userEmail);

		//Chamando a função de reset de senha
		_userFeaturesjs.sendEmail.call(void 0, userEmail, 'Matheus Coutinho', newPassword);

		//Enviando a resposta
		res.status(200).send({message: 'Senha alterada com sucesso, enviada no seu e-mail'});
	}catch(err){
		res.status(500).send({message: 'Internal Server Error!'});
	}
});

//Exportando o router
exports. default = router;