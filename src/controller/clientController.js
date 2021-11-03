//Fazendo as importações necessárias
import express from 'express';
import db from '../service/clientService.js';
import { body, validationResult } from 'express-validator'; //Usado para as validações
import {cpf} from 'cpf-cnpj-validator'; //Importação do validador de CPF

//Instanciando um objeto
const router = express.Router();

//Rota para inserir clientes
router.post('/', [
  body('cepAddress').isNumeric().withMessage('O campo CEP deve ser numérico!'),
  body('cepAddress').isLength({min: 8, max: 8}).withMessage('O campo CEP deve conter 8 caracteres!'),
  body('cepAddress').notEmpty().withMessage('O campo CEP é obrigatório!'),
  body('roadAddress').notEmpty().withMessage('O campo Rua é obrigatório!'),
  body('roadAddress').isLength({min: 5, max: 45}).withMessage('O campo Rua deve conter entre 5 e 45 caracteres!'),
  body('numberAddress').notEmpty().withMessage('O campo Número é obrigatório!'),
  body('numberAddress').isNumeric().withMessage('O campo Número deve ser numérico!'),
  body('numberAddress').isLength({max: 10}).withMessage('O campo Número deve conter no máximo 10 caracteres!'),
  body('districtAddress').notEmpty().withMessage('O campo Bairro é obrigatório!'),
  body('districtAddress').isLength({max: 45}).withMessage('O campo Bairro deve conter no máximo 45 caracteres!'),
  body('cityAddress').notEmpty().withMessage('O campo Cidade é obrigatório!'),
  body('cityAddress').isLength({max: 45}).withMessage('O campo Cidade deve conter no máximo 45 caracteres!'),
  body('stateAddress').notEmpty().withMessage('O campo Estado é obrigatório!'),
  body('stateAddress').custom((stateAddress) =>{
    const stateAllow = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF']

    if(!stateAllow.includes(stateAddress)){
      return Promise.reject('A UF informada é inválida!')
    }
    return true;
  }),
  body('cpfClient').notEmpty().withMessage('O campo CPF é obrigatório!'),
  body('cpfClient').custom((cpfClient) =>{
    const checkCPF = cpf.isValid(cpfClient);

    //Verificando se o CPF é verdadeiro ou falso
    if(!checkCPF) return Promise.reject('CPF informado é inválido!');
    return true;
  }),
  body('nameClient').notEmpty().withMessage('O campo Nome é obrigatório!'),
  body('nameClient').isLength({max: 45}).withMessage('O campo Nome deve conter no máximo 45 caracteres!'),
  body('telephoneClient').notEmpty().withMessage('O campo Telefone é obrigatório!'),
  body('telephoneClient').isNumeric().withMessage('O campo Telefone deve ser numérico!'),
  body('telephoneClient').isLength({max: 45}).withMessage('O campo Telefone deve conter no máximo 45 caracteres!'),
  body('cellPhoneClient').notEmpty().withMessage('O campo Celular é obrigatório!'),
  body('cellPhoneClient').isNumeric().withMessage('O campo Celular deve ser numérico!'),
  body('cellPhoneClient').isLength({max: 45}).withMessage('O campo Celular deve conter no máximo 45 caracteres!'),
  body('emailClient').isEmail().withMessage('Informe um e-mail válido!'),
  body('emailClient').notEmpty().withMessage('O campo E-mail é obrigatório!'),
  body('bloodTypeClient').notEmpty().withMessage('O campo Tipo Sanguíneo é obrigatório!'),
  body('bloodTypeClient').isLength({max: 3}).withMessage('O campo Tipo Sanguíneo deve conter no máximo 3 caracteres!'),
  body('bloodTypeClient').custom((bloodTypeClient) =>{
    const bloodTypeAllow = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

    if(!bloodTypeAllow.includes(bloodTypeClient)){
      return Promise.reject('O Tipo Sanguíneo informado é inválido!')
    }
    return true;
  }),

], async (req, res) => {
   //Variável para mandar para a validar a requisição
   const errors = validationResult(req);

   //Se errors não está vazia (com erros)
   if(!errors.isEmpty()){
     return res.status(400).send({errors: errors.array()});
   }

   //Pega no arquivo DB a função insertClient e passando o que vem do FrontEnd para ela
   try {
      await db.insertClient(req.body);  
      res.status(201).send({message: 'Cliente cadastrado com sucesso!'});
    } catch(err) {
      res.status(500).send({message: `Houve um erro ao cadastrar o cliente! ${err}`})
    }
});

//Rota para atualizar Clientes
router.put('/update', [
  body('cepAddress').isNumeric().withMessage('O campo CEP deve ser numérico!'),
  body('cepAddress').isLength({min: 8, max: 8}).withMessage('O campo CEP deve conter 8 caracteres!'),
  body('cepAddress').notEmpty().withMessage('O campo CEP é obrigatório!'),
  body('roadAddress').notEmpty().withMessage('O campo Rua é obrigatório!'),
  body('roadAddress').isLength({min: 5, max: 45}).withMessage('O campo Rua deve conter entre 5 e 45 caracteres!'),
  body('numberAddress').notEmpty().withMessage('O campo Número é obrigatório!'),
  body('numberAddress').isNumeric().withMessage('O campo Número deve ser numérico!'),
  body('numberAddress').isLength({max: 10}).withMessage('O campo Número deve conter no máximo 10 caracteres!'),
  body('districtAddress').notEmpty().withMessage('O campo Bairro é obrigatório!'),
  body('districtAddress').isLength({max: 45}).withMessage('O campo Bairro deve conter no máximo 45 caracteres!'),
  body('cityAddress').notEmpty().withMessage('O campo Cidade é obrigatório!'),
  body('cityAddress').isLength({max: 45}).withMessage('O campo Cidade deve conter no máximo 45 caracteres!'),
  body('stateAddress').notEmpty().withMessage('O campo Estado é obrigatório!'),
  body('stateAddress').custom((stateAddress) =>{
    const stateAllow = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF']

    if(!stateAllow.includes(stateAddress)){
      return Promise.reject('A UF informada é inválida!')
    }
    return true;
  }),
  body('idAddress').notEmpty().withMessage('O campo Endereço é obrigatório!'),
  body('idAddress').isNumeric().withMessage('O campo Endereço deve ser numérico!'),
  body('idAddress').isLength({max: 11}).withMessage('O campo Endereço deve conter no máximo 11 caracteres!'),
  body('cpfClient').notEmpty().withMessage('O campo CPF é obrigatório!'),
  body('cpfClient').custom((cpfClient) =>{
    const checkCPF = cpf.isValid(cpfClient);

    //Verificando se o CPF é verdadeiro ou falso
    if(!checkCPF) return Promise.reject('CPF informado é inválido!');
    return true;
  }),
  body('nameClient').notEmpty().withMessage('O campo Nome é obrigatório!'),
  body('nameClient').isLength({max: 45}).withMessage('O campo Nome deve conter no máximo 45 caracteres!'),
  body('telephoneClient').notEmpty().withMessage('O campo Telefone é obrigatório!'),
  body('telephoneClient').isNumeric().withMessage('O campo Telefone deve ser numérico!'),
  body('telephoneClient').isLength({max: 45}).withMessage('O campo Telefone deve conter no máximo 45 caracteres!'),
  body('cellPhoneClient').notEmpty().withMessage('O campo Celular é obrigatório!'),
  body('cellPhoneClient').isNumeric().withMessage('O campo Celular deve ser numérico!'),
  body('cellPhoneClient').isLength({max: 45}).withMessage('O campo Celular deve conter no máximo 45 caracteres!'),
  body('emailClient').isEmail().withMessage('Informe um e-mail válido!'),
  body('emailClient').notEmpty().withMessage('O campo E-mail é obrigatório!'),
  body('bloodTypeClient').notEmpty().withMessage('O campo Tipo Sanguíneo é obrigatório!'),
  body('bloodTypeClient').isLength({max: 3}).withMessage('O campo Tipo Sanguíneo deve conter no máximo 3 caracteres!'),
  body('bloodTypeClient').custom((bloodTypeClient) =>{
    const bloodTypeAllow = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

    if(!bloodTypeAllow.includes(bloodTypeClient)){
      return Promise.reject('O Tipo Sanguíneo informado é inválido!')
    }
    return true;
  }),
  body('addressClient').notEmpty().withMessage('O campo Endereço é obrigatório!'),
  body('addressClient').isNumeric().withMessage('O campo Endereço deve ser numérico!'),
  body('addressClient').isLength({max: 11}).withMessage('O campo Endereço deve conter no máximo 11 caracteres!'),
  body('idClient').notEmpty().withMessage('O campo Cliente é obrigatório!'),
  body('idClient').isNumeric().withMessage('O campo Cliente deve ser numérico!'),
  body('idClient').isLength({max: 11}).withMessage('O campo Cliente deve conter no máximo 11 caracteres!'),
], async (req, res) => {
 
   //Variável para mandar para a validar a requisição
   const errors = validationResult(req);

   //Se errors não está vazia (com erros)
   if(!errors.isEmpty()){
     return res.status(400).send({errors: errors.array()});
   }

   //Para atualizar informe os dados
   const {cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, idAddress, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient, addressClient, idClient} = req.body;

   //Pega no arquivo DB a função updateClient e passando o que vem do FrontEnd para ela
   try {
      await db.updateClient(cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, idAddress, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient, addressClient, idClient);  
      res.status(201).send({message: 'Cliente atualizado com sucesso!'});
    } catch(err) {
      res.status(500).send({message: `Houve um erro ao atualizar o cliente! ${err}`})
    }
 });

//Deletando Clientes
router.delete('/delete/:id', async (req, res) => {
  const {id} = req.params;

  //Pega no arquivo DB a função deleteClient e passa o que vem do FrontEnd para ela
  try {
    await db.deleteClient(id);  
    res.status(201).send({message: 'Usuario deletado com sucesso!'});
  } catch(err) {
    res.status(500).send({message: `Houve um erro ao deletar o usuário! ${err}`})
  }
});

//Exportando o router
export default router;