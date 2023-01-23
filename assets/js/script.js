let nome = prompt('Qual é o seu nome?')

const userName = { name: nome }
let chat = document.querySelector('.chat')
const typedMessage = document.querySelector('.text')
verifyUser()

function verifyUser() {
  const checked = axios.post(
    'https://mock-api.driven.com.br/api/v6/uol/participants',
    userName
  )
  checked.then(okUser)
}

function mantendoConexao(){
  const connection = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userName)
  connection.then()
  connection.catch()
}

function checkedChegou(checked) {
  let chat = document.querySelector('.chat')
  chat.innerHTML = ''

  for (let i = 0; i < 100; i++) {
    let hora = checked.data[i].time
    let nome1 = checked.data[i].from
    let nome2 = checked.data[i].to
    let texto = checked.data[i].text
    let tipo = checked.data[i].type

    if (tipo === 'status' || tipo === 'message' ){


      chat.innerHTML += `
      
      <div data-test="message" class="${tipo}">
          (${hora}) ${nome1} para ${nome2}: ${texto}
      </div> 
  
      `;
  }

      if (tipo === 'private_message' && (nome1 === nome || nome2 === nome)){


      chat.innerHTML += `
      
      <div data-test="message" class="${tipo}">
          (${hora}) ${nome1} para ${nome2}: ${texto}
      </div> 
  
      `;
  }
}
  chat.querySelector('div:last-child').scrollIntoView()
}

function deuErro(erro){
  window.location.reload()
}

function serverResponse() {
  const promessa = axios.get(
    'https://mock-api.driven.com.br/api/v6/uol/messages'
  )

  promessa.then(checkedChegou)
  promessa.catch(deuErro)
}

function sendMessage(){

  const msg = {
      from: nome,
      to: "Todos",
      text: typedMessage.value,
      type: "message" 
  }

  const enviar = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msg);

  typedMessage.value=""

  enviar.then(serverResponse);
  enviar.catch(deuErro);
}

function okUser (){
  serverResponse()
  setInterval(function (){ 
      serverResponse()
  } ,3000)
  
  setInterval(mantendoConexao, 5000);
}

document.addEventListener("keypress", function (e){


  if (e.key === "Enter") {

      const btn = document.querySelector('.plane-icon')
      btn.click();
  }
})
  
  
