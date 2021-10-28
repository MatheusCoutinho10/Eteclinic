//Importando o express
import express from 'express';
import db from '../service/loginService.js'
import db2 from '../service/registerService.js';
import {generatedPassword, generatedToken, sendEmail} from '../helpers/userFeatures.js';

//Criando uma instância do express
const router = express.Router();

//Login
router.post('/', async (req, res) => {
	const {emailUser, passwordUser} = req.body;
	
	try{
		const userFind = await db.login(emailUser, passwordUser);

		//Fazendo a verificação
		if(userFind.length > 0){
			//Criando as variaveis
			const {id_login, usuario} = userFind[0];

			//Criando o Token
			const token = generatedToken(id_login, usuario);
			
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
	const {emailUser} = req.body;
	const newPassword = generatedPassword();

	try{
		//Checando o email
		const emailUserDB = await db2.checkEmail(emailUser);

		//Verificando se o email existe
		if(emailUserDB.length <= 0){
		  return res.status(400).send({message: 'E-mail não cadastrado no sistema!'});
		}
		
		//Mandando os dados para a função
		await db.changePassword(newPassword, emailUser);

		//Chamando a função de reset de senha
		sendEmail(emailUser, 'Matheus Coutinho', newPassword);

		//Enviando a resposta
		res.status(200).send({message: 'Senha alterada com sucesso, enviada no seu e-mail!'});
	}catch(err){
		res.status(500).send({message: 'Internal Server Error!'});
	}
});

//Exportando o router
export default router;