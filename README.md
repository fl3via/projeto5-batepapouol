# **Bate-Papo UOL**

## **Visão Geral**
***Bate-Papo UOL*** é um bate-papo totalmente funcional, inspirado no saudoso Bate-Papo UOL com uma interface totalmete diferente. 

### **Principais Funcionalidades**
`Chat`
- Ao entrar na sala, é carregado as mensagens do servidor e exibidas.
- A cada três segundos o site recarrega as mensagens do servidor para manter sempre atualizado.

`Entrada na Sala`
- Ao entrar no site, o usuário é perguntado com um prompt seu nome.
- Após inserção do nome, ele é enviado para o servidor pra cadastrar o usuário:
    - Quando o servido responde com sucesso, o usuário pode entrar na sala;
    - Caso o servidor responda com erro, é pedido para o usuário digitar outro nome, pois este já está em uso;
- Enquanto o usuário estiver na sala, a cada 5 segundos o site avisa ao servidor que o usuário ainda está presente, ou senão será considerado que "Saiu da sala".

`Envio de mensagem`
- Ao enviar uma mensagem, esta é enviada para o servidor:
    - Caso o servidor responda com sucesso, você deve obter novamente as mensagens do servidor e atualizar o chat;
    - Caso o servidor responda com erro, significa que esse usuário não está mais na sala e a página deve ser atualizada (e com isso voltando pra etapa de pedir o nome).
-  Nesse envio, deve ser informado o remetente, o destinatário e se a mensagem é reservada ou não.
    
### **Deploy**
***Link:*** https://projeto5-batepapouol-alpha.vercel.app/

### **Tecnologias Utilizadas no Desenvolvimento**
- JavaScript;
- HTML5;
- CSS3;
- Axios;
- Git/GitHub.

### **Como Executar o Projeto Localmente**

### No Terminal 
1. **Clone o Repositório:** `git clone` https://github.com/fl3via/projeto5-batepapouol
2. **Entre na pasta:** `cd` projeto5-batepapouol
3. **Abra no Visual Estudio Code:** `code .`

### No Visual Estudio Code
4. Clique com o botão direito do mouse em `index.html`
5. Clique em `Open with Live Server [Alt+LAlt+O]`
