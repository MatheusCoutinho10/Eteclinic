//Importando a conexão com o banco
import database from '../repository/connectionDB.js';

//Criando a função login
async function login(emailUser, passwordUser){
	//Fazendo a conexão com o banco
	const conn = await database.connect();
	
	//Ação que será executada no banco
	const sql = 'SELECT * FROM tbl_usuarios WHERE email = ? AND senha = sha2(?, 256) AND usuario_deletado = 0';

	//Criando um array para ordenar de forma correta
	const dataLogin = [emailUser, passwordUser];

	//[rows] - Pega só as informações do resultado de linhas do Array
	const [rows] = await conn.query(sql, dataLogin);
	
	//Fechando a conexão com a base
	conn.end();

	//Retornando a rows
	return rows;
}

//Criando a função de reset de senha
async function changePassword(newPassword, emailUser){
	//Fazendo a conexão com o banco
	const conn = await database.connect();

	//Ação que será executada no banco
	const sql = 'UPDATE tbl_usuarios SET senha = sha2(?, 256) WHERE email = ? AND usuario_deletado = 0';

	//Criando um array para ordenar de forma correta
	const dataNewPassword = [newPassword, emailUser];

	//Executando a query
	await conn.query(sql, dataNewPassword);

	//Fechando a conexão com a base
	conn.end();
}

export default {login, changePassword};