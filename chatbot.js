const input = document.getElementById('userInput');
const chat = document.getElementById('chat');

input.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const userText = input.value.trim();
    if (userText !== '') {
      addMessage(userText, 'user');
      respond(userText.toLowerCase());
      input.value = '';
    }
  }
});

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = 'message ' + sender;
  div.innerHTML = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function respond(input) {
  let response = "";

  // Correction simple de fautes
  input = input.replace("m’y", "my").replace("mon nom est", "my name is");

  if (input.includes("vocab") || input.includes("mot")) {
    response = `
      Voici 5 mots utiles :
      <br>- Hello = Bonjour
      <br>- My name is... = Je m'appelle...
      <br>- I am from... = Je viens de...
      <br>- Nice to meet you = Enchanté(e)
      <br>- How are you? = Comment vas-tu ?
    `;
  } else if (input.includes("dialogue") || input.includes("parler") || input.includes("conversation")) {
    response = `Répétons ensemble :<br>"Hello! My name is Alex. What’s your name?"`;
  } else if (input.includes("grammaire") || input.includes("verbe")) {
    response = `Commençons avec le verbe "to be" :<br>- I am<br>- You are<br>- He/She is<br>Exemple : "I am French"`;
  } else if (input.includes("surprends") || input.includes("devine")) {
    response = `OK Fabrice ! Devine ce mot : "Cat" signifie… ?`;
  } else if (input.includes("my name is")) {
    const name = input.split("my name is")[1].trim();
    response = `Nice to meet you, ${name.charAt(0).toUpperCase() + name.slice(1)}!`;
  } else {
    response = `Désolé Fabrice, je n'ai pas compris. Essaie "Vocabulaire", "Dialogue", "Grammaire" ou "Surprends-moi".`;
  }

  addMessage(response, 'bot');
}
