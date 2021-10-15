"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Importando o Express
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _clientServicejs = require('../service/clientService.js'); var _clientServicejs2 = _interopRequireDefault(_clientServicejs);
var _expressvalidator = require('express-validator'); //Usado para as validações
var _cpfcnpjvalidator = require('cpf-cnpj-validator'); //Importação do validador de CPF

//Instanciando um objeto
const router = _express2.default.Router();

//Rota para inserir clientes
router.post('/', [
  _expressvalidator.body.call(void 0, 'cepAddress').isNumeric().withMessage('O campo CEP deve ser numérico!'),
  _expressvalidator.body.call(void 0, 'cepAddress').isLength({min: 8, max: 8}).withMessage('O campo CEP deve conter 8 caracteres!'),
  _expressvalidator.body.call(void 0, 'cepAddress').notEmpty().withMessage('O campo CEP é obrigatório!'),
  _expressvalidator.body.call(void 0, 'roadAddress').notEmpty().withMessage('O campo Rua é obrigatório!'),
  _expressvalidator.body.call(void 0, 'roadAddress').isLength({min: 5, max: 45}).withMessage('O campo Rua deve conter entre 5 e 45 caracteres!'),
  _expressvalidator.body.call(void 0, 'numberAddress').notEmpty().withMessage('O campo Número é obrigatório!'),
  _expressvalidator.body.call(void 0, 'numberAddress').isNumeric().withMessage('O campo Número deve ser numérico!'),
  _expressvalidator.body.call(void 0, 'numberAddress').isLength({max: 10}).withMessage('O campo Número deve conter no máximo 10 caracteres!'),
  _expressvalidator.body.call(void 0, 'districtAddress').notEmpty().withMessage('O campo Bairro é obrigatório!'),
  _expressvalidator.body.call(void 0, 'districtAddress').isLength({max: 45}).withMessage('O campo Bairro deve conter no máximo 45 caracteres!'),
  _expressvalidator.body.call(void 0, 'cityAddress').notEmpty().withMessage('O campo Cidade é obrigatório!'),
  _expressvalidator.body.call(void 0, 'cityAddress').isLength({max: 45}).withMessage('O campo Cidade deve conter no máximo 45 caracteres!'),
  _expressvalidator.body.call(void 0, 'stateAddress').notEmpty().withMessage('O campo Estado é obrigatório!'),
  _expressvalidator.body.call(void 0, 'stateAddress').custom((stateAddress) =>{
    const stateAllow = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF']

    if(!stateAllow.includes(stateAddress)){
      return Promise.reject('UF informado é inválido!')
    }
    return true;
  }),
  _expressvalidator.body.call(void 0, 'cpfClient').notEmpty().withMessage('O campo CPF é obrigatório!'),
  _expressvalidator.body.call(void 0, 'cpfClient').custom((cpfClient) =>{
    const checkCPF = _cpfcnpjvalidator.cpf.isValid(cpfClient);

    //Verificando se o CPF é verdadeiro ou falso
    if(!checkCPF) return Promise.reject('CPF informado é inválido!');
    return true;
  }),
  _expressvalidator.body.call(void 0, 'nameClient').notEmpty().withMessage('O campo Nome é obrigatório!'),
  _expressvalidator.body.call(void 0, 'nameClient').isLength({max: 45}).withMessage('O campo Nome deve conter no máximo 45 caracteres!'),
  _expressvalidator.body.call(void 0, 'telephoneClient').notEmpty().withMessage('O campo Telefone é obrigatório!'),
  _expressvalidator.body.call(void 0, 'telephoneClient').isNumeric().withMessage('O campo Telefone deve ser numérico!'),
  _expressvalidator.body.call(void 0, 'telephoneClient').isLength({max: 45}).withMessage('O campo Telefone deve conter no máximo 45 caracteres!'),
  _expressvalidator.body.call(void 0, 'cellClient').notEmpty().withMessage('O campo Celular é obrigatório!'),
  _expressvalidator.body.call(void 0, 'cellClient').isNumeric().withMessage('O campo Celular deve ser numérico!'),
  _expressvalidator.body.call(void 0, 'cellClient').isLength({max: 45}).withMessage('O campo Celular deve conter no máximo 45 caracteres!'),
  _expressvalidator.body.call(void 0, 'emailClient').isEmail().withMessage('Informe um e-mail valido!'),
  _expressvalidator.body.call(void 0, 'emailClient').notEmpty().withMessage('O campo E-mail é obrigatório!'),
  _expressvalidator.body.call(void 0, 'bloodTypeClient').notEmpty().withMessage('O campo Tipo Sanguíneo é obrigatório!'),
  _expressvalidator.body.call(void 0, 'bloodTypeClient').isLength({max: 3}).withMessage('O campo Tipo Sanguíneo deve conter no máximo 3 caracteres!'),
], async (req, res) => {
   //Variável para mandar para a validação a requisição
   const errors = _expressvalidator.validationResult.call(void 0, req);

   //Se errors não está vazia
   if(!errors.isEmpty()){
     return res.status(400).send({errors: errors.array()});
   }

   //Pega no arquivo DB a função insertClient e passando o que vem do FrontEnd para ela
   try {
      await _clientServicejs2.default.insertClient(req.body);  
      res.status(201).send({message: 'Cliente cadastrado com sucesso!'});
    } catch(err) {
      res.status(500).send({message: `Houve um erro ao cadastrar. ${err}`})
    }
});

//Atualizando Clientes
router.put('/update', async (req, res) => {
   //Para atualizar informe e-mail, senha, nome de usuário e id
   const {cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, address, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient, addressClient, client} = req.body;
 
   //Pega no arquivo DB a função updateClient e passando o que vem do FrontEnd para ela
   try {
      await _clientServicejs2.default.updateClient(cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, address, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient, addressClient, client);  
      res.status(201).send({message: 'Usuario atualizado com sucesso!'});
    } catch(err) {
      res.status(500).send({message: `Houve um erro ao atualizar o usuário! ${err}`})
    }
 });

//Exportando o router
exports. default = router;