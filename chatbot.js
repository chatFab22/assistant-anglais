const input = document.getElementById('userInput');
const chat = document.getElementById('chat');

input.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const userText = input.value;
    addMessage(userText, 'user');
    respond(userText.toLowerCase());
    input.value = '';
  }
});

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = 'message ' + sender;
  div.innerHTML = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function respond(text) {
  let response = "";

  if (text.includes('vocabulaire')) {
    response = `
    Voici 5 mots utiles :
    <br>- Hello = Bonjour
    <br>- My name is... = Je m'appelle...
    <br>- I am from... = Je viens de...
    <br>- Nice to meet you = Enchanté(e)
    <br>- How are you? = Comment vas-tu ?
    `;
  } else if (text.includes('dialogue')) {
    response = `Répétons ensemble :<br>"Hello! My name is Alex. What’s your name?"`;
  } else if (text.includes('grammaire')) {
    response = `Commençons avec le verbe "to be" :<br>- I am<br>- You are<br>- He/She is<br>Exemple : "I am French"`;
  } else if (text.includes('surprends')) {
    response = `OK ! Devine ce mot : "Cat" signifie… ?`;
  } else {
    response = `Désolé, je n'ai pas compris. Choisis : "Vocabulaire", "Dialogue", "Grammaire" ou "Surprends-moi".`;
  }

  addMessage(response, 'bot');
}
