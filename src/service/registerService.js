//Importando o arquivo de conexão com o Banco de Dados
import database from '../repository/connectionDB.js';

//Função para inserção de usuários
async function insertUser(emailUser, passwordUser, nameUser){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'INSERT INTO tbl_usuarios(email, senha, usuario) VALUES(?, sha2(?, 256), ?)';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const newUserData = [emailUser, passwordUser, nameUser];

	//Executando a query(concatenando)
	conn.query(sql, newUserData);

	//Encerrando a conexão
	conn.end();
}

//Função para atualização de usuários
async function updateUser(emailUser, passwordUser, nameUser, idUser){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'UPDATE tbl_usuarios SET email = ?, senha = sha2(?, 256), usuario = ? WHERE id_login = ?;';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const updateUserData = [emailUser, passwordUser, nameUser, idUser];

	//Executando a query(concatenando)
	conn.query(sql, updateUserData);

	//Encerrando a conexão
	conn.end();
}

//Função para não cadastrar dois emails iguais
async function checkEmail(emailUser){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'SELECT * FROM tbl_usuarios WHERE email=?';

	//Retorna a posição rows do array retornado, onde está contido os dados encontrados no select
	const [rows] = await conn.query(sql, emailUser);

	//Finalizando a conexão
	conn.end();

	//Retornando o resultado
	return rows;
}

//Função para exclusão de clientes
async function deleteUser(idUser){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'UPDATE tbl_usuarios SET usuario_deletado = 1 WHERE id_login = ?;';

	//Executando a query(concatenando)
	conn.query(sql, idUser);

	//Encerrando a conexão
	conn.end();
}

//Exportando com chaves por se tratar de uma função direta
export default {insertUser, updateUser, checkEmail, deleteUser};