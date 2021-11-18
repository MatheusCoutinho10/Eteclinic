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

//Função para validar as Profissões
async function validateProfession(idProfession) {
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'SELECT * FROM tbl_profissoes WHERE profissao_deletada = 0 AND id_profissao = ?;';
	
	//Guardando a execução da query em rows
	const [rows] = await conn.query(sql, idProfession);

	//Encerrando a conexão
	conn.end();

	//Retornando rows para quem chamar essa função
	return rows;
}

//Função para atualização de Profissões
async function updateProfession({nameProfession}, idProfession){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'UPDATE tbl_profissoes SET nome_profissao = ? WHERE id_profissao = ?;';
	
	//Array com os parâmetros para serem atualizados na ordem correta
	const updateProfessionData = [nameProfession, idProfession];

	//Executando a query(concatenando)
	conn.query(sql, updateProfessionData);

	//Encerrando a conexão
	conn.end();
}

//Função para exclusão de profissões
async function deleteProfession(idProfession){
	//Instanciando a função
	const conn = await database.connect();

	//Ação a ser realizada no banco
	const sql = 'UPDATE tbl_profissoes SET profissao_deletada = 1 WHERE id_profissao = ?;';

	//Executando a query(concatenando)
	conn.query(sql, idProfession);

	//Encerrando a conexão
	conn.end();
}

//Exportando com chaves por se tratar de uma função direta
export default {insertProfession, validateProfession, updateProfession, deleteProfession};