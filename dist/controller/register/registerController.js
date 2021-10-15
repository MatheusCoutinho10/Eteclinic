"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Importando o Express
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _registerServicejs = require('../../service/registerService.js'); var _registerServicejs2 = _interopRequireDefault(_registerServicejs);
var _expressvalidator = require('express-validator'); //Usado para as validações

//Instanciando um objeto
const router = _express2.default.Router();

//Rota para inserir usuários
router.post('/', [
  _expressvalidator.body.call(void 0, 'email').isEmail().withMessage('Informe um e-mail valido'),
  _expressvalidator.body.call(void 0, 'password').isLength({min: 8, max: 15}).withMessage('Informe uma senha entre 8 e 15 caracteres!'),
  _expressvalidator.body.call(void 0, 'password').isNumeric().withMessage('A senha deve ser numérica!'),
  _expressvalidator.body.call(void 0, 'userName').custom((userName) => {
    if(userName != 'Jubileu'){
      return Promise.reject('Nome de usuário inválido!');
    }
    return true;
  })
], async (req, res) => {
   //Variável para mandar para a validação a requisição
   const errors = _expressvalidator.validationResult.call(void 0, req);

   //Se errors não está vazia
   if(!errors.isEmpty()){
     return res.status(400).send({errors: errors.array()});
   }

   //Para cadastrar informe e-mail, senha e nome de usuário
   //const email = req.body.email;
   //const password = req.body.password;
   //const userName = req.body.userName;
   //Destruturing
   const {email, password, userName} = req.body;

   //Pega no arquivo DB a função insertUser e passando o que vem do FrontEnd para ela
   try {
      //Checando o email
      const emailUserDB = await _registerServicejs2.default.checkEmail(email);

      //Verificando se o email existe
      if(emailUserDB.length > 0){
        return res.status(400).send({message: 'Email já cadastrado no sistema!'});
      }

      await _registerServicejs2.default.insertUser(email, password, userName);  
      res.status(201).send({message: 'Usuario cadastrado com sucesso'});
    } catch(err) {
      res.status(500).send({message: `Houve um erro ao cadastrar. ${err}`})
    }
});

router.put('/update', async (req, res) => {
  //Para atualizar informe e-mail, senha, nome de usuário e id
  const {email, password, userName, id} = req.body;

  //Pega no arquivo DB a função updateUser e passando o que vem do FrontEnd para ela
  try {
     await _registerServicejs2.default.updateUser(email, password, userName, id);  
     res.status(201).send({message: 'Usuario atualizado com sucesso!'});
   } catch(err) {
     res.status(500).send({message: `Houve um erro ao atualizar o usuário! ${err}`})
   }
});

//Exportando o router
exports. default = router;