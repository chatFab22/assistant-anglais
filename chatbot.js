
const input = document.getElementById('userInput');
const chat = document.getElementById('chat');

let lastSpoken = "";
let selectedVoice = null;
let quizMode = false;
let quizAnswer = "";

const quizData = [
  { question: "What is the English word for 'chien'?", answer: "dog" },
  { question: "How do you say 'maison' in English?", answer: "house" },
  { question: "Translate 'chat' into English.", answer: "cat" },
  { question: "What is the English word for 'voiture'?", answer: "car" },
  { question: "How do you say 'pomme' in English?", answer: "apple" }
];

input.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const userText = input.value.trim();
    if (userText !== '') {
      addMessage(userText, 'user');
      handleInput(userText.toLowerCase());
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

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  if (!selectedVoice) {
    const voices = speechSynthesis.getVoices();
    selectedVoice = voices.find(voice =>
      voice.lang === 'en-US' && voice.name.toLowerCase().includes('female')
    ) || voices.find(v => v.lang === 'en-US');
  }
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  speechSynthesis.speak(utterance);
  lastSpoken = text;
}

function repeatLast() {
  if (lastSpoken) {
    speak(lastSpoken);
  }
}

function handleInput(input) {
  if (quizMode) {
    if (input.includes(quizAnswer.toLowerCase())) {
      const response = "Correct! Great job, Fabrice!";
      addMessage(response, 'bot');
      speak(response);
    } else {
      const response = "Not quite. The correct answer was: " + quizAnswer;
      addMessage(response, 'bot');
      speak(response);
    }
    quizMode = false;
    return;
  }

  respond(input);
}

function respond(input) {
  let response = "";

  input = input.replace("m’y", "my").replace("mon nom est", "my name is");

  if (input.includes("vocab")) {
    response = "Here are five useful words: Hello, My name is, I am from, Nice to meet you, How are you?";
  } else if (input.includes("dialogue")) {
    response = "Let's practice together. Repeat after me: Hello! My name is Alex. What’s your name?";
  } else if (input.includes("grammaire") || input.includes("grammar")) {
    response = "Let's learn the verb to be: I am, You are, He or She is. For example: I am French.";
  } else if (input.includes("quiz") || input.includes("jeu")) {
    const randomQuiz = quizData[Math.floor(Math.random() * quizData.length)];
    response = randomQuiz.question;
    quizAnswer = randomQuiz.answer;
    quizMode = true;
  } else if (input.includes("my name is")) {
    const name = input.split("my name is")[1].trim();
    response = "Nice to meet you, " + name.charAt(0).toUpperCase() + name.slice(1) + "!";
  } else {
    response = "Sorry Fabrice, I didn’t understand. Try Vocabulary, Dialogue, Grammar or Quiz.";
  }

  addMessage(response, 'bot');
  speak(response);
}

function startListening() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    addMessage(transcript, 'user');
    handleInput(transcript.toLowerCase());
  };
  recognition.start();
}

speechSynthesis.onvoiceschanged = () => {
  const voices = speechSynthesis.getVoices();
  selectedVoice = voices.find(voice =>
    voice.lang === 'en-US' && voice.name.toLowerCase().includes('female')
  ) || voices.find(v => v.lang === 'en-US');
};
