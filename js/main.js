const form = document.querySelector("#novoItem"); //recebendo formulario do html
const lista = document.querySelector("#lista"); //recebendo lista do html
const itens = JSON.parse(localStorage.getItem("itens")) || []; //recebendo arrei de itens do local storage se existir

//pra cara item dentro do array do local storage, executar a função criar elemento com os elementos dentro do array
itens.forEach((element) => {
  criaElemento(element);
});

//adicionando leitor de evento do tipo submit
form.addEventListener("submit", (evento) => {
  evento.preventDefault(); //removendo propriedades padão do evento
  const nome = evento.target.elements["nome"]; //pegando o nome do elemento
  const quantidade = evento.target.elements["quantidade"]; //pegando quantidade do elemento

  const existe = itens.find((elemento) => elemento.nome === nome.value);

  const itemAtual = {
    //criando array com valor do nome e quantidade atuais
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existe) {
    itemAtual.id = existe.id;

    atualizaElemento(itemAtual);
  } else {
    itemAtual.id = itens.length;
    criaElemento(itemAtual); //executar função criar elemento com o array atual
    itens.push(itemAtual); //inserindo o array atual dentro da lista de arrays
  }

  localStorage.setItem("itens", JSON.stringify(itens)); //enviando a lista de itens para o localstorage com o nome de itens

  nome.value = ""; //removendo o nome inserido no input
  quantidade.value = ""; //removendo a quantidade inserida no input
});

//função para criar elementos no html
function criaElemento(item) {
  const novoItem = document.createElement("li"); //variavel que cria li
  novoItem.classList.add("item"); //adicionando classe na li

  const numeroItem = document.createElement("strong"); //variavel que cria strong
  numeroItem.innerHTML = item.quantidade; //inserindo html na variavel strong com os dados da quantidade atual do input
  novoItem.appendChild(numeroItem); //inserindo variavel strong dentro da variavel li

  numeroItem.dataset.id = item.id;
  novoItem.innerHTML += item.nome; //adicionando li com a variavel nome do item atual
  lista.appendChild(novoItem); //adicionando li dentro da lista
}

function atualizaElemento(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}
