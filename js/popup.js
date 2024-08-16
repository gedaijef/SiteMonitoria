const container_popup = document.getElementById('container-popup')
const popup = document.getElementById('popup')

const span_serie = document.getElementById('span-serie')
const span_disc = document.getElementById('span-disc')
const span_prof = document.getElementById('span-prof')
const span_email = document.getElementById('span-email')

btn_marcar.addEventListener('click', () => {
    abrir_popup()
})

container_popup.addEventListener('click', (event) => {
    if (event.target === container_popup) {
        fechar_popup()
    }
})

function abrir_popup() {
    container_popup.style.display = 'block'
    popup.style.display = 'block'

    span_serie.innerText = serie.value+"º"
    span_disc.innerText = disc.value
}

function fechar_popup() {
    container_popup.style.display = 'none'
    popup.style.display = 'none'
}