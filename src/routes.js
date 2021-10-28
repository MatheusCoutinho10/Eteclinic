//Fazendo as importações
import express from 'express';
import register from './controller/registerController.js';
import login from './controller/loginController.js';
import client from './controller/clientController.js';
import specialist from './controller/specialistController.js';
import profession from './controller/professionController.js';
import image from './controller/imageController.js';
import { verifyJWT } from './middlewares/jwt.js';

//Utilizando o método "use" do express
const router = express.Router();

//Rotas de Usuário
router.use('/register', register);

//Rota de Login
router.use('/login', login);

//Rotas de Cliente
router.use('/client', client);

//Rotas de Especialista
router.use('/specialist', specialist);

//Rotas de Profissão
router.use('/profession', profession);

//Rota para Upload de imagens
router.use('/image', image);

//Rota para páginas inexistentes
router.use('/*', (req, res) => {
   res.status(404).send({message: 'Caminho não encontrado!'});
});

export default router;