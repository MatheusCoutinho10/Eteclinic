//Importando o arquivo de conexão com o Banco de Dados
import database from '../repository/connectionDB.js';

//Função para inserção de clientes
async function insertClient({cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient}){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'CALL sp_registra_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const newClientData = [cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient];

	//Executando a query(concatenando)
	conn.query(sql, newClientData);

	//Encerrando a conexão
	conn.end();
}

//Função para atualização de usuários
async function updateClient(cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, address, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient, addressClient, client){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'CALL sp_atualiza_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	
	//Array com os parâmetros para serem atualizados na ordem correta
	const updateClientData = [cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, address, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient, addressClient, client];

	//Executando a query(concatenando)
	conn.query(sql, updateClientData);

	//Encerrando a conexão
	conn.end();
}

//Função para exclusão de clientes
async function deleteClient(id){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'UPDATE tbl_clientes SET cliente_deletado = 1 WHERE id_cliente = ?;';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const deleteClientData = [id];

	//Executando a query(concatenando)
	conn.query(sql, deleteClientData);

	//Encerrando a conexão
	conn.end();
}

//Exportando com chaves por se tratar de uma função direta
export default {insertClient, updateClient, deleteClient};