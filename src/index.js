//Importando o Express
import express from 'express';
import routes from './routes.js';

//Instanciando um objeto da classe Express
//Habilitando o trabalho com json
const app = express();
app.use(express.json());

//Redirecionando as requisições para o arquivo de rotas
app.use('/', routes);

//Variável de ambiente que verifica se existe o primeiro valor, se não existir ele pega o 3000;
const PORT = process.env.PORT || 3333;

//Startando o servidor
app.listen(PORT, () => {
   console.log('Server online!');
});