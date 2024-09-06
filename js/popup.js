const container_popup = document.getElementById('container-popup')
const popup = document.getElementById('popup')

const span_serie = document.getElementById('span-serie')
const span_disc = document.getElementById('span-disc')
const span_prof = document.getElementById('span-prof')
const span_email = document.getElementById('span-email')
const body = document.getElementsByTagName('body')[0]


container_popup.addEventListener('click', (event) => {
    if (event.target === container_popup) {
        fechar_popup()
    }
})



function abrir_popup(serie,disciplina,professor,email) {
    container_popup.style.display = 'flex'
    popup.style.display = 'block'
    body.style.position = 'fixed'

    if (serie <=1 && serie >= 3){
        span_serie.innerText = serie+"ª série"
    }span_serie.innerText = serie+"º ano"

    span_disc.innerText = disciplina    
    
    span_prof.innerText = professor

    span_email.innerText = email
}

function fechar_popup() {
    container_popup.style.display = 'none'
    popup.style.display = 'none'
    body.style.position = ''
}