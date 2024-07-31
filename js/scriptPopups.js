document
  .getElementById("btnFormulario")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Impede o recarregamento da página

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const serie = document.querySelector(".nomeSelecaoSerie").textContent;
    const turma = document.querySelector(".nomeSelecaoTurma").textContent;
    const disciplina = document.querySelector(
      ".nomeSelecaoDisciplina"
    ).textContent;
    const horario =
      document.querySelector("#btnAlunos").dataset.horarioSelecionado;
    const dataSelecionada =
      document.querySelector("#btnAlunos").dataset.dataSelecionada;

    // Atualiza estrutura de dados e interface
    adicionarAluno(dataSelecionada, horario, disciplina, { nome, email });
    atualizarPopupAlunos(dataSelecionada, horario, disciplina); // Atualiza a lista no popup

    // Preparar e mostrar popup de confirmação
    prepararPopupConfirmacao(
      nome,
      email,
      serie,
      turma,
      disciplina,
      horario,
      dataSelecionada
    );
  });

function adicionarAluno(data, horario, disciplina, aluno) {
  // if (!alunosPorHorario[data]) {
  //   inicializarEstruturaDeDados(data);
  // }

  // const slot = alunosPorHorario[data][horario][disciplina];
  // slot.alunos.push(aluno);

  addAluno(aluno.nome, aluno.email);
  slot.vagas--; // Reduz a vaga disponível
}

function prepararPopupConfirmacao(
  nome,
  email,
  serie,
  turma,
  disciplina,
  horario,
  data
) {
  const dataFormatada = new Date(data + "T00:00:00").toLocaleDateString(
    "pt-BR",
    { day: "2-digit", month: "2-digit", year: "numeric" }
  );
  const professor = professores[disciplina];

  document.getElementById("alunoConfirmado").innerHTML = `
      <p>Nome: ${nome}</p>
      <p>Email: ${email}</p>
      <p>Série/Turma: ${serie}/${turma}</p>
      <p>Disciplina: ${disciplina}</p>
      <p>Professor: ${professor}</p>
      <p>Data: ${dataFormatada}</p>
      <p>Horário: ${horario}</p>
  `;
  document.getElementById("popupFormulario").style.display = "none";
  document.getElementById("popupConfirmacao").style.display = "block";
  document.getElementsByTagName("body")[0].style.overflow = "hidden";

  // Limpar os inputs do formulário
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
}

function fecharPopUpConfirmacao() {
  document.getElementById("popupConfirmacao").style.display = "none";
  document.getElementsByTagName("body")[0].style.overflow = "auto";
}

function fecharPopUp1() {
  document.getElementById("popupAlunos").style.display = "none";
  document.getElementsByTagName("body")[0].style.overflow = "auto";
}

function fecharPopUp2() {
  document.getElementById("popupFormulario").style.display = "none";
  document.getElementById("popupAlunos").style.display = "none";
  document.getElementsByTagName("body")[0].style.overflow = "auto";
}

function voltarPopUp() {
  // Fechar o popup de confirmação
  document.getElementById("popupFormulario").style.display = "none";
  document.getElementById("popupAlunos").style.display = "block";
}