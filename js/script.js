const data = document.getElementById('data')
const msg_erro = document.getElementById('msg-erro')
const calendar_table = document.getElementsByClassName('calendar-table')[0]
const td = document.getElementsByTagName('td')
const th = document.getElementsByTagName('th')

const turma = document.getElementsByClassName('turma-select')[0]
const turma_label = document.getElementById('turma-label')
turma.setAttribute('disabled', 'disabled');
turma.classList.add('filtro-desativado')
turma_label.classList.add('label-filtro-desativado')

const serie = document.getElementsByClassName('serie-select')[0]
const serie_label = document.getElementById('serie-label')
serie.setAttribute('disabled', 'disabled');
serie.classList.add('filtro-desativado')
serie_label.classList.add('label-filtro-desativado')

const disc = document.getElementsByClassName('disc-select')[0]
const disc_label = document.getElementById('disc-label')
disc.setAttribute('disabled', 'disabled');
disc.classList.add('filtro-desativado')
disc_label.classList.add('label-filtro-desativado')

for (let i = 0; i < td.length; i++) {
    td[i].style.borderColor = 'gray'
}
for (let i = 0; i < th.length; i++) {
    th[i].style.borderColor = 'gray'
}

data.addEventListener('change', function () {
    if (data.value == "") {
        turma.value = ''
        turma.setAttribute('disabled', 'disabled');
        turma.classList.add('filtro-desativado')
        turma_label.classList.add('label-filtro-desativado')


        serie.value = ''
        serie.setAttribute('disabled', 'disabled');
        serie.classList.add('filtro-desativado')
        serie_label.classList.add('label-filtro-desativado')

        disc.value = ''
        disc.setAttribute('disabled', 'disabled');
        disc.classList.add('filtro-desativado')
        disc_label.classList.add('label-filtro-desativado')


    }
    else {
        turma.removeAttribute('disabled');
        turma.classList.remove('filtro-desativado')
        turma_label.classList.remove('label-filtro-desativado')

        serie.removeAttribute('disabled');
        serie.classList.remove('filtro-desativado')
        serie_label.classList.remove('label-filtro-desativado')

        disc.removeAttribute('disabled');
        disc.classList.remove('filtro-desativado')
        disc_label.classList.remove('label-filtro-desativado')

    }
})

function habilitar_tabela() {
    if (turma.value != "" && serie.value != "" && disc.value != "") {
        msg_erro.style.display = 'none'
        calendar_table.classList.remove('tabela-desativada')

        for (let i = 0; i < td.length; i++) {
            td[i].style.borderColor = 'var(--azul100)'
        }
        for (let i = 0; i < th.length; i++) {
            th[i].style.borderColor = 'var(--azul100)'
        }

        // atualizarSeries()
        // adicionarListeners();
        filtrar_tabela()

    }
    else {
        msg_erro.style.display = 'block'
        calendar_table.classList.add('tabela-desativada')
        for (let i = 0; i < td.length; i++) {
            td[i].style.borderColor = 'gray'
        }
        for (let i = 0; i < th.length; i++) {
            th[i].style.borderColor = 'gray'
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const hoje = new Date();
    dataInicial = hoje.toISOString().split("T")[0];
    data.min = hoje.toISOString().split("T")[0];
    data.max = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 14)
        .toISOString()
        .split("T")[0];


    data.addEventListener("change", function () {
        if (data.value != "") {
            atualizarCelulasTabela(data.value);
        }
        else {
            msg_erro.style.display = 'block'
            calendar_table.classList.add('tabela-desativada')
        }
    });
});

function filtrar_tabela() {
    
}