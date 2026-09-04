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

