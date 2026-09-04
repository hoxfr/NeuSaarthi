// NeoSaarthi

// CMT_docs(voice):_Design_Saart
// ===== Saarthi Voice AI — NeoSaarthi Companion =====
// Browser-native Web Speech Recognition API (no external API keys)
// Supports en-IN, en-US, hi-IN dialects
// Intent taxonomy: NAVIGATE | QUERY | REPEAT | HELP | EMERGENCY

const VOICE_VERSION = '1.0';
const SUPPORTED_LANGS = ['en-IN', 'en-US', 'hi-IN'];
const VOICE_INTENTS = {
  NAVIGATE: ['go to', 'open', 'show', 'take me to', 'start'],
  QUERY:    ['what is', 'how', 'tell me', 'explain'],
  REPEAT:   ['repeat', 'say again', 'once more'],
  HELP:     ['help', 'confused', 'lost'],
  EMERGENCY:['help me', 'call family', 'emergency', 'sos']
};


// CMT_feat(voice):_Initialize_S

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let saarthiRecognizer = null, voiceActive = false;

function initSaarthiVoice() {
  if (!SpeechRecognition) {
    console.warn('Saarthi Voice: Web Speech API not supported in this browser.');
    document.getElementById('saarthi-ai-mic-btn')?.setAttribute('disabled', true);
    return;
  }
  saarthiRecognizer = new SpeechRecognition();
  saarthiRecognizer.lang = 'en-IN';
  saarthiRecognizer.continuous = false;
  saarthiRecognizer.interimResults = false;
  saarthiRecognizer.maxAlternatives = 3;
  saarthiRecognizer.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    processSaarthiQuery(transcript);
  };
  saarthiRecognizer.onspeechend = () => saarthiRecognizer.stop();
  saarthiRecognizer.onerror = handleVoiceError;
  saarthiRecognizer.onend = () => { voiceActive = false; closeMicUI(); };
}
document.addEventListener('DOMContentLoaded', initSaarthiVoice);

