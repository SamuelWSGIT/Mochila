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

    itens[itens.findIndex((elemento) => elemento.id === existe.id)] = itemAtual;
  } else {
    itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
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

  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem); //adicionando li dentro da lista
}

function atualizaElemento(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = "X";

  elementoBotao.addEventListener("click", function () {
    deletaElemento(this.parentNode, id);
  });

  return elementoBotao;
}

function deletaElemento(tag, id) {
  tag.remove();

  itens.splice(
    itens.findIndex((elemento) => elemento.id === id),
    1
  );

  localStorage.setItem("itens", JSON.stringify(itens));
}
