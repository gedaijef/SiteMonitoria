import {atualizarDisciplinas} from './scriptConexao.js'
import {atualizarSeries} from './scriptConexao.js'
import {atualizarHorarios} from './scriptConexao.js'
import { mandarMonitoria } from './scriptConexao.js'
import { response_geral } from './scriptConexao.js'
import { atualizarSelects } from './scriptConexao.js'

const container_popup = document.getElementById('container-popup')
const popup = document.getElementById('popup')
const body = document.getElementsByTagName('body')[0]
let alunosPorHorario = {};
const semana_select = document.getElementById("dia-semana-select")
const horario_select = document.getElementById("horario-select")
const nome_input = document.getElementById("nome-input")
const email_input = document.getElementById("email-input")
let status = ["Livre", "Indisponível", "Ocupado"];
let numeroInicialDeVagas = 5;
let diaSelecionado = 0;
let horarioSelecionado = 0;
let teste = "";
let vagas = 0;
let dataInicial = "";
let dt_inicio
let dt_fim
let disciplina
let serie
let professor
let email
let horariosMonitoria = []
const btn_marcar = document.getElementById("marcar-monitoria");

const dropdown_disciplina = document.getElementsByClassName('disc-select')[0];
const dropdown_serie = document.getElementsByClassName("serie-select")[0];
const dropdown_data = document.getElementsByClassName("data-select")[0];
const btn_enviar = document.getElementById("enviar");
const data = document.getElementById("data");
const limpar = document.getElementById("limpar")


btn_marcar.addEventListener("click", ()=>{
    const response = JSON.stringify(response_geral,null,2)
    console.log(mandarMonitoria(response))
})

limpar.addEventListener("click",()=>{
    horario_select.innerHTML = "";
    semana_select.innerHTML = "";
    email_input.innerHTML = "";
    nome_input.innerHTML = "";
    atualizarSelects(null,null)
    habilitar_select_semana()
})

semana_select.addEventListener("change", () => {
    habilitar_select_horario();
    desabilitar_select_semana();
    if(verificar_forms()){
        habilitar_btn_marcar()
    }
})
horario_select.addEventListener("change", () => {
    desabilitar_select_horario();
    if(verificar_forms()){
        habilitar_btn_marcar()
    }
})

nome_input.addEventListener("change", () => {
    if (nome_input.value === "") {
        desabilitar_btn_marcar()
      }if (verificar_forms()) {
        habilitar_btn_marcar();
      }
})
email_input.addEventListener("change", () => {
  if (email_input.value === "") {
    desabilitar_btn_marcar()
  }if (verificar_forms()) {
    habilitar_btn_marcar();
  }
});


// btn_enviar.addEventListener("click", () => {
//     if (btn_enviar.textContent.trim() == "Enviar") {
//       if (verificar_filtros()) {
//         btn_enviar.innerText = "Editar";
//       }
//     } else {
//       btn_enviar.innerText = "Enviar";
//     }
//   });

dropdown_disciplina.addEventListener("focus",()=>{
    atualizarDisciplinas(dropdown_disciplina,dropdown_serie.value);
});

dropdown_disciplina.addEventListener("change",()=>{
    if(verificar_filtros()){
        habilitar_btn_enviar()
    }
});

dropdown_data.addEventListener("change",()=>{
    if(verificar_filtros()){
        habilitar_btn_enviar()
    }
});

dropdown_serie.addEventListener("focus", ()=>{
    atualizarSeries(dropdown_serie)
});

dropdown_serie.addEventListener("change",()=>{
    habilitar_filtro_disciplina();
})

btn_enviar.addEventListener('click',()=>{
    console.log(capturaHorario(data.value))
    atualizarHorarios(dt_inicio,dt_fim,dropdown_serie.value,dropdown_disciplina.value)
})



function capturaHorario(date) {
    const dateObj = new Date(date);
  
    const dayOfWeek = dateObj.getDay(); 
    const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    dateObj.setDate(dateObj.getDate() - difference);
    
    const dia_inicio = dateObj.getDate().toString().padStart(2, '0'); 
    const mes = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dateObj.getFullYear();

    const ultimoDiaSemana = new Date(dateObj); 
    ultimoDiaSemana.setDate(dateObj.getDate() + 4);
    const dia_fim = ultimoDiaSemana.getDate().toString().padStart(2, '0');

    dt_inicio = String(ano+'-'+mes+'-'+dia_inicio)
    dt_fim = String(ano+'-'+mes+'-'+dia_fim)
}