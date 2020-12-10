//script

function setarModalEditar(id, conteudo){
    const fulano = document.querySelectorAll('.editar-fulano');
    fulano[0].setAttribute('value', id);
    fulano[1].setAttribute('value', conteudo);
    console.log(id);
}
function test(){
    document.getElementById('botao-foda').click();
}
function setarModalExcluir(id, conteudo){
    const fulano = document.querySelectorAll('.modelExluir');
    fulano[0].setAttribute('value', id);
    fulano[1].setAttribute('value', conteudo);
    console.log(id);
}
