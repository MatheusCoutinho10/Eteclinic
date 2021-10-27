//yarn add multer - instalação do multer, para upload de imagens
//Fazendo as importações necessárias
import express from 'express';
import db from '../service/imageService.js';
import multer from 'multer'; //Midleware entre a rota e a ação (igual ao verifyJWT)
import multerConfig from '../middlewares/multer.js';

//Instancia para liberar as rotas
const router = express.Router();

//Criando a rota para enviar imagem
//Multer(ConfiguraçõesDoArquivo)
//Método single('nomeDoCampoQueEnviaOArquivo') para enviar um arquivo por vez
router.post('/', multer(multerConfig).single('file'), async (req, res) => {
   const localFile = req.file.path;
   
   //Inserindo o caminho no Banco de Dados
   await db.insertImage(localFile);
   res.status(201).send({message: 'Cadastrado com sucesso!'});
});

export default router;