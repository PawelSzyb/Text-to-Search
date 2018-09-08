const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  voices.forEach(voice => {
    const option = document.createElement("option");

    option.innerHTML = voice.name + `(${voice.lang})`;

    option["data-lang"] = voice.lang;
    option["data-name"] = voice.name;

    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

const speak = () => {
  if (synth.speaking) {
    console.error("Already Speaking");
    return;
  }
  if (textInput.value !== "") {
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // Speak end
    speakText.onend = e => {
      console.log("Done...");
    };

    //Speak err
    speakText.onerror = e => {
      console.error("Somehting went wrong!");
    };

    //Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAtrribute(
      "data.name"
    );

    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });
    speakText.rate = rate.value;
    speakText.rate = rate.value;
    //Speak
    synth.speak = speakText;
  }
};
