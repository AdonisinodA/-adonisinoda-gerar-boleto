const boletofunc = require("boletos-desc-br");

async function geradorDeLinhaDigitavelLib(codigoDeBarras){
    new Promise((resolve)=>{
        const {linhaDigitavel} = boletofunc.dadosBoleto(codigoDeBarras)
        resolve(linhaDigitavel)
    })


}
module.exports = geradorDeLinhaDigitavelLib