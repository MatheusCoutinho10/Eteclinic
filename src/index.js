//Fazendo as importações
import express from 'express';
import routes from './routes.js';


const app = express(); //Instanciando um objeto da classe Express
app.use(express.json()); //Habilitando o trabalho com json

//Redirecionando as requisições para o arquivo de rotas
app.use('/', routes);

//Variável de ambiente que verifica se existe o primeiro valor, se não existir ele pega o 3333;
const PORT = process.env.PORT || 3333;

//Startando o servidor
app.listen(PORT, () => {
   console.log('Server online!');
});