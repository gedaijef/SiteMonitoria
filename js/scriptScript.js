let alunosPorHorario = {};
let status = ["Livre", "Indisponível", "Ocupado"];
let numeroInicialDeVagas = 5;
let diaSelecionado = 0;
let horarioSelecionado = 0;
let teste = "";
let vagas = 0;
let dataInicial = "";



// Isso aqui faz aparecer as opções de turma e disciplina dinamicamente (CERTO)
// document.getElementById("serie").addEventListener("change", function () {
//   serieSelecionada = this.value;
//   document.getElementById("selecaoTurma").style.display = this.value
//     ? "block"
//     : "none";
//   document.querySelector(".nomeSelecaoSerie").textContent = serieSelecionada;
//   console.log(serieSelecionada);
//   atualizarTurmas(serieSelecionada);
// });

// document.getElementById("turma").addEventListener("change", function () {
//   turmaSelecionada = this.value;
//   document.getElementById("selecaoDisciplina").style.display = this.value
//     ? "block"
//     : "none";
//   document.querySelector(".nomeSelecaoTurma").textContent = turmaSelecionada;
//   console.log(turmaSelecionada);
//   // atualizarDisciplinas(turmaSelecionada);
//   atualizarDisciplinas();
// });

// disc.addEventListener("change", function () {
//   console.log(disc.value);

//   conteudoEvent();

//   if (data) {
//     const selectedHorario = horarioSelecionado;
//     const selectedDisciplina = this.value;
//     const formattedDate = new Date(data);

//     if (formattedDate && selectedHorario && selectedDisciplina) {
//       // Obter a tabela de horários disponíveis
//       const tabelaHorarios = document.querySelector(".tabela");

//       // Obter os horários disponíveis para a disciplina selecionada na data escolhida
//       const horariosDisponiveis =
//         alunosPorHorario[formattedDate][selectedHorario][selectedDisciplina]
//           .alunos.length;

//       // Destacar os horários disponíveis na tabela
//       const horariosCell = tabelaHorarios.querySelector(
//         `[data-horario="${selectedHorario}"]`
//       );
//       horariosCell.textContent = `${selectedHorario} (${horariosDisponiveis} vagas disponíveis)`;
//     }
//   }
//   // atualizarCelulasTabela(dataInicial);
//   // atualizarHorarios();
// });

// Função para adicionar os listeners, faz com que apareca o popup quando apertar no event (CERTO)
// function adicionarListeners() {
//   document.querySelectorAll(".diaSemana").forEach((eventLink) => {
//     eventLink.addEventListener("click", function () {
//       const colunaIndex = this.parentElement.cellIndex;
//       const horarioSelecionado = this.getAttribute("data-horario");
//       const dataSelecionada = this.getAttribute("data-dia");

//       console.log(
//         "Evento clicado - Data: ",
//         dataSelecionada,
//         " Horário: ",
//         horarioSelecionado,
//         " Disciplina: ",
//         disciplinaSelecionada
//       );

//       inicializarEstruturaDeDados(dataSelecionada);

//       mostrarPopupFormulario(
//         dataSelecionada,
//         horarioSelecionado,
//         disciplinaSelecionada
//       );
//     });
//   });
// }

// Função sla o que mas funciona e se tirar da erro
// function conteudoEvent() {
//   document.querySelectorAll("a.event").forEach((eventLink) => {
//     const horario = eventLink.getAttribute("data-horario");
//     const disciplinaSelecionada = document.getElementById("disciplina").value;

//     eventLink.addEventListener("click", function () {
//       const colunaIndex = this.parentElement.cellIndex;
//       const th = document.querySelector(
//         `.calendar-table thead th:nth-child(${colunaIndex + 1})`
//       );
//       const dataSelecionada = th.getAttribute("data-date");

//       mostrarPopupFormulario(dataSelecionada, horario, disciplinaSelecionada);
//     });

//     inicializarEstruturaDeDados(dataInicial);
//   });
// }

// Função para atualizar as celulas da tabela de acordo com o dia selecionado


// function inicializarEstruturaDeDados(dataSelecionada) {
//   if (!alunosPorHorario[dataSelecionada]) {
//     alunosPorHorario[dataSelecionada] = {};
//     // const horarios = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
//     const horarios = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
//     const disciplinas = ["Matemática", "Programação"];
//     horarios.forEach((horario) => {
//       alunosPorHorario[dataSelecionada][horario] = {};
//       disciplinas.forEach((disciplina) => {
//         alunosPorHorario[dataSelecionada][horario][disciplina] = {
//           alunos: [],
//           vagas: numeroInicialDeVagas,
//         };
//       });
//     });
//   }
// }

// function mostrarPopupFormulario(
//   dataSelecionada,
//   horario,
//   disciplinaSelecionada
// ) {
//   btnFormulario = document.getElementById("btnFormulario");
//   inicializarEstruturaDeDados(dataSelecionada); // Inicializa dados se não estiverem disponíveis

//   document.getElementById("popupFormulario").style.display = "block";
//   document.getElementsByTagName("body")[0].style.overflow = "hidden";

//   btnFormulario.dataset.dataSelecionada = dataSelecionada;
//   btnFormulario.dataset.horarioSelecionado = horario;
//   btnFormulario.dataset.disciplinaSelecionada = disciplinaSelecionada;

//   btnFormulario.addEventListener("click", () => {
//     document.getElementById("popupConfirmacao").style.display = "block";
//     document.getElementById("popupFormulario").style.display = "none";
//   });
// }