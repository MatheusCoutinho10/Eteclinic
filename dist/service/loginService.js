"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Importando a conexão com o banco
var _connectionDBjs = require('../repository/connectionDB.js'); var _connectionDBjs2 = _interopRequireDefault(_connectionDBjs);

//Criando a função login
async function login(userEmail, password){
	//Fazendo a conexão com o banco
	const conn = await _connectionDBjs2.default.connect();
	
	//Ação que será executada no banco
	const sql = 'SELECT * FROM tbl_usuarios WHERE email = ? AND senha = ? AND usuario_deletado = 0';

	//Criando um array para ordenar de forma correta
	const dataLogin = [userEmail, password];

	//[rows] - Pega só as informações do resultado de linhas do Array
	const [rows] = await conn.query(sql, dataLogin);
	
	//Fechando a conexão com a base
	conn.end();

	//Retornando a rows
	return rows;
}

//Criando a função de reset de senha
async function changePassword(newPassword, userEmail){
	//Fazendo a conexão com o banco
	const conn = await _connectionDBjs2.default.connect();

	//Ação que será executada no banco
	const sql = 'UPDATE tbl_usuarios SET senha = ? WHERE email = ? AND usuario_deletado = 0';

	//Criando um array para ordenar de forma correta
	const dataNewPassword = [newPassword, userEmail];

	//Executando a query
	await conn.query(sql, dataNewPassword);

	//Fechando a conexão com a base
	conn.end();
}

exports. default = {login, changePassword};