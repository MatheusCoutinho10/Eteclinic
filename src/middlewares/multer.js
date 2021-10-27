//yarn add multer - instalação do multer, para upload de imagens
//Importando o multer
import multer from 'multer';

//storage: caminho do arquivo
//diskStorage: 
//destination: função de configuração (dadosDaRequisição, dadosDoArquivo, funçãoCallBack)
//filename: para não sobrescrever com mesmo nome
//limits: tamanho permitido do arquivo
//fileFilter: extenção dos arquivos
const multerConfig = {
   storage: multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, 'src/uploads'); //CallBack(tratamentoDoErro, localDeArmazenamento)
      },
      filename: (req, file, cb) => {
         const fileName = `${Date.now()}-${file.originalname}`;
         cb(null, fileName); //CallBack(Tratamento do erro, nomeDoArquivo)
      }
   })
}

export default multerConfig;