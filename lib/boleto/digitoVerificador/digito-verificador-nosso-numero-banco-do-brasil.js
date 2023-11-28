module.exports = function(nossoNumero){
    // limites a percorrer
    // referência  https://www.bb.com.br/docs/pub/emp/empl/dwn/Doc5175Bloqueto.pdf
    // ANEXO XI – MÓDULO 11 PARA CÁLCULO DO DV DO CAMPO “NOSSO NÚMERO”
    let sequenciaDigito={
        do:9, 
        ate:2
    }
    
    let _divisao = 11
    let _contador = 0
    let _soma = 0
    let _resultado

    while(nossoNumero.length > _contador ){
        if(sequenciaDigito.do < sequenciaDigito.ate){
            sequenciaDigito.do = 9
        }

        let posicao = _contador+1
       _soma += (Number(nossoNumero[nossoNumero.length - posicao]) * sequenciaDigito.do)
       sequenciaDigito.do -=1
       
       _contador++
    }

    
    _resultado = _soma % _divisao

    return _resultado
} 
