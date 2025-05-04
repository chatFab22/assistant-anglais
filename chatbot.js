let lastPhrase = "";

document.getElementById("userInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    let input = this.value.trim().toLowerCase();
    if (!input) return;
    showMessage(input, "user");
    respond(input);
    this.value = "";
  }
});

function showMessage(msg, type) {
  let div = document.createElement("div");
  div.className = "message " + type;
  div.textContent = msg;
  document.getElementById("chat").appendChild(div);
  lastPhrase = msg;
}

function respond(input) {
  let response = "Je ne comprends pas. Essaie : vocabulaire, dialogue, grammaire ou quiz.";
  if (input.includes("vocab")) response = "Mot du jour : 'Tree' = Arbre.";
  else if (input.includes("dialogue")) response = "Let's practice: 'Hello! What’s your name?'";
  else if (input.includes("grammaire")) response = "'I am', 'You are', 'He is' : verbes être.";
  else if (input.includes("quiz")) response = "Devine : 'Dog' signifie… ?";
  speak(response);
  showMessage(response, "bot");
}

function speak(text) {
  if ('speechSynthesis' in window) {
    let utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
  }
}

function repeatLast() {
  speak(lastPhrase);
}

function startListening() {
  if (!('webkitSpeechRecognition' in window)) return alert("Pas compatible.");
  let rec = new webkitSpeechRecognition();
  rec.lang = "fr-FR";
  rec.start();
  rec.onresult = function(event) {
    document.getElementById("userInput").value = event.results[0][0].transcript;
    document.getElementById("userInput").dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
  };
}