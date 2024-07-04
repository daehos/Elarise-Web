import { useEffect, useRef, useState } from 'react';

const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recgonitionRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Web speech api is not supported.');
      return;
    }

    recgonitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recgonitionRef.current;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.continuous = true;

    if ('webkitSpeechGrammarList' in window) {
      const grammar =
        '#JSGF V1.0; grammar punctuation; public <punc> = |,|?|||;|:;';
      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    recognition.onresult = (event) => {
      let text = '';
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);

    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript('');
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recgonitionRef.current && !isListening) {
      recgonitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recgonitionRef.current && isListening) {
      recgonitionRef.current.stop();
      setIsListening(false);
      clearTimeout(timerRef.current);
    }
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
  };
};

export default useSpeechToText;
