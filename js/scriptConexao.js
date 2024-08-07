// função para a filtragem de alunos na data/disciplina/horario/serie/ano selecionados
async function filtrarAlunos(data, disciplina, horario, serie, turma) {
  try {
    const url = new URL("http://localhost:3000/api/monitorias");
    const params = {
      data: data,
      horario: horario,
      disciplina: disciplina,
      serie: serie,
      turma: turma,
    };
    url.search = new URLSearchParams(params).toString();
    const urlCompleta = url.origin + url.pathname + url.search;
    console.log("URL COMPLETA", urlCompleta);

    const response = await fetch(urlCompleta, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.statusText}`);
    }

    const alunos = await response.json();
    console.log("Alunos filtrados:", alunos);
    atualizarListaAlunos(alunos);
  } catch (error) {
    console.error("Erro ao filtrar alunos:", error);
  }
}

function atualizarListaAlunos(alunos) {
  console.log("Atualizando a lista de alunos");
  const alunosList = document.getElementById("alunosList");
  alunosList.innerHTML = ""; // Limpa a lista de alunos

  if (alunos.length === 0) {
    alunosList.innerHTML = "<li>Nenhum aluno encontrado</li>";
  } else {
    alunos.forEach((aluno) => {
      const li = document.createElement("li");
      li.textContent = aluno.nome;
      alunosList.appendChild(li);
    });
  }
}

function atualizarLista(dados) {
  console.log("Atualizando a lista de dados");
  const tabela = document.getElementById("tabelaHorarios");
  tabela.innerHTML = ""; // Limpa a tabela

  if (dados.length === 0) {
    tabela.innerHTML = "<tr><td colspan='5'>Nenhum dado encontrado</td></tr>";
  } else {
    dados.forEach((dado) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${dado.horario}</td>
        <td>${dado.professor_nome}</td>
        <td>${dado.qnt_vagas}</td>
        <td>${dado.disciplina_nome}</td>
        <td>${dado.ano_serie}</td>
      `;
      tabela.appendChild(tr);
    });
  }
}

// Variáveis globais
let series = [];
let turmas = [];
let disciplinas = [];
let serieSemSufixo = "";
let tdElement = null;

let serieSelecionada;
let turmaSelecionada;
let disciplinaSelecionada;

// função para pegar todas as séries e mostrar na interface
async function atualizarSeries() {
  try {
    const url = new URL("http://localhost:3000/api/series");
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.statusText}`);
    }

    series = await response.json();
    console.log("series:", series);
    // Adicionando "° Ano/Série" a cada item individualmente, convertendo ano para string
    series = series
      .map((serie) => {
        if (serie.ano_serie >= 1 && serie.ano_serie <= 3) {
          return serie.ano_serie.toString() + "° Série";
        } else if (serie.ano_serie >= 6 && serie.ano_serie <= 9) {
          return serie.ano_serie.toString() + "° Ano";
        } else {
          return serie.ano_serie.toString();
        }
      })
      .filter((serie) => serie !== undefined); // Filtrando valores undefined
    console.log("Series:", series);
    atualizarListaSeries();
  } catch (error) {
    console.error("Erro ao atualizar as séries:", error);
  }
}

function atualizarListaSeries() {
  const selecaoSerie = document.getElementById("serie");
  // Limpando as opções existentes
  selecaoSerie.innerHTML = "";

  // Adicionando a opção nula
  const opcaoNula = document.createElement("option");
  opcaoNula.value = "";
  opcaoNula.textContent = "Selecionar";
  selecaoSerie.appendChild(opcaoNula);

  series.forEach((serie) => {
    const opcao = document.createElement("option");
    opcao.value = serie;
    opcao.textContent = serie;
    selecaoSerie.appendChild(opcao);
  });
}

// função para pegar todas as turmas e mostrar na interface
async function atualizarTurmas() {
  const selecaoSerie = document.getElementById("serie");
  serieSelecionada = selecaoSerie.value;
  serieSemSufixo = serieSelecionada.replace("° Série", "").replace("° Ano", "");
  console.log("serie sem sufixo:", serieSemSufixo);

  try {
    const url = new URL(`http://localhost:3000/api/turmas/porSerie`);
    const params = { serie: serieSemSufixo };
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Resposta da API para turmas:", data); // Adicione este log
    turmas = data;
    atualizarListaTurmas();
  } catch (error) {
    console.error("Erro ao atualizar as turmas:", error);
  }
}

function atualizarListaTurmas() {
  const selecaoTurma = document.getElementById("turma");
  // Limpando as opções existentes
  selecaoTurma.innerHTML = "";

  // Adicionando a opção nula
  const opcaoNula = document.createElement("option");
  opcaoNula.value = "";
  opcaoNula.textContent = "Selecionar";
  selecaoTurma.appendChild(opcaoNula);

  if (turmas.length === 0) {
    const opcao = document.createElement("option");
    opcao.textContent = "Nenhuma turma disponível";
    selecaoTurma.appendChild(opcao);
    return;
  }

  turmas.forEach((turma) => {
    const opcao = document.createElement("option");
    opcao.value = turma; // Verifique se 'nome' é a propriedade correta
    opcao.textContent = turma;
    selecaoTurma.appendChild(opcao);
  });
}

// função para pegar todas as disciplinas e mostrar na interface
async function atualizarDisciplinas() {
  try {
    const url = new URL("http://localhost:3000/api/disciplinas");
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.statusText}`);
    }

    disciplinas = await response.json();
    console.log("Disciplinas:", disciplinas);
    atualizarListaDisciplinas();
  } catch (error) {
    console.error("Erro ao atualizar as disciplinas:", error);
  }
}

function atualizarListaDisciplinas() {
  const selecaoDisciplina = document.getElementById("disciplina");
  // Limpando as opções existentes
  selecaoDisciplina.innerHTML = "";

  // Adicionando a opção nula
  const opcaoNula = document.createElement("option");
  opcaoNula.value = "";
  opcaoNula.textContent = "Selecionar";
  selecaoDisciplina.appendChild(opcaoNula);

  disciplinas.forEach((disciplina) => {
    const opcao = document.createElement("option");
    opcao.value = disciplina.nome;
    opcao.textContent = disciplina.nome;
    selecaoDisciplina.appendChild(opcao);
  });
}

// // função para pegar todos os horários e mostrar na interface
async function atualizarHorarios() {
  try {
    const url = new URL(
      `http://localhost:3000/api/horarios/filtrarHorarios?ano_serie=${serieSemSufixo}&disciplina=${disciplinaSelecionada}`
    );
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.statusText}`);
    }

    const horarios = await response.json();
    console.log("Horarios recebidos:", horarios); // Adicione este log para inspecionar os dados recebidos

    atualizarListaHorarios(horarios);
  } catch (error) {
    console.error("Erro ao atualizar os horarios:", error);
  }
}

async function atualizarListaHorarios(horarios) {
  const tdEvery = document.querySelectorAll(
    "td.diaSemana.horario-disponivel"
  );

  tdEvery.forEach((td) => {
    const pElements = td.querySelectorAll("p");

    td.classList.remove("horario-disponivel");

    pElements.forEach((p) => {
      p.remove();
    });
  });
  
  horarios.forEach((horario) => {
    console.log("Horário:", horario); // Adicione este log para inspecionar o objeto

    const diaSemana = horario.dia_semana;
    const horarioInicio = horario.horario_inicio;

    // Selecione o td correspondente usando data attributes
    const tdElement = document.querySelector(
      `td.diaSemana[data-dia='${diaSemana}'][data-horario='${horarioInicio}']`
    );

    // // Seleciona o elemento <a> dentro do <td>
    // eventElement = tdElement.querySelector("a.event");

    console.log("tdElement:", tdElement);
    console.log("tdEvery:", tdEvery);

    if (tdElement) {
      console.log("tdElement:", tdElement);
      console.log("Professor:", horario.nome);
      console.log("Vagas:", horario.qnt_vagas);

      tdElement.classList.add("horario-disponivel");

      // Adiciona o conteúdo <p> no elemento <a>
      if (horario.nome && horario.qnt_vagas) {
        tdElement.innerHTML = `
          <p>Professor: ${horario.nome}</p>
          <p>Vagas: ${horario.qnt_vagas}</p>`;
        tdElement.style.cursor = "pointer"; // Define o cursor como pointer
        tdElement.style.backgroundColor = ""; // Remove o fundo vermelho, caso tenha sido definido anteriormente
      } else {
        // Caso não tenha conteúdo, ajusta o estilo do <a>
        tdElement.style.cursor = "default"; // Define o cursor como padrão
        tdElement.style.backgroundColor = "red"; // Define o fundo vermelho
      }
    } else {
      console.warn(
        `Elemento td.diaSemana[data-dia='${diaSemana}'][data-horario='${horarioInicio}'] não encontrado`
      );
    }
  });
}

// async function atualizarListaHorarios(horarios) {
//   horarios.forEach((horario) => {
//     console.log("Horário:", horario); // Adicione este log para inspecionar o objeto

//     const diaSemana = horario.dia_semana;
//     const horarioInicio = horario.horario_inicio;

//     // Selecione o td correspondente usando data attributes
//     const tdElement = document.querySelector(
//       `td.diaSemana[data-dia='${diaSemana}'][data-horario='${horarioInicio}']`
//     );

//     if (tdElement) {
//       console.log("tdElement:", tdElement);
//       console.log("Professor:", horario.nome);
//       console.log("Vagas:", horario.qnt_vagas);

//       tdElement.classList.add("horario-disponivel");

//       // Seleciona o elemento <a> dentro do <td>
//       const tdElement = tdElement.querySelector("a.event");

//       // Adiciona o conteúdo <p> no elemento <a>
//       tdElement.innerHTML = `
//         <p>Professor: ${horario.nome}</p>
//         <p>Vagas: ${horario.qnt_vagas}</p>`;
//     } else {
//       console.warn(`Elemento td.diaSemana[data-dia='${diaSemana}'][data-horario='${horarioInicio}'] não encontrado`);
//     }
//   });
// }
