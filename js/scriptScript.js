import {atualizarDisciplinas} from './scriptConexao.js'
import {atualizarSeries} from './scriptConexao.js'
import {atualizarHorarios} from './scriptConexao.js'

let alunosPorHorario = {};
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

const dropdown_disciplina = document.getElementsByClassName('disc-select')[0];
const dropdown_serie = document.getElementsByClassName("serie-select")[0];
const dropdown_data = document.getElementsByClassName("data-select")[0];
const btn_enviar = document.getElementById("enviar");
const data = document.getElementById("data");
const btn_marcar = document.getElementById("marcar-monitoria");

dropdown_serie.addEventListener("change", () => {
    habilitar_filtro_disciplina()
    atualizarDisciplinas(dropdown_disciplina,dropdown_serie.value)
    if(verificar_filtros()){
        habilitar_btn_enviar()
    }
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

btn_marcar.addEventListener('click',()=>{
    abrir_popup(dropdown_serie.value,dropdown_disciplina.textContent,professor,email)
})

btn_enviar.addEventListener('click',()=>{
    capturaHorario(data.value)
    disciplina = dropdown_disciplina.value
    serie = dropdown_serie.value
    let horarios = atualizarHorarios(dt_inicio,dt_fim,serie,disciplina)
    horarios.then(monitoria => {
        console.log(monitoria)
        email = monitoria[0].professor_email;
        professor = monitoria[0].professor_nome;
    });
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