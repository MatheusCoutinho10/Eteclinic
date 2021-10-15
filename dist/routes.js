"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Importando o express
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _registerControllerjs = require('./controller/register/registerController.js'); var _registerControllerjs2 = _interopRequireDefault(_registerControllerjs);
var _loginControllerjs = require('./controller/loginController.js'); var _loginControllerjs2 = _interopRequireDefault(_loginControllerjs);
var _clientControllerjs = require('./controller/clientController.js'); var _clientControllerjs2 = _interopRequireDefault(_clientControllerjs);
var _jwtjs = require('./middlewares/jwt.js');

//Utilizando o método "use" do express
const router = _express2.default.Router();

//Rotas de Usuário
router.use('/register', _registerControllerjs2.default);
router.use('/register/update', _registerControllerjs2.default);

//Rota de Login
router.use('/login', _loginControllerjs2.default);

//Rotas de Cliente
router.use('/client', _clientControllerjs2.default);
router.use('/client/update', _clientControllerjs2.default);

router.use('/*', (req, res) => {
   res.status(404).send({message: 'Caminho não encontrado!'});
});

exports. default = router;