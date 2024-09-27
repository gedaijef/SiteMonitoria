let series = [];
let series_format;
let response_geral;

let inicio_semana;
let final_semana;

export { response_geral };

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
  const options = dropdown_serie.querySelectorAll("option");

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

export async function atualizarDisciplinas(dropdown_disciplina, serie) {
  try {
    const url = new URL("http://localhost:3000/disciplines/listDisciplines");
    console.log(serie);
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

export async function atualizarHorarios(dt_inicio, dt_fim, serie, disciplina) {
  try {
    const url = new URL("http://localhost:3000/times/filterTimes");
    const body = {
      data_inicio: dt_inicio,
      data_fim: dt_fim,
      ano_serie: serie,
      nome_disciplina: disciplina,
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
    response_geral = horario;
    atualizarListaHorarios(horario);
    montarCards(horario);
  } catch (error) {
    console.error("Erro ao atualizar as disciplinas:", error);
  }
}

const select_horario = document.getElementById("horario-select");
const select_semana = document.getElementById("dia-semana-select");

let horariosSet = new Set();
let diasSet = new Set();

const diaHorarioMap = {};
const horarioDiaMap = {};

export async function atualizarSelects(diaSelecionado, horarioSelecionado) {
  

  const opcao_nula_semana = document.createElement("option");
  opcao_nula_semana.value = "";
  opcao_nula_semana.textContent = "";
  opcao_nula_semana.hidden = true;
  opcao_nula_semana.selected = !diaSelecionado;
  select_semana.appendChild(opcao_nula_semana);

  const opcao_nula_horario = document.createElement("option");
  opcao_nula_horario.value = "";
  opcao_nula_horario.textContent = "";
  opcao_nula_horario.hidden = true;
  opcao_nula_horario.selected = !horarioSelecionado;
  select_horario.appendChild(opcao_nula_horario);

  if (horarioSelecionado) {
    const diasParaHorario = horarioDiaMap[horarioSelecionado] || [];
    diasParaHorario.forEach((dia) => {
      const opcao_semana = document.createElement("option");
      opcao_semana.value = dia;
      opcao_semana.textContent = (dia + "-feira").replace("c", "ç");
      opcao_semana.selected = dia === diaSelecionado;
      select_semana.appendChild(opcao_semana);
    });
  } else {
    Object.keys(diaHorarioMap).forEach((dia) => {
      const opcao_semana = document.createElement("option");
      opcao_semana.value = dia;
      opcao_semana.textContent = (dia + "-feira").replace("c", "ç");
      opcao_semana.selected = dia === diaSelecionado;
      select_semana.appendChild(opcao_semana);
    });
  }

  if (diaSelecionado) {
    const horariosParaDia = diaHorarioMap[diaSelecionado] || [];
    horariosParaDia.forEach((horario) => {
      const opcao_horario = document.createElement("option");
      opcao_horario.value = horario.split(' ')[0];
      opcao_horario.textContent = horario;
      opcao_horario.selected = horario === horarioSelecionado;
      select_horario.appendChild(opcao_horario);
    });
  } else {
    Object.keys(horarioDiaMap).forEach((horario) => {
      const opcao_horario = document.createElement("option");
      opcao_horario.value =  horario.split(' ')[0];
      opcao_horario.textContent = horario;
      opcao_horario.selected = horario === horarioSelecionado;
      select_horario.appendChild(opcao_horario);
    });
  }

  console.log('renato')
}

function atualizarListaHorarios(response) {
  let horariosSet = new Set();
  let diasSet = new Set();
  

  response.forEach((item) => {
    let dia_semana = item["dia_semana"];
    let horario = item["horario_inicio"] + " - " + item["horario_fim"];

    if (!diaHorarioMap[dia_semana]) diaHorarioMap[dia_semana] = [];
    diaHorarioMap[dia_semana].push(horario);

    if (!horarioDiaMap[horario]) horarioDiaMap[horario] = [];
    horarioDiaMap[horario].push(dia_semana);
  });


  select_semana.addEventListener("change", function () {
    const diaSelecionado = select_semana.value;
    const horarioSelecionado = select_horario.value;
    select_horario.innerHTML = "";
    atualizarSelects(diaSelecionado, horarioSelecionado);
  });

  select_horario.addEventListener("change", function () {
    const diaSelecionado = select_semana.value;
    const horarioSelecionado = select_horario.value;
    atualizarSelects(diaSelecionado, horarioSelecionado);
  });

  atualizarSelects(null, null);
}

export async function montarCards(response) {
  const days = document.querySelectorAll(".accordion-button");
  console.log(response);
  days.forEach((button) => {
    button.addEventListener("click", function () {
      const panel = this.nextElementSibling;

      if (panel.style.display === "flex") {
        panel.style.display = "none";
      } else {
        panel.style.display = "flex";
        panel.innerHTML = "";

        const dia = this.parentElement.getAttribute("data-dia");
        const filteredResponse = response.filter(
          (horario) => horario.dia_semana === dia
        );

        if (filteredResponse.length === 0) {
          const noMonitoriaCard = document.createElement("div");
          noMonitoriaCard.classList.add("card");
          noMonitoriaCard.innerHTML = `<p>Não há monitorias para este dia.</p>`;
          panel.appendChild(noMonitoriaCard);
        } else {
          for (let i = 0; i < filteredResponse.length; i++) {
            let serie =
              document.getElementsByClassName("serie-select")[0].value;
            let disciplina =
              document.getElementsByClassName("disc-select")[0].value;
            let professor = filteredResponse[i]["professor_nome"];
            let email = filteredResponse[i]["professor_email"];
            let dia_semana = filteredResponse[i]["dia_semana"];
            let horario =
              filteredResponse[i]["horario_inicio"] +
              " - " +
              filteredResponse[i]["horario_fim"];

            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
              <p><strong>Série:</strong> <span>${serie}ª</span></p>
              <p><strong>Disciplina:</strong> <span>${disciplina}</span></p>
              <p><strong>Dia:</strong> <span>${dia_semana}-feira</span></p>
              <p><strong>Horário:</strong> <span>${horario}</span></p>
              <p><strong>Professor:</strong> <span>${professor}</span></p>
              <p><strong>Email:</strong> <span>${email}</span></p>
            `;

            card.addEventListener("click", function () {
              select_horario.innerHTML=""
              select_semana.innerHTML=""
              preencherFormulario({
                dia_semana,
                horario:
                  filteredResponse[i]["horario_inicio"] +
                  " - " +
                  filteredResponse[i]["horario_fim"],
              });
            });

            panel.appendChild(card);
          }
        }
      }
    });
  });
}

function preencherFormulario({ dia_semana, horario }) {
  console.log(response_geral)
  console.log(dia_semana)
  console.log(horario.split(' - ')[0])
  select_horario.innerHTML = ''
  select_semana.innerHTML = ''
  let find = response_geral.filter(
    (response) =>
      response.dia_semana === dia_semana
  );
  find.forEach((finded) => {
    atualizarSelects(dia_semana,horario)
  })
}

export async function mandarMonitoria(horarios) {
  // try {
  console.log(document.getElementById("data").value)
  getSemana(document.getElementById("data").value);
  
  const url = new URL("http://localhost:3000/monitorings/addMonitoring");
  let jsonArray = JSON.parse(horarios);
  console.log(jsonArray);
  let resultado = jsonArray.find(
    (horario) =>
      horario.dia_semana ===
        document.getElementById("dia-semana-select").value &&
      horario.horario_inicio ===
        document.getElementById("horario-select").value.slice(0, 8)
  );
  console.log(resultado);
  let horario_id = resultado["id_horario"];
  let aluno_nome = document.getElementById("nome-input").value;
  let aluno_email = document.getElementById("email-input").value;

  console.log(aluno_nome);
  console.log(aluno_email);
  console.log(horario_id);
  console.log(inicio_semana);
  console.log(final_semana);

  const body = {
    data_inicio: inicio_semana,
    data_fim: final_semana,
    nome_aluno: aluno_nome,
    email_aluno: aluno_email,
    id_horarios: horario_id,
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
  atualizarListaHorarios(horario);
  // } catch (error) {
  //   console.error("Erro ao atualizar as disciplinas:", error);
  // }
  return horario;
}

function getSemana(data) {
  const dateObj = new Date(data);

  const dayOfWeek = dateObj.getDay();
  const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  dateObj.setDate(dateObj.getDate() - difference);

  const ultimoDiaSemana = new Date(dateObj);
  ultimoDiaSemana.setDate(dateObj.getDate() + 4);

  let mes = (dateObj.getMonth()+1).toString()

  if (mes.length == 1){
    mes = "0"+mes
  }else{
    mes = mes.toString()
  }
  

  inicio_semana =
    dateObj.getFullYear() + "-" + mes + "-" + dateObj.getDate();
  final_semana =
    ultimoDiaSemana.getFullYear() +
    "-" +
    mes +
    "-" +
    ultimoDiaSemana.getDate();
}
