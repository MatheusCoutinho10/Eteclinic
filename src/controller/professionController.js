//Fazendo as importações necessárias
import express from 'express';
import db from '../service/professionService.js';
import { body, validationResult } from 'express-validator'; //Usado para as validações

//Instanciando um método do express
const router = express.Router();

//Rota para inserir profissões
router.post('/', [
  body('nameProfession').notEmpty().withMessage('O campo Profissão é obrigatório!'),
  body('nameProfession').isLength({max: 45}).withMessage('O campo Profissão deve conter no máximo 45 caracteres!')
], async (req, res) => {
   //Variável para mandar para a validação a requisição
   const errors = validationResult(req);

   //Se errors não está vazia
   if(!errors.isEmpty()){
     return res.status(400).send({errors: errors.array()});
   }

   //Pega no arquivo DB a função insertProfession e passa o que vem do FrontEnd para ela
   try{
      await db.insertProfession(req.body);
      res.status(201).send({message: 'Profissão cadastrada com sucesso!'});
   }catch(err) {
      res.status(500).send({message: `Houve um erro ao cadastrar. ${err}`})
   }
});

//Exportando o router
export default router;