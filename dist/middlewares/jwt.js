"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//Importando o JWT
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

//Criando a função que verificará a autenticação
//next é usado para o próximo nível de verificação
function verifyJWT(req, res, next){
   //Chave secreta de descriptografar o Token
   const secret = '$dinheiro$';

   //Pegando o token via requisição da header
   const authHeader = req.headers.authorization;

   //VERIFICAÇÕES ANTES DO JWT
   //Verificando se o Token está vazio
   if(!authHeader){
      return res.status(401).send({message: 'Token não informado!'});
   }

   //Verificando se o Token tem duas partes
   //Separando a Bearer do Token
   const parts = authHeader.split(' ');

   if(parts.length != 2){
      return res.status(401).send({message: 'Token inválido!'});
   }

   //VERIFICANDO O JWT
   //Separando o Bearer do Token
   const [scheme, token] = parts;

   //Verificando se o Bearer está presente
   if(scheme != 'Bearer'){
      return res.status(401).send({message: 'Token inválido!'});
   }

   _jsonwebtoken2.default.verify(token, secret, (err, decoded) => {
      if(err){
         return res.status(401).send({message: 'Usuário não autenticado no sistema!'});
      }

      //Avança para o próximo paço
      return next();
   });
}

//Exportando a função
exports.verifyJWT = verifyJWT;