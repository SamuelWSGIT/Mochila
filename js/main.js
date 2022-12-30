//recebendo formulario do html
const form = document.querySelector("#novoItem")
//recebendo lista do html
const lista = document.querySelector("#lista")
//recebendo arrei de itens do local storage se existir
const itens = JSON.parse(localStorage.getItem("itens")) || []
//pra cara item dentro do array do local storage, executar a função criar elemento com os elementos dentro do array
itens.forEach(element => {
    criaElemento(element)
});
//adicionando leitor de evento do tipo submit
form.addEventListener("submit", (evento)=>{
    //removendo propriedades padão do evento
    evento.preventDefault()
    //pegando o nome do elemento
    const nome = evento.target.elements['nome']
    //pegando quantidade do elemento
    const quantidade = evento.target.elements['quantidade']
    //criando array com valor do nome e quantidade atuais
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    //executar função criar elemento com o array atual
    criaElemento(itemAtual)
    //inserindo o array atual dentro da lista de arrays
    itens.push(itemAtual)
    //enviando a lista de itens para o localstorage com o nome de itens
    localStorage.setItem("itens", JSON.stringify(itens))
    //removendo o nome inserido no input
    nome.value = ""
    //removendo a quantidade inserida no input
    quantidade.value = ""
})
//função para criar elementos no html
function criaElemento(item) {
    //variavel que cria li
    const novoItem = document.createElement('li')
    //adicionando classe na li
    novoItem.classList.add("item")
    //variavel que cria strong
    const numeroItem = document.createElement('strong')
    //inserindo html na variavel strong com os dados da quantidade atual do input
    numeroItem.innerHTML = item.quantidade
    //inserindo variavel strong dentro da variavel li
    novoItem.appendChild(numeroItem)
    //adicionando li com a variavel nome do item atual
    novoItem.innerHTML += item.nome
    //adicionando li dentro da lista
    lista.appendChild(novoItem)
}