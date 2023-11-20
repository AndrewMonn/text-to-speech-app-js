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

// Evento de Speech cuando se clickea el boton

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

      // Funcionalidad para continuar la reproduccion del Speech pausado y modificacion del texto del boton a "Pausar"

      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pausar";
      }

      // Funcionalidad para pausar la reproduccion del Speech y modificacion del texto del boton a "Continuar"

      else if (!isSpeaking && !synth.pause()) {
        synth.pause();
        isSpeaking = true;
        speechBtn.innerText = "Continuar";
      }

      // Estado normal del texto en el boton "Escuchar"

    } else {
      speechBtn.innerText = "Escuchar";
    }
  }
});

// Funcion para cancelar el Speech cuando se modifica el contenido del textarea

textarea.addEventListener("input", (e) => {
  if (textarea.value.length !== 0)  {
    synth.cancel();
    speechBtn.innerText = "Escuchar";
  }
  else {
    synth.cancel();
    speechBtn.innerText = "Escuchar";
  }
});

// Funcionalidad para cancelar el Speech cuando se cambia la voz en el select

voiceList.addEventListener("change", (e) => {
      synth.cancel();
      speechBtn.innerText = "Escuchar";
});