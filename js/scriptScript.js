let alunosPorHorario = {};
let status = ["Livre", "Indisponível", "Ocupado"];
let numeroInicialDeVagas = 5;
let diaSelecionado = 0;
let horarioSelecionado = 0;
let teste = "";
let vagas = 0;
// const professores = {
//   Matemática: "Moisés",
//   Programação: "Giroto",
// };
let dataInicial = "";

document.addEventListener("DOMContentLoaded", function () {
  const hoje = new Date();

  //Tirando a hora do new Date e deixando somente a data
  dataInicial = hoje.toISOString().split("T")[0];
  //Colocando no HTML a data do dia de hoje formatado no pc

  data.value = dataInicial;

  //Sem isso aq n funciona n sabemos o pq ent n tira. E sim está repetindo código, mas é a vida.
  data.min = hoje.toISOString().split("T")[0];
  data.max = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 14)
    .toISOString()
    .split("T")[0];

  //Isso aq atualiza a tabela :D
  data.addEventListener("change", function () {
    const selectedDate = this.value;
    if (selectedDate) {
      atualizarCelulasTabela(selectedDate); // Atualizar a interface com base na nova data
    }
  });

  // Outras inicializações
  atualizarSeries();
  adicionarListeners();
});

// Isso aqui faz aparecer as opções de turma e disciplina dinamicamente (CERTO)
document.getElementById("serie").addEventListener("change", function () {
  serieSelecionada = this.value;
  document.getElementById("selecaoTurma").style.display = this.value ? "block" : "none";
  document.querySelector(".nomeSelecaoSerie").textContent = serieSelecionada;
  console.log(serieSelecionada);
  atualizarTurmas(serieSelecionada);
});

document.getElementById("turma").addEventListener("change", function () {
  turmaSelecionada = this.value;
  document.getElementById("selecaoDisciplina").style.display = this.value ? "block" : "none";
  document.querySelector(".nomeSelecaoTurma").textContent = turmaSelecionada;
  console.log(turmaSelecionada);
  // atualizarDisciplinas(turmaSelecionada);
  atualizarDisciplinas();
});

document.getElementById("disciplina").addEventListener("change", function () {
  disciplinaSelecionada = this.value;
  console.log(disciplinaSelecionada);

  document.querySelector(".nomeSelecaoDisciplina").textContent =
    disciplinaSelecionada;

  document.getElementById("titulo").style.display = "block";
  document.getElementsByClassName("tabela")[0].style.display = "block";

  conteudoEvent();

  const tituloPopupAlunos = document.querySelector(
    "#popupAlunos h2 span.nomeSelecaoDisciplina"
  );
  const tituloPopupFormulario = document.querySelector(
    "#popupFormulario h2 span.nomeSelecaoDisciplina"
  );
  
  if (tituloPopupAlunos && tituloPopupFormulario) {
    tituloPopupAlunos.textContent = disciplinaSelecionada;
    tituloPopupFormulario.textContent = disciplinaSelecionada;
  }

  const dataSelecionada = document.getElementById("data").value;
  if (dataSelecionada) {
    const selectedHorario = horarioSelecionado;
    const selectedDisciplina = this.value;
    const formattedDate = new Date(dataSelecionada);

    if (formattedDate && selectedHorario && selectedDisciplina) {
      // Obter a tabela de horários disponíveis
      const tabelaHorarios = document.querySelector(".tabela");

      // Obter os horários disponíveis para a disciplina selecionada na data escolhida
      const horariosDisponiveis =
        alunosPorHorario[formattedDate][selectedHorario][selectedDisciplina]
          .alunos.length;

      // Destacar os horários disponíveis na tabela
      const horariosCell = tabelaHorarios.querySelector(
        `[data-horario="${selectedHorario}"]`
      );
      horariosCell.textContent = `${selectedHorario} (${horariosDisponiveis} vagas disponíveis)`;
    }
  }
  atualizarCelulasTabela(dataInicial);
  atualizarHorarios();
});

// Função para adicionar os listeners, faz com que apareca o popup quando apertar no event (CERTO)
function adicionarListeners() {
  document.querySelectorAll(".event").forEach((eventLink) => {
    eventLink.addEventListener("click", function () {
      const horarioSelecionado = this.getAttribute("data-horario");
      const colunaIndex = this.parentElement.cellIndex;
      const th = document.querySelector(
        `.calendar-table thead th:nth-child(${colunaIndex})`
      );
      const dataSelecionada = th.getAttribute("data-date");

      console.log(
        "Evento clicado - Data: ",
        dataSelecionada,
        " Horário: ",
        horarioSelecionado,
        " Disciplina: ",
        disciplinaSelecionada
      );

      inicializarEstruturaDeDados(dataSelecionada);
      if (
        alunosPorHorario[dataSelecionada][horarioSelecionado][
          disciplinaSelecionada
        ].vagas > 0
      ) {
        mostrarPopupAlunos(
          dataSelecionada,
          horarioSelecionado,
          disciplinaSelecionada
        );
      } else {
        window.alert("Não temos vagas disponíveis");
      }
    });
  });
}

// Função sla o que mas funciona e se tirar da erro
function conteudoEvent() {
  document.querySelectorAll("a.event").forEach((eventLink) => {
    
    const horario = eventLink.getAttribute("data-horario");
    const disciplinaSelecionada = document.getElementById("disciplina").value;

    eventLink.addEventListener("click", function () {
      const colunaIndex = this.parentElement.cellIndex;
      const th = document.querySelector(
        `.calendar-table thead th:nth-child(${colunaIndex + 1})`
      );
      const dataSelecionada = th.getAttribute("data-date");

      mostrarPopupAlunos(dataSelecionada, horario, disciplinaSelecionada);
    });

    inicializarEstruturaDeDados(dataInicial);
    vagas = alunosPorHorario[dataInicial][horario][disciplinaSelecionada].vagas;

    // eventLink.innerHTML = `
    //   <p>${disciplinaSelecionada}</p>
    //   <p>Professor: ${professores[disciplinaSelecionada]}</p>
    //   `;

    // if (vagas > 0) {
    //   eventLink.innerHTML += `<p>Vagas: ${vagas} ${status[0]}</p>`;
    // } else if (vagas == 0) {
    //   eventLink.innerHTML += `<p>Vagas: ${vagas} ${status[2]}</p>`;
    // } else {
    //   eventLink.innerHTML += `<p>Vagas: ${vagas} ${status[1]}</p>`;
    // }
  });
}

// Função para atualizar as celulas da tabela
function atualizarCelulasTabela(date) {
  const diasSemana = ["seg", "ter", "qua", "qui", "sex"];
  const diasSemanaCompleto = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const dateObj = new Date(date);

  // Ajuste para iniciar na segunda-feira
  const dayOfWeek = dateObj.getDay();
  const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  dateObj.setDate(dateObj.getDate() - difference);

  const ultimoDiaSemana = new Date(dateObj);
  ultimoDiaSemana.setDate(dateObj.getDate() + 4); // Sexta-feira

  // adicionar no calendario a semana
  const caption = document.querySelector(".calendar-caption");
  caption.textContent = `${dateObj.getDate()} – ${ultimoDiaSemana.getDate()} de ${ultimoDiaSemana.toLocaleString(
    "pt-BR",
    { month: "long" }
  )} de ${ultimoDiaSemana.getFullYear()}`;

  diasSemana.forEach((dia, index) => {
    const dataAtual = new Date(dateObj);
    dataAtual.setDate(dateObj.getDate() + index);
    const formattedDate = dataAtual.toISOString().split("T")[0];
    const diaMes = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1; // Month is 0-indexed

    const th = document.getElementById(`horario-${dia}`);
    th.textContent = `${diasSemanaCompleto[index]} ${diaMes}/${mes}`;
    th.setAttribute("data-date", formattedDate); // Define o atributo data-date

    document
      .querySelectorAll(`.diaSemana[data-dia="${dia}"] .event`)
      .forEach((event) => {
        event.setAttribute("data-data", formattedDate);
        console.log("Data atribuída:", event.getAttribute("data-data"));
      });
  });

  adicionarListeners(); // Reconfigurar os listeners após atualização da tabela
}

function inicializarEstruturaDeDados(dataSelecionada) {
  if (!alunosPorHorario[dataSelecionada]) {
    alunosPorHorario[dataSelecionada] = {};
    // const horarios = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
    const horarios = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
    const disciplinas = ["Matemática", "Programação"];
    horarios.forEach((horario) => {
      alunosPorHorario[dataSelecionada][horario] = {};
      disciplinas.forEach((disciplina) => {
        alunosPorHorario[dataSelecionada][horario][disciplina] = {
          alunos: [],
          vagas: numeroInicialDeVagas,
        };
      });
    });
  }
}

function mostrarPopupAlunos(dataSelecionada, horario, disciplinaSelecionada) {
  if (
    !alunosPorHorario[dataSelecionada] ||
    !alunosPorHorario[dataSelecionada][horario] ||
    !alunosPorHorario[dataSelecionada][horario][disciplinaSelecionada]
  ) {
    inicializarEstruturaDeDados(dataSelecionada); // Inicializa dados se não estiverem disponíveis
  } else {
    const alunosList = document.getElementById("alunosList");
    alunosList.innerHTML = ""; // Limpa a lista de alunos

    const alunos =
      alunosPorHorario[dataSelecionada][horario][disciplinaSelecionada].alunos;

    if (alunos.length === 0) {
      alunosList.innerHTML = "<li>Nenhum aluno marcado</li>";
    } else {
      alunos.forEach((aluno) => {
        const li = document.createElement("li");
        li.textContent = aluno.nome;
        alunosList.appendChild(li);
      });
    }

    document.getElementById("popupAlunos").style.display = "block";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";

    let btnAlunos = document.getElementById("btnAlunos");
    btnAlunos.dataset.dataSelecionada = dataSelecionada;
    btnAlunos.dataset.horarioSelecionado = horario;
    btnAlunos.dataset.disciplinaSelecionada = disciplinaSelecionada;

    btnAlunos.addEventListener("click", () => {
      document.getElementById("popupFormulario").style.display = "block";
      document.getElementById("popupAlunos").style.display = "none";
    });

    // Chamar a função filtrarAlunos aqui com os parâmetros corretos
    filtrarAlunos(dataSelecionada, disciplinaSelecionada, horario, serieSelecionada, turmaSelecionada);
  }
}