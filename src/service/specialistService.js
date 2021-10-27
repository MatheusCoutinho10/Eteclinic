//Importando o arquivo de conexão com o Banco de Dados
import database from '../repository/connectionDB.js';

//Função para inserção de clientes
async function insertSpecialist(cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, registerSpecialist, nameSpecialist, telephoneSpecialist, cellPhoneSpecialist, emailSpecialist, idProfission){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'CALL sp_registra_especialista(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const newSpecialistData = [cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, registerSpecialist, nameSpecialist, telephoneSpecialist, cellPhoneSpecialist, emailSpecialist, idProfission];

	//Executando a query(concatenando)
	conn.query(sql, newSpecialistData);

	//Encerrando a conexão
	conn.end();
}

//Função para atualização de usuários
//async function updateClient(cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, address, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient, addressClient, client){
//	//Instanciando a função
//	const conn = await database.connect();
//
//	//Ação a ser realizada no banco
//	const sql = 'CALL sp_atualiza_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
//	
//	//Array com os parâmetros para serem inseridos na ordem correta
//	const updateClientData = [cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, address, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient, addressClient, client];

//	//Executando a query(concatenando)
//	conn.query(sql, updateClientData);

//	//Encerrando a conexão
//	conn.end();
//}

//Exportando com chaves por se tratar de uma função direta
export default {insertSpecialist};