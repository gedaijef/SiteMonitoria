const data = document.getElementById('data')
const data_label = document.getElementById('data-label')
const msg_erro = document.getElementById('msg-erro')
const calendar_table = document.getElementsByClassName('calendar-table')[0]
const td = document.getElementsByTagName('td')
const th = document.getElementsByTagName('th')

const serie = document.getElementsByClassName('serie-select')[0]
const serie_label = document.getElementById('serie-label')

const disc = document.getElementsByClassName('disc-select')[0]
const disc_label = document.getElementById('disc-label')

const btn_enviar = document.getElementById('enviar')
const btn_marcar = document.getElementById('marcar-monitoria')

desabilitar_filtro_serie()
desabilitar_btn_marcar()


for (let i = 0; i < td.length; i++) {
    td[i].style.borderColor = 'gray'
}
for (let i = 0; i < th.length; i++) {
    th[i].style.borderColor = 'gray'
}

disc.addEventListener('change', () => {
    habilitar_filtro_serie()
})

btn_enviar.addEventListener('click', () => {
    if (btn_enviar.textContent.trim() == 'Enviar') {
        if (verificar_filtros()) {
            habilitar_tabela()
            btn_enviar.innerText = 'Editar'
            desabilitar_filtros()
            habilitar_btn_marcar()
        }
    }
    else {
        btn_enviar.innerText = 'Enviar'
        desabilitar_tabela()
        habilitar_filtros()
        desabilitar_btn_marcar()
    }

})

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

function verificar_filtros() {
    if (data.value == "" || serie.value == "" || disc.value == "") {
        return false
    }
    else {
        return true
    }
}

function habilitar_tabela() {
    if (serie.value != "" && disc.value != "") {
        msg_erro.style.display = 'none'
        calendar_table.classList.remove('tabela-desativada')

        for (let i = 0; i < td.length; i++) {
            td[i].style.borderColor = 'var(--azul100)'
        }
        for (let i = 0; i < th.length; i++) {
            th[i].style.borderColor = 'var(--azul100)'
        }

        for (let i = 0; i < td.length; i++) {
            td[i].addEventListener("click", function () {
                alert('.')
            });
        }
    }
}

function desabilitar_tabela() {
    msg_erro.style.display = 'block'
    calendar_table.classList.add('tabela-desativada')
    for (let i = 0; i < td.length; i++) {
        td[i].style.borderColor = 'gray'
    }
    for (let i = 0; i < th.length; i++) {
        th[i].style.borderColor = 'gray'
    }
}

function habilitar_filtros() {
    data.removeAttribute('disabled');
    data.classList.remove('filtro-desativado')
    data_label.classList.remove('label-filtro-desativado')

    serie.removeAttribute('disabled');
    serie.classList.remove('filtro-desativado')
    serie_label.classList.remove('label-filtro-desativado')

    disc.removeAttribute('disabled');
    disc.classList.remove('filtro-desativado')
    disc_label.classList.remove('label-filtro-desativado')
}

function desabilitar_filtros() {
    data.setAttribute('disabled', 'disabled');
    data.classList.add('filtro-desativado')
    data_label.classList.add('label-filtro-desativado')

    serie.setAttribute('disabled', 'disabled');
    serie.classList.add('filtro-desativado')
    serie_label.classList.add('label-filtro-desativado')

    disc.setAttribute('disabled', 'disabled');
    disc.classList.add('filtro-desativado')
    disc_label.classList.add('label-filtro-desativado')
}

function habilitar_filtro_serie() {
    serie.removeAttribute('disabled');
    serie.classList.remove('filtro-desativado')
    serie_label.classList.remove('label-filtro-desativado')
}

function desabilitar_filtro_serie() {
    serie.setAttribute('disabled', 'disabled');
    serie.classList.add('filtro-desativado')
    serie_label.classList.add('label-filtro-desativado')
}

function habilitar_btn_marcar() {
    btn_marcar.removeAttribute('disabled');
    btn_marcar.classList.remove('filtro-desativado')
}

function desabilitar_btn_marcar() {
    btn_marcar.setAttribute('disabled', 'disabled');
    btn_marcar.classList.add('filtro-desativado')
}

function atualizarCelulasTabela(date) {
    const dateObj = new Date(date);

    const dayOfWeek = dateObj.getDay();
    const difference = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    dateObj.setDate(dateObj.getDate() - difference);

    const ultimoDiaSemana = new Date(dateObj);
    ultimoDiaSemana.setDate(dateObj.getDate() + 4);

    const data_semanas = document.getElementById("data-semanas");
    data_semanas.textContent = `${dateObj.getDate()} – ${ultimoDiaSemana.getDate()} de ${ultimoDiaSemana.toLocaleString(
        "pt-BR",
        { month: "long" }
    )} de ${ultimoDiaSemana.getFullYear()}`;

}