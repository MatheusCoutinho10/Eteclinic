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

//Função para atualização de especialistas
async function updateSpecialist(cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, registerAddress, registerSpecialist, nameSpecialist, telephoneSpecialist, cellPhoneSpecialist, emailSpecialist, idAddress, idProfission, idSpecialist){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'CALL sp_atualiza_especialista(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const updateSpecialistData = [cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, registerAddress, registerSpecialist, nameSpecialist, telephoneSpecialist, cellPhoneSpecialist, emailSpecialist, idAddress, idProfission, idSpecialist];

	//Executando a query(concatenando)
	conn.query(sql, updateSpecialistData);

	//Encerrando a conexão
	conn.end();
}

//Função para exclusão de especialistas
async function deleteSpecialist(id){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'UPDATE tbl_especialistas SET especialista_deletado = 1 WHERE id_especialista = ?;';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const deleteSpecialistData = [id];

	//Executando a query(concatenando)
	conn.query(sql, deleteSpecialistData);

	//Encerrando a conexão
	conn.end();
}

//Exportando com chaves por se tratar de uma função direta
export default {insertSpecialist, updateSpecialist, deleteSpecialist};