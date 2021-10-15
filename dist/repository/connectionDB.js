"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Importando o mysql2 que foi instalado
var _promise = require('mysql2/promise'); var _promise2 = _interopRequireDefault(_promise);

async function connect(){
	//Criando o objeto com os dados da conexão com o banco
	const datainfo = {
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'eteclinic'
	}

	//Criando a conexão
	const connection = await _promise2.default.createConnection(datainfo);

	//Retornando a função
	return connection;
}

//Exportando a função para ser usada em outros arquivos
exports. default = {connect};