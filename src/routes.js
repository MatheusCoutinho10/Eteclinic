//Importando o express
import express from 'express';
import register from './controller/register/registerController.js';
import login from './controller/loginController.js';
import client from './controller/clientController.js';
import specialist from './controller/specialistController.js';
import image from './controller/imageController.js';
import { verifyJWT } from './middlewares/jwt.js';

//Utilizando o método "use" do express
const router = express.Router();

//Rotas de Usuário
router.use('/register', register);
router.use('/register/update', register);

//Rota de Login
router.use('/login', login);

//Rotas de Cliente
router.use('/client', client);
router.use('/client/update', client);

//Rotas de Especialista
router.use('/specialist', specialist);
//router.use('/specialist/update', specialist);

//Rota para Upload de imagens
router.use('/image', image);

router.use('/*', (req, res) => {
   res.status(404).send({message: 'Caminho não encontrado!'});
});

export default router;