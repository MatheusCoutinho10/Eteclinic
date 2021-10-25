//yarn add multer - instalação do multer, para upload de imagens
//Fazendo as importações necessárias
import express from 'express';
import multer from 'multer'; //Midleware entre a rota e a ação (igual ao verifyJWT)
import multerConfig from '../middlewares/multer.js';

//Instancia para liberar as rotas
const router = express.Router();

//Criando a rota para enviar imagem
//Multer(ConfiguraçõesDoArquivo)
//Método single('nomeDoCampoQueEnviaOArquivo') para enviar um arquivo por vez
router.post('/', multer(multerConfig).single('file'), (req, res) => {
   const localFile = req.file.path;
   
   res.status(201).send({message: 'Acessado com sucesso!'});
});

export default router;