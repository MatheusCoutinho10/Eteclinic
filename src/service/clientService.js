//Importando o arquivo de conexão com o Banco de Dados
import database from '../repository/connectionDB.js';

//Função para inserção de clientes
async function insertClient({cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, cpfClient, nameClient, telephoneClient, cellPhoneClient, emailClient, bloodTypeClient}){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'CALL sp_registra_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const newClientData = [cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, cpfClient, nameClient, telephoneClient, cellPhoneClient, emailClient, bloodTypeClient];

	//Executando a query(concatenando)
	conn.query(sql, newClientData);

	//Encerrando a conexão
	conn.end();
}

//Função para validar os Clientes
async function validateClient(idClient) {
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'SELECT * FROM tbl_clientes WHERE cliente_deletado = 0 AND id_cliente = ?;';
	
	//Guardando a execução da query em rows
	const [rows] = await conn.query(sql, idClient);

	//Encerrando a conexão
	conn.end();

	//Retornando rows para quem chamar essa função
	return rows;
}

//Função para atualização de Clientes
async function updateClient({cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, cpfClient, nameClient, telephoneClient, cellPhoneClient, emailClient, bloodTypeClient, idAddress}, idClient){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'CALL sp_atualiza_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
	
	//Array com os parâmetros para serem atualizados na ordem correta
	const updateClientData = [cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, cpfClient, nameClient, telephoneClient, cellPhoneClient, emailClient, bloodTypeClient, idAddress, idClient];

	//Executando a query(concatenando)
	conn.query(sql, updateClientData);

	//Encerrando a conexão
	conn.end();
}

//Função para exclusão de clientes
async function deleteClient(idClient){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'UPDATE tbl_clientes SET cliente_deletado = 1 WHERE id_cliente = ?;';

	//Executando a query(concatenando)
	conn.query(sql, idClient);

	//Encerrando a conexão
	conn.end();
}

//Exportando com chaves por se tratar de uma função direta
export default {insertClient, validateClient, updateClient, deleteClient};