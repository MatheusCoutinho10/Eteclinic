//Importando o mysql2 que foi instalado
import mysql from 'mysql2/promise';

async function connect(){
	//Criando o objeto com os dados da conexão com o banco
	const datainfo = {
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'eteclinic'
	}

	//Criando a conexão
	const connection = await mysql.createConnection(datainfo);

	//Retornando a função
	return connection;
}

//Exportando a função para ser usada em outros arquivos
export default {connect};