"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Importando o arquivo de conexão com o Banco de Dados
var _connectionDBjs = require('../repository/connectionDB.js'); var _connectionDBjs2 = _interopRequireDefault(_connectionDBjs);

//Função para inserção de usuários
async function insertUser(email, password, userName){
	//Instanciando a função
	const conn = await _connectionDBjs2.default.connect();

	//Ação a ser realizada no banco
	const sql = 'INSERT INTO tbl_usuarios(email, senha, usuario) VALUES(?,?,?)';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const newUserData = [email, password, userName];

	//Executando a query(concatenando)
	conn.query(sql, newUserData);

	//Encerrando a conexão
	conn.end();
}

//Função para atualização de usuários
async function updateUser(email, password, userName, id){
	//Instanciando a função
	const conn = await _connectionDBjs2.default.connect();

	//Ação a ser realizada no banco
	const sql = 'UPDATE tbl_usuarios SET email = ?, senha = ?, usuario = ? WHERE id_login = ?;';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const updateUserData = [email, password, userName, id];

	//Executando a query(concatenando)
	conn.query(sql, updateUserData);

	//Encerrando a conexão
	conn.end();
}

//Função para não cadastrar dois emails iguais
async function checkEmail(userEmail){
	//Instanciando a função
	const conn = await _connectionDBjs2.default.connect();

	//Ação a ser realizada no banco
	const sql = 'SELECT * FROM tbl_usuarios WHERE email=?';

	//Retorna a posição rows do array retornado, onde está contido os dados encontrados no select
	const [rows] = await conn.query(sql, userEmail);

	//Finalizando a conexão
	conn.end();

	//Retornando o resultado
	return rows;
}

//Exportando com chaves por se tratar de uma função direta
exports. default = {insertUser, updateUser, checkEmail};