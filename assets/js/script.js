let nome = prompt('Qual é o seu nome?')

const nomeUsuario = { name: nome }
let chat = document.querySelector('.chat')
const mensagemDigitada = document.querySelector('.text')
verificandoUsuario()

function verificandoUsuario() {
  const resposta = axios.post(
    'https://mock-api.driven.com.br/api/v6/uol/participants',
    nomeUsuario
  )
  resposta.then(usuarioOk)
}

function conexao(){
  const manterConexao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeUsuario)
  manterConexao.then()
  manterConexao.catch()
}

function resposta(resposta) {
  let chat = document.querySelector('.chat')
  chat.innerHTML = ''

  for (let i = 0; i < 100; i++) {
    let hora = resposta.data[i].time
    let nome1 = resposta.data[i].from
    let nome2 = resposta.data[i].to
    let texto = resposta.data[i].text
    let tipo = resposta.data[i].type

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

function pegarConversaNoServidor() {
  const promessa = axios.get(
    'https://mock-api.driven.com.br/api/v6/uol/messages'
  )

  promessa.then(resposta)
  promessa.catch(deuErro)
}

function enviarMensagem(){

  const msg = {
      from: nome,
      to: "Todos",
      text: mensagemDigitada.value,
      type: "message" 
  }

  const enviar = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msg);

  mensagemDigitada.value=""

  enviar.then(pegarConversaNoServidor);
  enviar.catch(deuErro);
}

function usuarioOk (){
  pegarConversaNoServidor()
  setInterval(function (){ 
      pegarConversaNoServidor()
  } ,3000)
  
  setInterval(conexao, 5000);
}

document.addEventListener("keypress", function (e){


  if (e.key === "Enter") {

      const btn = document.querySelector('.paper-plane')
      btn.click();
  }
})