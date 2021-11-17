//Importando o arquivo de conexão com o Banco de Dados
import database from '../repository/connectionDB.js';

//Função para inserção de especialistas
async function insertSpecialist({cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, registerSpecialist, nameSpecialist, telephoneSpecialist, cellPhoneSpecialist, emailSpecialist, idProfession}){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'CALL sp_registra_especialista(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const newSpecialistData = [cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, registerSpecialist, nameSpecialist, telephoneSpecialist, cellPhoneSpecialist, emailSpecialist, idProfession];

	//Executando a query(concatenando)
	await conn.query(sql, newSpecialistData);

	//Encerrando a conexão com o Banco de Dados
	conn.end();
}

//Função para validar os Especialistas
async function validateSpecialist(idSpecialist) {
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'SELECT * FROM tbl_especialistas WHERE especialista_deletado = 0 AND id_especialista = ?;';
	
	//Guardando a execução da query em rows
	const [rows] = await conn.query(sql, idSpecialist);

	//Encerrando a conexão
	conn.end();

	//Retornando rows para quem chamar essa função
	return rows;
}

//Função para atualização de especialistas
async function updateSpecialist({cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, registerSpecialist, nameSpecialist, telephoneSpecialist, cellPhoneSpecialist, emailSpecialist, idAddress, idProfession}, idSpecialist){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'CALL sp_atualiza_especialista(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const updateSpecialistData = [cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, registerSpecialist, nameSpecialist, telephoneSpecialist, cellPhoneSpecialist, emailSpecialist, idAddress, idProfession, idSpecialist];

	//Executando a query(concatenando)
	conn.query(sql, updateSpecialistData);

	//Encerrando a conexão
	conn.end();
}

//Função para exclusão de especialistas
async function deleteSpecialist(idSpecialist){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'UPDATE tbl_especialistas SET especialista_deletado = 1 WHERE id_especialista = ?;';

	//Executando a query(concatenando)
	conn.query(sql, idSpecialist);

	//Encerrando a conexão
	conn.end();
}

//Exportando com chaves por se tratar de uma função direta
export default {insertSpecialist, validateSpecialist, updateSpecialist, deleteSpecialist};