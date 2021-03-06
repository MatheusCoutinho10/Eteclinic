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
  body('passwordUser').isLength({min: 8, max: 15}).withMessage('Informe uma Senha entre 8 e 15 caracteres!'),
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
      res.status(500).send({message: `Houve um erro ao tentar cadastrar o usuário! ${err}`})
    }
});

//Rota para atualizar usuário
router.put('/update/:idUser', [
  body('emailUser').isEmail().withMessage('Informe um E-mail válido!'),
  body('emailUser').notEmpty().withMessage('O campo E-mail é obrigatório!'),
  body('passwordUser').isLength({min: 8, max: 15}).withMessage('Informe uma Senha entre 8 e 15 caracteres!'),
  body('passwordUser').notEmpty().withMessage('O campo Senha é obrigatório!'),
  body('nameUser').notEmpty().withMessage('O campo Usuário é obrigatório!'),
  body('nameUser').isLength({max: 45}).withMessage('O campo Usuário deve conter no máximo 45 caracteres!')
], async (req, res) => {
  //Variável para mandar para a validação a requisição
  const errors = validationResult(req);

  //Se errors não está vazia
  if(!errors.isEmpty()){
    return res.status(400).send({errors: errors.array()});
  }

  //Pegando o id do usuário
  const {idUser} = req.params;

  //Pega no arquivo DB a função updateUser e passando o que vem do FrontEnd para ela
  try{
     const user = await db.validateUser(idUser);

     if(user.length <= 0) {
        return res.status(404).send({message: 'Cliente não encontrado!'});
     }

     //Pega no arquivo DB a função updateUser e passando o que vem do FrontEnd para ela
     await db.updateUser(req.body, idUser);  
     res.status(201).send({message: 'Usuário atualizado com sucesso!'});
   }catch(err) {
     res.status(500).send({message: `Houve um erro ao tentar atualizar o usuário! ${err}`})
   }
});

//Deletando Usuários
router.delete('/delete/:idUser', async (req, res) => {
  const {idUser} = req.params;

  //Pega no arquivo DB a função deleteUser e passa o que vem do FrontEnd para ela
  try {
    await db.deleteUser(idUser);
    res.status(201).send({message: 'Usuário deletado com sucesso!'});
  } catch(err) {
    res.status(500).send({message: `Houve um erro ao tentar deletar o usuário! ${err}`})
  }
});

//Exportando o router
export default router;