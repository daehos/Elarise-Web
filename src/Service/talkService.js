import axios from "axios";

const API_URL = 'https://elarise-api-mqvmjbdy5a-et.a.run.app/api';


// Initialize OpenAI API client with the provided API key
const secretKey = "xxxx";


// Default voice setting for text-to-speech
const inputVoice = "nova"; // https://platform.openai.com/docs/guides/text-to-speech/voice-options
const inputModel = "tts-1"; // https://platform.openai.com/docs/guides/text-to-speech/audio-quality


async function postVoiceChatroom(token, chatRoomId, messageText, setAudioUrl) {
    try {
        const response = await axios.post(`${API_URL}/chatroom/${chatRoomId}/talk-freely`,
            { messageText: messageText },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const responseData = response.data;
        const aiMessage = responseData.message;
        await fetchAndPlayAudio(aiMessage, setAudioUrl);
        return responseData;
    } catch (error) {
        console.error("There was an error sending the message!", error);
        if (error.response) {
            console.error("Error data:", error.response.data);
            console.error("Error status:", error.response.status);
            console.error("Error headers:", error.response.headers);
        }
        throw error;
    }
}

async function fetchAndPlayAudio(
    inputText,
    setAudioUrl,
    model = inputModel,
    voice = inputVoice
) {
    try {
        const url = "https://api.openai.com/v1/audio/speech";
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${secretKey}`,
        };

        const data = {
            model: model,
            input: inputText,
            voice: voice,
            response_format: 'mp3',
        };

        const response = await axios.post(url, data, {
            headers: headers,
            responseType: "arraybuffer",
        });

        if (response.status === 200) {
            const audioData = new Uint8Array(response.data);
            const audioUrl = URL.createObjectURL(new Blob([audioData], { type: 'audio/mpeg' }));
            // ensure the audio is fully loaded before playing
            setAudioUrl(audioUrl);
            const audio = new Audio(audioUrl);
            audio.addEventListener('canplaythrough', () => {
                audio.play();
            });
            return audioUrl;
        } else {
            console.error('Failed to fetch speech audio:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Error fetching speech audio:', error);
        return null;
    }
}

export default {
    postVoiceChatroom,
    fetchAndPlayAudio
}

