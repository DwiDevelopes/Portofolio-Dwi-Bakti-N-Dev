const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// API configuration
const API_KEY = "AIzaSyCC9DImXNPKNo6_b3zGHhjjX_8JTUsjT4U"; // Your API key here
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
}

let voicesLoaded = false;

window.speechSynthesis.onvoiceschanged = () => {
  voicesLoaded = true;
  console.log("Voices loaded:", window.speechSynthesis.getVoices());
};

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const speakResponse = (message, lang) => {
  const synth = window.speechSynthesis;

  // Wait until voices are loaded
  if (!voicesLoaded) {
    console.log("Waiting for voices to load...");
    setTimeout(() => speakResponse(message, lang), 100);
    return;
  }

  // Clear previous utterances if any
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = lang;

  // Set voice based on device type
  const voices = synth.getVoices();
  let voice = null;

  if (isMobileDevice()) {
    // Use male voice for mobile devices
    voice = voices.find(voice => voice.lang === lang && voice.name.includes("Male"));
  } else {
    // Use female voice for PC
    voice = voices.find(voice => voice.lang === lang && voice.name.includes("Female"));
  }

  if (voice) {
    utterance.voice = voice;
  }

  // Adjust pitch and rate to match the desired voice characteristics
  utterance.pitch = isMobileDevice() ? 1.0 : 1.2; // Lower pitch for male voice
  utterance.rate = isMobileDevice() ? 1.0 : 1.1;  // Normal speed for male voice

  // Speak the message
  synth.speak(utterance);
}

const generateResponse = async (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  // Define the properties and message for the API request
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      contents: [{ 
        role: "user", 
        parts: [{ text: userMessage }] 
      }] 
    }),
  };

  // Send POST request to API, get response and set the response as paragraph text
  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    // Get the API response text and update the message element
    const responseMessage = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
    messageElement.textContent = responseMessage;
    
    // Speak the response in Indonesian
    speakResponse(responseMessage, 'id-ID');
  } catch (error) {
    // Handle error
    messageElement.classList.add("error");
    messageElement.textContent = error.message;
    speakResponse("Maaf, terjadi kesalahan.", 'id-ID'); // Speak error in Indonesian
  } finally {
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }
}

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming"); // Perbaiki di sini
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
}

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window 
  // width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Cek state chatbot dari localStorage
  if (localStorage.getItem('chatbotState') === 'open') {
    document.body.classList.add('show-chatbot');
  } else {
    document.body.classList.remove('show-chatbot');
  }

  // Simpan state chatbot ke localStorage saat toggler diklik
  document.querySelector('.chatbot-toggler').addEventListener('click', function() {
    if (document.body.classList.contains('show-chatbot')) {
      localStorage.setItem('chatbotState', 'open');
    } else {
      localStorage.setItem('chatbotState', 'closed');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Reset state chatbot saat halaman dimuat
  document.body.classList.remove('show-chatbot');
});

document.addEventListener('DOMContentLoaded', function() {
  // Hapus class no-animation setelah halaman dimuat
  setTimeout(function() {
    document.body.classList.remove('no-animation');
  }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
  // Tampilkan chatbot setelah halaman dimuat
  setTimeout(function() {
    document.querySelector('.chatbot').style.display = 'block';
  }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
  // Reset transform saat halaman dimuat
  document.querySelector('.chatbot').style.transform = 'scale(0.5)';
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));