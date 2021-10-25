//Importando o Express
import express from 'express';
import db from '../service/specialistService.js';
import { body, validationResult } from 'express-validator'; //Usado para as validações

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
      return Promise.reject('UF informado é inválido!')
    }
    return true;
  }),
  body('registerSpecialist').isNumeric().withMessage('O campo Registro deve ser numérico!'),
  body('registerSpecialist').isLength({max: 45}).withMessage('O campo Registro deve conter no máximo 45 caracteres!'),
  body('registerSpecialist').notEmpty().withMessage('O campo Registro é obrigatório!'),
  body('nameSpecialist').notEmpty().withMessage('O campo Nome é obrigatório!'),
  body('nameSpecialist').isLength({max: 45}).withMessage('O campo Nome deve conter no máximo 45 caracteres!'),
  body('telephoneSpecialist').notEmpty().withMessage('O campo Telefone é obrigatório!'),
  body('telephoneSpecialist').isNumeric().withMessage('O campo Telefone deve ser numérico!'),
  body('telephoneSpecialist').isLength({max: 45}).withMessage('O campo Telefone deve conter no máximo 45 caracteres!'),
  body('cellPhoneSpecialist').notEmpty().withMessage('O campo Celular é obrigatório!'),
  body('cellPhoneSpecialist').isNumeric().withMessage('O campo Celular deve ser numérico!'),
  body('cellPhoneSpecialist').isLength({max: 45}).withMessage('O campo Celular deve conter no máximo 45 caracteres!'),
  body('emailSpecialist').isEmail().withMessage('Informe um e-mail valido!'),
  body('emailSpecialist').notEmpty().withMessage('O campo E-mail é obrigatório!'),
  body('idProfission').isNumeric().withMessage('O campo Profissão deve ser numérico!'),
  body('idProfission').isLength({max: 11}).withMessage('O campo Profissão deve conter no máximo 45 caracteres!'),
  body('idProfission').notEmpty().withMessage('O campo Profissão é obrigatório!'),
], async (req, res) => {
   //Variável para mandar para a validação a requisição
   const errors = validationResult(req);

   //Se errors não está vazia
   if(!errors.isEmpty()){
     return res.status(400).send({errors: errors.array()});
   }

   //Pega no arquivo DB a função insertSpecialist e passando o que vem do FrontEnd para ela
   try {
      await db.insertSpecialist(req.body);  
      res.status(201).send({message: 'Especialista cadastrado com sucesso!'});
    } catch(err) {
      res.status(500).send({message: `Houve um erro ao cadastrar. ${err}`})
    }
});

//Atualizando Clientes
//router.put('/update', async (req, res) => {
//   //Para atualizar informe e-mail, senha, nome de usuário e id
//   const {cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, address, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient, addressClient, client} = req.body;
//
//   //Pega no arquivo DB a função updateClient e passando o que vem do FrontEnd para ela
//   try {
//      await db.updateClient(cepAddress, roadAddress, numberAddress, districtAddress, cityAddress, stateAddress, address, cpfClient, nameClient, telephoneClient, cellClient, emailClient, bloodTypeClient, addressClient, client);  
//      res.status(201).send({message: 'Usuario atualizado com sucesso!'});
//    } catch(err) {
//      res.status(500).send({message: `Houve um erro ao atualizar o usuário! ${err}`})
//    }
// });

//Exportando o router
export default router;