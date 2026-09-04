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


// CMT_feat(voice):_Build_proces

function processSaarthiQuery(text) {
  const t = text.toLowerCase().trim();
  console.log('Saarthi heard:', t);

  // Navigation intents
  if (/(game|play|puzzle|exercise)/.test(t))   return saarthiNavigate('game-menu-screen', 'Opening games for you!');
  if (/(routine|schedule|morning|daily)/.test(t)) return saarthiNavigate('routine-screen', 'Opening your daily routine!');
  if (/(progress|score|result|report)/.test(t)) return saarthiNavigate('progress-screen', 'Showing your progress!');
  if (/(family|photo|face|remember)/.test(t))  return saarthiNavigate('family-screen', 'Opening family therapy!');
  if (/(home|main|back|start)/.test(t))        return saarthiNavigate('home-screen', 'Taking you home!');

  // Emergency
  if (/(sos|emergency|help me|call family)/.test(t)) return triggerSOS();

  // Repeat
  if (/(repeat|again|once more)/.test(t)) return saarthiSpeak(lastSaarthiMessage);

  // Default fallback
  saarthiSpeak("I am sorry, I did not understand. You can say: open games, show progress, or open routine.");
}

function saarthiNavigate(screen, message) {
  saarthiSpeak(message);
  setTimeout(() => showScreen(screen), 800);
}

let lastSaarthiMessage = '';
function saarthiSpeak(msg) {
  lastSaarthiMessage = msg;
  const utt = new SpeechSynthesisUtterance(msg);
  utt.rate = 0.85; utt.lang = 'en-IN';
  window.speechSynthesis.speak(utt);
  showVoiceFeedbackText(msg);
}


// CMT_feat(voice):_Build_openSa

function openSaarthiVoiceModal() {
  if (!saarthiRecognizer) { showSaarthiTextFallback(); return; }
  const modal = document.getElementById('saarthi-voice-modal');
  const btn   = document.getElementById('saarthi-ai-mic-btn');
  if (modal) modal.classList.add('active');
  if (btn)   btn.classList.add('listening');
  showVoiceFeedbackText('Listening... speak now');
  voiceActive = true;
  try {
    saarthiRecognizer.start();
  } catch (e) {
    voiceActive = false;
    showSaarthiTextFallback();
  }
}

function closeMicUI() {
  document.getElementById('saarthi-voice-modal')?.classList.remove('active');
  document.getElementById('saarthi-ai-mic-btn')?.classList.remove('listening');
  showVoiceFeedbackText('');
}

function showVoiceFeedbackText(msg) {
  const el = document.getElementById('saarthi-voice-feedback');
  if (el) el.textContent = msg;
}


// CMT_feat(voice):_Handle_no-sp

function handleVoiceError(e) {
  voiceActive = false;
  closeMicUI();
  if (e.error === 'no-speech' || e.error === 'audio-capture' || e.error === 'not-allowed') {
    showSaarthiTextFallback();
  } else {
    saarthiSpeak('Something went wrong with the microphone. Please try typing instead.');
  }
}

function showSaarthiTextFallback() {
  const fallback = document.getElementById('saarthi-text-fallback');
  if (!fallback) return;
  fallback.style.display = 'flex';
  const input = fallback.querySelector('input');
  const btn   = fallback.querySelector('button');
  if (input) input.focus();
  if (btn) btn.onclick = () => {
    if (input?.value.trim()) {
      processSaarthiQuery(input.value.trim());
      fallback.style.display = 'none';
      input.value = '';
    }
  };
}

