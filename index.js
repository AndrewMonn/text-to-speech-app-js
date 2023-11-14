const d = document,
  textarea = d.querySelector("textarea"),
  voiceList = d.querySelector("select"),
  speechBtn = d.querySelector("button");
let synth = window.speechSynthesis,
  isSpeaking = true;

function voices() {
  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google US English" ? "selected" : "";

    let options = `<option value="${voice.name}" ${selected}> ${voice.name} (${voice.lang})</option>`;

    voiceList.insertAdjacentHTML("beforeend", options);
  }
}

voices();

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);

  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utterance.voice = voice;
    }
  }
  synth.speak(utterance);
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (textarea.value !== "") {
    if (!synth.speaking) {
      textToSpeech(textarea.value);
    }

    if (textarea.value.length > 0) {
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerText = "Escuchar";
        } else {
        }
      }, 500);

      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pausar";
      } else {
        synth.pause();
        isSpeaking = true;
        speechBtn.innerText = "Continuar";
      }
    } else {
      speechBtn.innerText = "Escuchar";
    }
  }
});

textarea.addEventListener("input", (e) => {
  if (textarea.value.length !== 0) {
    synth.cancel();
    speechBtn.innerText = "Escuchar";
  }
});
