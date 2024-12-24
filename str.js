const btn = document.querySelector("#btn");
const content = document.querySelector("#content");

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    //  The SpeechSynthesisUtterance interface of the Web Speech API represents a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.) 
    utterance.rate = 1;
    utterance.pitch = 0;
    utterance.volume = 1;
    utterance.lang = "en-US";

    utterance.onend = () => {
        console.log("Speech finished!");
    };
    utterance.onerror = (e) => {
        console.error("Speech synthesis error:", e);
    };

    window.speechSynthesis.speak(utterance);
}

function wishMe() {
    const day = new Date();
    const hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good Morning SIR!I am MAARK. What can I do for you?");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon SIR!I am MAARK. What can I do for you?");
    } else if (hours >= 16 && hours < 19) {
        speak("Good Evening SIR!I am MAARK. What can I do for you?");
    } else {
        speak("Good Night SIR! I am MAARK. What can I do for you?");
    }
}

function startRecognition() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';

        recognition.onresult = (e) => {
            const spokenText = e.results[0][0].transcript;
            handleCommands(spokenText);
        };

        recognition.onerror = (e) => {
            console.error("Speech recognition error:", e);
            speak("Sorry, I didn't catch that. Please try again.");
        };

        recognition.start();
    } else {
        alert("Your browser does not support voice input.");
    }
}

function handleCommands(command) {
    command = command.toLowerCase().trim();
    console.log(command);

    if (command.includes("hello") || command.includes("hi") || command.includes("hi")) {
        speak("Hello! How can I assist you?");
    } else if (command.includes("who are you") || command.includes("developed")) {
        speak("I am Mark ! A virtual assistant, created to help you with your basic problem.");
    } else if (command.includes("open youtube")) {
        speak("Opening YouTube.");
        window.open("https://www.youtube.com");
    } else if (command.includes("open google")) {
        speak("Opening Google.");
        window.open("https://www.google.com");
    } else if (command.includes("what time is it") || command.includes("current time")) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        speak(`The current time is ${time}.`);
    } else if (command.includes("weather")) {
        getWeather();
    } else if (command.includes("tell me a joke")) {
        getJoke();
    } else if (command.includes("quote")) {
        getQuote();
    } else if (command.includes("calculate")) {
        calculate(command);
    } else {
        speak("Sorry, I didn't understand that.");
    }
}

// Function to fetch weather information
function getWeather() {
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric')
        .then(response => response.json())
        .then(data => {
            const weather = `The current temperature in ${data.name} is ${data.main.temp} degrees Celsius with ${data.weather[0].description}.`;
            speak(weather);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            speak("Sorry, I couldn't get the weather information.");
        });
}

// Function to fetch a random joke
function getJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            const joke = `${data.setup} ... ${data.punchline}`;
            speak(joke);
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            speak("Sorry, I couldn't get a joke for you.");
        });
}

// Function to fetch a random quote
function getQuote() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            const quote = `${data.content} — ${data.author}`;
            speak(quote);
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
            speak("Sorry, I couldn't get a quote for you.");
        });
}

// Function to perform simple calculations
function calculate(command) {
    const expression = command.replace('calculate', '').trim();
    try {
        const result = eval(expression);
        speak(`The result is ${result}.`);
    } catch (error) {
        console.error('Error performing calculation:', error);
        speak("Sorry, I couldn't perform the calculation.");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    btn.addEventListener('click', startRecognition);
    wishMe();
});
