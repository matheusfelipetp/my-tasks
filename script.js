let tasks = [];

const lista = document.querySelector(".task__list");
const btnCriarTask = document.querySelector("#btnCriarTask");
const inputTask = document.querySelector(".form-options input");
const inputOption = document.querySelector("#task-option");
const paragrafo = document.querySelector(".task-itens p");
const inputSearch = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");

function adicionarElemento(event) {
  event.preventDefault();

  paragrafo.classList.add("desativo");

  let prioridadeItem;
  if (inputOption.value === "Urgente") {
    prioridadeItem = 1;
  }
  if (inputOption.value === "Prioritário") {
    prioridadeItem = 2;
  }
  if (inputOption.value === "Normal" || inputOption.value === "valor1") {
    prioridadeItem = 3;
  }

  const tarefa = {
    titulo: inputTask.value,
    tipo: inputOption.value,
    prioridade: prioridadeItem,
  };

  tasks.push(tarefa);
  organizarLista(tasks);
  listarElemento(tasks);
}

function criarElemento({ titulo, tipo }) {
  const itemLista = document.createElement("li");
  const span = document.createElement("span");
  const div = document.createElement("div");
  const titleItem = document.createElement("h2");
  const button = document.createElement("button");
  const buttonImg = document.createElement("img");

  titleItem.innerText = titulo;

  if (tipo.toLowerCase() === "urgente") {
    span.style = "background: var(--urgente)";
  } else if (tipo.toLowerCase() === "prioritário") {
    span.style = "background: #77e864;";
  } else {
    span.style = "background: #d6e340;";
  }

  buttonImg.src = "./img/delete_FILL0_wght400_GRAD0_opsz48.svg";

  button.appendChild(buttonImg);
  div.appendChild(span);
  div.appendChild(titleItem);
  itemLista.appendChild(div);
  itemLista.appendChild(button);

  return itemLista;
}

function organizarLista(list) {
  list.sort((a, b) => {
    if (a.prioridade > b.prioridade) {
      return 1;
    }
    if (a.prioridade < b.prioridade) {
      return -1;
    }
  });
}

function listarElemento(list) {
  lista.innerHTML = "";
  inputTask.value = "";

  list.forEach((item) => {
    const template = criarElemento(item);
    lista.appendChild(template);
  });
}

function habilitarBotao() {
  let content = inputTask.value;

  if (content.trim() !== "") {
    btnCriarTask.disabled = false;
  }
}

function desabilitarBotao() {
  btnCriarTask.disabled = true;
}

function removerElemento(event) {
  const btnRemove = event.target;

  if (btnRemove.tagName === "BUTTON" || btnRemove.tagName === "IMG") {
    btnRemove.closest("li").remove();
    tasks.splice("li", 1);
  }

  if (lista.innerHTML === "") {
    paragrafo.classList.remove("desativo");
  }
}

function filtrarElementos(event) {
  event.preventDefault();

  const pesquisaUser = inputSearch.value;
  const resultadoBusca = buscarElemento(pesquisaUser);

  listarElemento(resultadoBusca);
}

function buscarElemento(valorPesquisa) {
  let arrayFiltro = [];
  let pesquisa = valorPesquisa.toLowerCase().trim();

  tasks.forEach((item) => {
    let itemFiltro = item.titulo.toLowerCase().trim();

    if (itemFiltro.includes(pesquisa)) {
      arrayFiltro.push(item);
    }
    if (pesquisa === "") {
      return tasks;
    }
  });

  return arrayFiltro;
}

btnCriarTask.addEventListener("click", adicionarElemento);
inputTask.addEventListener("input", habilitarBotao);
btnCriarTask.addEventListener("click", desabilitarBotao);
lista.addEventListener("click", removerElemento);
inputSearch.addEventListener("keyup", filtrarElementos);
