const semanas = {
  1: [
    "Dia 1-2: Variáveis, Tipos, Operadores",
    "Dia 3: Estruturas de Controle",
    "Dia 4: Funções",
    "Dia 5: Arrays e Objetos",
    "Dia 6: DOM e Eventos",
    "Dia 7: Projeto Jogo da Velha",
  ],
  2: [
    "Dia 8-9: ES6+ e Assíncrono",
    "Dia 10: Módulos e LocalStorage",
    "Dia 11-12: POO em JS",
    "Dia 13-14: Projeto API",
  ],
  3: [
    "Dia 15: Fundamentos React",
    "Dia 16: Estado e Eventos",
    "Dia 17: Hooks",
    "Dia 18: Rotas",
    "Dia 19-20: Projeto React",
  ],
  4: [
    "Dia 21: Node Básico",
    "Dia 22: Express",
    "Dia 23: Banco de Dados",
    "Dia 24-25: API REST",
    "Dia 26-28: Full Stack",
  ],
};

function carregarSemana(num) {
  // Oculta o cronograma e mostra o conteúdo das semanas
  document.getElementById("cronograma").style.display = "none";
  document.getElementById("listaTarefas").style.display = "block";

  // Salva a semana atual no localStorage
  localStorage.setItem("semanaAtual", num);

  document.getElementById("tituloSemana").innerText = "Semana " + num;
  const listaTarefas = document.getElementById("listaTarefas");
  listaTarefas.innerHTML = "";
  semanas[num].forEach((tarefa, indice) => {
    const checked =
      localStorage.getItem(`semana${num}-tarefa${indice}`) === "true"
        ? "checked"
        : "";
    listaTarefas.innerHTML += `<div><input type="checkbox" ${checked} onchange="salvarTarefa(${num},${indice},this.checked)">${tarefa}</div>`;
  });
  atualizarProgresso();
}

function mostrarCronograma() {
  // Oculta o conteúdo das semanas e mostra o cronograma
  document.getElementById("listaTarefas").style.display = "none";
  document.getElementById("cronograma").style.display = "block";
  document.getElementById("tituloSemana").innerText = "";
}

function salvarTarefa(semana, indice, checked) {
  localStorage.setItem(`semana${semana}-tarefa${indice}`, checked);
  atualizarProgresso();
}

function atualizarProgresso() {
  // Calcula o total correto de tarefas (todas as semanas)
  let totalTarefas = 0;
  let tarefasConcluidas = 0;

  // Conta tarefas de cada semana
  for (let semana = 1; semana <= 4; semana++) {
    const tarefasDaSemana = semanas[semana];
    totalTarefas += tarefasDaSemana.length;

    // Conta quantas tarefas desta semana estão concluídas
    for (let indice = 0; indice < tarefasDaSemana.length; indice++) {
      const chave = `semana${semana}-tarefa${indice}`;
      if (localStorage.getItem(chave) === "true") {
        tarefasConcluidas++;
      }
    }
  }

  // Calcula a porcentagem correta
  const porcentagem =
    totalTarefas > 0 ? (tarefasConcluidas / totalTarefas) * 100 : 0;
  document.getElementById("progressBar").style.width = porcentagem + "%";

  console.log(
    `Progresso: ${tarefasConcluidas}/${totalTarefas} = ${porcentagem.toFixed(
      1
    )}%`
  );
}

// Função para carregar automaticamente a última semana acessada
function carregarUltimaSemana() {
  const ultimaSemana = localStorage.getItem("semanaAtual");
  if (ultimaSemana) {
    carregarSemana(parseInt(ultimaSemana));
  }
}

// Timer Pomodoro
let timer;
let tempoRestante = 25 * 60;

function iniciarTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (tempoRestante > 0) {
      tempoRestante--;
      const minutos = Math.floor(tempoRestante / 60);
      const segundos = tempoRestante % 60;
      document.getElementById("displayTimer").innerText = `${minutos}:${
        segundos < 10 ? "0" : ""
      }${segundos}`;
    } else {
      clearInterval(timer);
      alert("Pomodoro concluído! Faça uma pausa.");
    }
  }, 1000);
}

function resetarTimer() {
  clearInterval(timer);
  tempoRestante = 25 * 60;
  document.getElementById("displayTimer").innerText = "25:00";
}

// Anotações
document.getElementById("notas").value =
  localStorage.getItem("notasEstudo") || "";
function salvarNotas() {
  const notas = document.getElementById("notas").value;
  localStorage.setItem("notasEstudo", notas);
  alert("Anotações salvas!");
}

function exportarNotasPDF() {
  const notas = document.getElementById("notas").value;
  if (!notas.trim()) {
    alert("Nenhuma anotação para exportar.");
    return;
  }
  const win = window.open("", "", "height=700,width=700");
  win.document.write("<html><head><title>Anotações</title></head><body>");
  win.document.write("<h1>Minhas Anotações</h1>");
  win.document.write("<pre>" + notas + "</pre>");
  win.document.write("</body></html>");
  win.document.close();
  win.print();
}

// Inicializa o progresso e carrega a última semana
atualizarProgresso();
carregarUltimaSemana();
