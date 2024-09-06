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
const select_dia_semana = document.getElementsByClassName('dia-semana-select')[0]
let serieSelecionada;
let turmaSelecionada;
let disciplinaSelecionada;
let series_format;

// função para pegar todas as séries e mostrar na interface
export async function atualizarSeries(dropdown_serie) {
  try {
    const url = new URL(`http://localhost:3000/series/listSeries`);
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.statusText}`);
    }

    series = await response.json();
    // Adicionando "° Ano/Série" a cada item individualmente, convertendo ano para string
    series_format = series
      .map((serie) => {
        if (serie.ano_serie >= 1 && serie.ano_serie <= 3) {
          return serie.ano_serie.toString() + "° Série";
        } else if (serie.ano_serie >= 6 && serie.ano_serie <= 9) {
          return serie.ano_serie.toString() + "° Ano";
        } else {
          return serie.ano_serie.toString();
        }
      })
      .filter((serie) => serie !== undefined);
    atualizarListaSeries(series, dropdown_serie);
  } catch (error) {
    console.error("Erro ao atualizar as séries:", error);
  }
}

function atualizarListaSeries(series, dropdown_serie) {
  dropdown_serie.innerHTML = "";
  const options = dropdown_serie.querySelectorAll('option')

  const opcaoNula = document.createElement("option");
  opcaoNula.selected = true;
  opcaoNula.value = "";
  opcaoNula.textContent = "";
  opcaoNula.hidden = true;
  dropdown_serie.appendChild(opcaoNula);

  series.forEach((serie) => {
    const opcao = document.createElement("option");
    opcao.value = serie.ano_serie;
    opcao.textContent = serie.nome_ano_serie;
    dropdown_serie.appendChild(opcao);
  });
}

// function atualizarListaTurmas() {
//   const selecaoTurma = document.getElementById("turma");
//   // Limpando as opções existentes
//   selecaoTurma.innerHTML = "";

//   // Adicionando a opção nula
//   const opcaoNula = document.createElement("option");
//   opcaoNula.value = "";
//   opcaoNula.textContent = "Selecionar";
//   selecaoTurma.appendChild(opcaoNula);

//   if (turmas.length === 0) {
//     const opcao = document.createElement("option");
//     opcao.textContent = "Nenhuma turma disponível";
//     selecaoTurma.appendChild(opcao);
//     return;
//   }

//   turmas.forEach((turma) => {
//     const opcao = document.createElement("option");
//     opcao.value = turma; // Verifique se 'nome' é a propriedade correta
//     opcao.textContent = turma;
//     selecaoTurma.appendChild(opcao);
//   });
// }

// função para pegar todas as disciplinas e mostrar na interface
export async function atualizarDisciplinas(dropdown_disciplina, serie) {
  try {
    const url = new URL("http://localhost:3000/disciplines/listDisciplines");
    const body = {
      ano_serie: serie,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.statusText}`);
    }

    const disciplinas = await response.json();
    console.log("Disciplinas:", disciplinas);
    atualizarListaDisciplinas(disciplinas, dropdown_disciplina);
  } catch (error) {
    console.error("Erro ao atualizar as disciplinas:", error);
  }
}
function atualizarListaDisciplinas(disciplinas, dropdown_disciplina) {
  dropdown_disciplina.innerHTML = "";

  const opcaoNula = document.createElement("option");
  opcaoNula.selected = true;
  opcaoNula.value = "";
  opcaoNula.textContent = "";
  opcaoNula.hidden = true;
  dropdown_disciplina.appendChild(opcaoNula);

  disciplinas.forEach((disciplina) => {
    const opcao = document.createElement("option");
    opcao.value = disciplina.nome;
    opcao.textContent = disciplina.nome;
    dropdown_disciplina.appendChild(opcao);
  });
}

// função para pegar todos os horários e mostrar na interface
export async function atualizarHorarios(dt_inicio,dt_fim,serie,disciplina) {
  try {
    const url = new URL("http://localhost:3000/schedules/filterSchedules");
    const body = {
      data_inicio : dt_inicio,
      data_fim : dt_fim,
      ano_serie : serie,
      nome_disciplina : disciplina
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.statusText}`);
    }

    const horario = await response.json();
    return horario
  } catch (error) {
    console.error("Erro ao atualizar as disciplinas:", error);
  }
}

async function atualizarListaHorarios(horarios) {
  const tdEvery = document.querySelectorAll("td.diaSemana.horario-disponivel");

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