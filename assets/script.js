//token de acesso ao chat
axios.defaults.headers.common['Authorization'] = 'fsJIJMoGdVoTAHN6sjxIvaC7'

let url_participants = 'https://mock-api.driven.com.br/api/vm/uol/participants'
let url_status = 'https://mock-api.driven.com.br/api/vm/uol/status'
let url_messages = 'https://mock-api.driven.com.br/api/vm/uol/messages'

//validação de usuario 
let nome = prompt('Qual é o seu nome?')
while (nome === '' || nome === null) {
  alert('Insira um nome de usuário!')
  nome = prompt('Qual é o seu nome?')
}

const usuario = { name: nome }
let chat = document.getElementsByClassName('chat')
const mensagemDigitadaPeloUsuario = document.getElementsByClassName('text')
verificaNomeDoUsuarioNoServidor()

//enviar ao servidor o nome do usuário
function verificaNomeDoUsuarioNoServidor() {
  axios.post(url_participants, usuario)
    .then(usuarioLivreParaAcesso)
    .catch(deuErro)
}

//verifica conexao
function manterConexao() {
  axios.post(url_status, usuario)
    .then()
    .catch(deuErro)
}

function resposta(resposta) {
  let chat = document.querySelector('.chat')
  chat.innerHTML = ''

  for (let i = 0; i < 100; i++) {
    let agora = new Date()
    let hora = agora.toLocaleTimeString()
    let nomeDoUsuarioQueEnviaMensagem = resposta.data[i].from
    let nomeDoUsuarioQueRecebeMensagem = resposta.data[i].to
    let texto = resposta.data[i].text
    let tipoDaMensagemDeMensagem = resposta.data[i].type

    let classeMensagem = ''
    if (tipoDaMensagemDeMensagem === 'status' || tipoDaMensagemDeMensagem === 'message') {
      classeMensagem = 'message-others'
    } if (tipoDaMensagemDeMensagem === 'private_message' && (nomeDoUsuarioQueEnviaMensagem === nome || nomeDoUsuarioQueRecebeMensagem === nome)) {
      classeMensagem = 'message-others private-message'
    } if (tipoDaMensagemDeMensagem === 'private_message' && nomeDoUsuarioQueEnviaMensagem === nome) {
      classeMensagem = 'message-me private-message'
    }


    chat.innerHTML += `<div data-test='message' class='${tipoDaMensagemDeMensagem} ${classeMensagem}'> 
    (${hora}) <strong>${nomeDoUsuarioQueEnviaMensagem}</strong> para ${nomeDoUsuarioQueRecebeMensagem}: ${texto}</div>`
  }
  chat.querySelector('div:last-child').scrollIntoView()
}

//tratamento de erros
function deuErro(error) {
  console.log('deu erro')
  console.log(error)
  alert('Erro!')
//verifica se o nome que o usuario digitou já esta em uso
  if (error.response.status === 400) {
    alert('Usuário já existente. Digite outro nome!')
  }
//recarrega a pagina
  window.location.reload()
}

//pega as mensagens da api
function buscaMensagemNoServidor() {
  axios.get(url_messages)
    .then(resposta)
    .catch(deuErro)
}

//envia a msg escrita
function enviarMensagem() {
  const input = document.getElementById('msg')
  const msg = { from: nome, to: 'Todos', text: input.value, type: "message" }
  const promise = axios.post(url_messages, msg)
  promise.then(buscaMensagemNoServidor)
  promise.catch(deuErro)
  input.value = '' // limpar input após enviar msg
}

//verifica se esta mantendo conexão a cada 5 segundos 
function usuarioLivreParaAcesso() {
  buscaMensagemNoServidor()
  setInterval(function () {
    buscaMensagemNoServidor()
  }, 3000)
  setInterval(manterConexao, 5000)
}

