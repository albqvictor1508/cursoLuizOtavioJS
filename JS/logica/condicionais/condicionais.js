

//já que quando a condição é verdadeira, ela é executada e sai da condicional, qualquer condição que for verdadeira vai quebrar todas as outras condições 
const alexsa = 'victor';

if (alexsa > 0 && alexsa <= 10) {
    console.log('você está entre 1 e 10')
}
else if (alexsa > 10) {
    console.log('você ta maior que 10')
}
else {
    console.log('ERRO')
}

//algo óbvio mas que pode ser passado batido 

