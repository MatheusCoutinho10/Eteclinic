//Importando o arquivo de conexão com o Banco de Dados
import database from '../repository/connectionDB.js';

//Função para inserção de clientes
async function insertProfession({nameProfession}){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'INSERT INTO tbl_profissoes(nome_profissao) VALUES(?);';
	
	//Executando a query(concatenando)
	conn.query(sql, nameProfession);

	//Encerrando a conexão
	conn.end();
}

//Exportando com chaves por se tratar de uma função direta
export default {insertProfession};