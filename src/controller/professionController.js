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
      res.status(500).send({message: `Houve um erro ao tentar cadastrar a profissão! ${err}`})
   }
});

//Atualizando Profissões
router.put('/update/:idProfession', [
   body('nameProfession').notEmpty().withMessage('O campo Profissão é obrigatório!'),
   body('nameProfession').isLength({max: 45}).withMessage('O campo Profissão deve conter no máximo 45 caracteres!')
 ], async (req, res) => {

   //Variável para mandar para a validação a requisição
   const errors = validationResult(req);

   //Se errors não está vazia
   if(!errors.isEmpty()){
     return res.status(400).send({errors: errors.array()});
   }

   //Pegando o id passado na url
   const {idProfession} = req.params;
 
   try {
      const profession = await db.validateProfession(idProfession);

      if(profession.length <= 0){
        return res.status(404).send({message: 'Profissão não encontrada!'});
      }

      //Pega no arquivo DB a função updateProfession e passa o que vem do FrontEnd para ela
      await db.updateProfession(req.body, idProfession);  
      res.status(201).send({message: 'Profissão atualizada com sucesso!'});
    } catch(err) {
      res.status(500).send({message: `Houve um erro ao tentar atualizar a profissão! ${err}`})
    }
 });

//Deletando Profissões
router.delete('/delete/:idProfession', async (req, res) => {
   const {idProfession} = req.params;
 
   //Pega no arquivo DB a função deleteProfession e passa o que vem do FrontEnd para ela
   try{
     await db.deleteProfession(idProfession);  
     res.status(201).send({message: 'Profissão deletada com sucesso!'});
   }catch(err) {
     res.status(500).send({message: `Houve um erro ao tentar deletar a profissão! ${err}`})
   }
 });

//Exportando o router
export default router;