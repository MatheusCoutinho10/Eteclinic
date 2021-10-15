"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Importando o Express
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _routesjs = require('./routes.js'); var _routesjs2 = _interopRequireDefault(_routesjs);

//Instanciando um objeto da classe Express
//Habilitando o trabalho com json
const app = _express2.default.call(void 0, );
app.use(_express2.default.json());

//Redirecionando as requisições para o arquivo de rotas
app.use('/', _routesjs2.default);

//Variável de ambiente que verifica se existe o primeiro valor, se não existir ele pega o 3000;
const PORT = process.env.PORT || 3000;

//Startando o servidor
app.listen(PORT, () => {
   console.log('Server online!');
});