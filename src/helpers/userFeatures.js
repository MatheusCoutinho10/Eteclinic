//Importando o JWT
//Importando o nodemailer
//Importando o arquivo do smtp
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { config } from './smtp.js';

//Instanciando uma classe do nodemailer
const transport = nodemailer.createTransport(config);

//Função para gerar uma senha aleatória
function generatedPassword(){
   //Math.random - pega números aleatórios entre 0 e 1
   //36 é a porta que coloca letras entre os números
   //substring pega a partir do número do caractere entre os ()
   const key = (Math.random() + 1).toString(36).substring(2);

   //replace substitui um caractere por outro, apenas uma vez
   const newPassword = key.replace('n', '@')
                          .replace('w', '!')
                          .replace('i', '#')
                          .replace('t', '$')
                          .replace('a', '*');
   
   return newPassword;
}

//Função para gerar o Token de Autenticação
function generatedToken(id_login, usuario){
   //Chave secreta de deprictografar o Token
   const secret = '$dinheiro$';

   //expiresIn é o tempo que o Token leva para expirar, em segundos
   return jwt.sign({infoUser: {id_login, usuario}}, secret, {expiresIn: 60 * 60 * 5});
}

//Função para envio de e-mail
function sendEmail(email, name, password){
   transport.sendMail({
      subject: 'Redefinição de senha - Eteclinic',
      from: 'Suporte Eteclinic <eteclinic@gmail.com>',
      to: email,
      html:
         `
         <html>
            <body>
               <p>Olá, ${name}! Tudo bem?</p>
               <p>Você solicitou uma redefinição de senha para acessar o site Eteclinic.</p>
               <p>Sua nova senha de acesso é: <strong>${password}</strong></p>
            </body>
         </html>
         `
   });
}

//Exportando a função
export {generatedPassword, generatedToken, sendEmail};