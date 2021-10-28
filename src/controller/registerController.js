//Importando o Express
import express from 'express';
import db from '../service/registerService.js';
import { body, validationResult } from 'express-validator'; //Usado para as validações

//Instanciando um objeto
const router = express.Router();

//Rota para inserir usuários
router.post('/', [
  body('emailUser').isEmail().withMessage('Informe um E-mail válido!'),
  body('emailUser').notEmpty().withMessage('O campo E-mail é obrigatório!'),
  body('passwordUser').isLength({min: 8, max: 15}).withMessage('Informe uma senha entre 8 e 15 caracteres!'),
  body('passwordUser').notEmpty().withMessage('O campo Senha é obrigatório!'),
  body('nameUser').notEmpty().withMessage('O campo Usuário é obrigatório!'),
  body('nameUser').isLength({max: 45}).withMessage('O Usuário deve conter no máximo 45 caracteres!')
], async (req, res) => {
   //Variável para mandar para a validação a requisição
   const errors = validationResult(req);

   //Se errors não está vazia
   if(!errors.isEmpty()){
     return res.status(400).send({errors: errors.array()});
   }

   //Para cadastrar informe e-mail, senha e nome de usuário
   //const emailUser = req.body.emailUser;
   //const passwordUser = req.body.passwordUser;
   //const userName = req.body.nameUser;
   //Destruturing
   const {emailUser, passwordUser, nameUser} = req.body;

   //Pega no arquivo DB a função insertUser e passando o que vem do FrontEnd para ela
   try {
      //Checando o email
      const emailUserDB = await db.checkEmail(emailUser);

      //Verificando se o email existe
      if(emailUserDB.length > 0){
        return res.status(400).send({message: 'Email já cadastrado no sistema!'});
      }

      await db.insertUser(emailUser, passwordUser, nameUser);  
      res.status(201).send({message: 'Usuário cadastrado com sucesso!'});
    } catch(err) {
      res.status(500).send({message: `Houve um erro ao cadastrar. ${err}`})
    }
});

//Rota para atualizar usuário
router.put('/update', [
  body('email').isEmail().withMessage('Informe um E-mail válido!'),
  body('email').notEmpty().withMessage('O campo E-mail é obrigatório!'),
  body('password').isLength({min: 8, max: 15}).withMessage('Informe uma senha entre 8 e 15 caracteres!'),
  body('password').notEmpty().withMessage('O campo Senha é obrigatório!'),
  body('userName').notEmpty().withMessage('O campo Usuário é obrigatório!'),
  body('userName').isLength({max: 45}).withMessage('O Usuário deve conter no máximo 45 caracteres!'),
  body('id').notEmpty().withMessage('O campo ID é obrigatório!'),
  body('id').isNumeric().withMessage('O campo ID deve ser numérico!'),
  body('id').isLength({max: 11}).withMessage('O campo ID deve conter no máximo 11 caracteres!'),
], async (req, res) => {
  //Variável para mandar para a validação a requisição
  const errors = validationResult(req);

  //Se errors não está vazia
  if(!errors.isEmpty()){
    return res.status(400).send({errors: errors.array()});
  }

  //Para atualizar informe e-mail, senha, nome de usuário e id
  const {email, password, userName, id} = req.body;

  //Pega no arquivo DB a função updateUser e passando o que vem do FrontEnd para ela
  try {
     await db.updateUser(email, password, userName, id);  
     res.status(201).send({message: 'Usuário atualizado com sucesso!'});
   } catch(err) {
     res.status(500).send({message: `Houve um erro ao atualizar o usuário! ${err}`})
   }
});

//Exportando o router
export default router;