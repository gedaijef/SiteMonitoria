import {atualizarDisciplinas} from './scriptConexao.js'
import {atualizarSeries} from './scriptConexao.js'
let alunosPorHorario = {};
let status = ["Livre", "Indisponível", "Ocupado"];
let numeroInicialDeVagas = 5;
let diaSelecionado = 0;
let horarioSelecionado = 0;
let teste = "";
let vagas = 0;
let dataInicial = "";
const dropdown_disciplina = document.getElementsByClassName('disc-select')[0];
const dropdown_serie = document.getElementsByClassName("serie-select")[0];
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

dropdown_serie.addEventListener("focus", ()=>{
    atualizarSeries(dropdown_serie)

});
