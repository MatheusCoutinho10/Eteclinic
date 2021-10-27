//Importando a conexão com o Banco de Dados
import database from '../repository/connectionDB.js';

async function insertImage(localFile){
   //Instanciando o método de conexão
   const conn = await database.connect();

   //Query de inserção no banco
   const sql = 'INSERT INTO tbl_receituario(url) VALUES(?);';

   //Inserindo no banco
   conn.query(sql, localFile);

   //Fechando a conexão com o banco
   conn.end();
}

//Exportando a função
export default {insertImage};