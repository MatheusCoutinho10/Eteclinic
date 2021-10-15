"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Importando o arquivo de conexão com o Banco de Dados
var _connectionDBjs = require('../repository/connectionDB.js'); var _connectionDBjs2 = _interopRequireDefault(_connectionDBjs);

//Função para inserção de clientes
async function insertClient(cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient){
	//Instanciando a função
	const conn = await _connectionDBjs2.default.connect();

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
	const conn = await _connectionDBjs2.default.connect();

	//Ação a ser realizada no banco
	const sql = 'CALL sp_atualiza_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	
	//Array com os parâmetros para serem inseridos na ordem correta
	const updateClientData = [cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, address, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient, addressClient, client];

	//Executando a query(concatenando)
	conn.query(sql, updateClientData);

	//Encerrando a conexão
	conn.end();
}

//Exportando com chaves por se tratar de uma função direta
exports. default = {insertClient, updateClient};