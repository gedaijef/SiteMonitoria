// function calendario_monitoria() {
//     const dados = {
//         "data_inicio": "2024-08-19",
//         "data_fim": "2024-08-23",
//         "nome_disciplina": "Programação"
//     }
//     fetch('http://localhost:3000/horarios/filtrarHorarios', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dados)
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// }