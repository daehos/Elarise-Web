import axios from "axios";

const API_URL = 'https://backend-hq3lexjwcq-et.a.run.app/api';


export default async function postGrammarChatroom(token, chatRoomId, messageText) {
    try {
        const response = await axios.post(`${API_URL}/chatroom/${chatRoomId}/grammar`,
            { messageText: messageText },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Message sent:", response.data);
        return response.data;
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