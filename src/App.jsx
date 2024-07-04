import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TalkPage from "./pages/TalkPage";
import BaseChatScreen from "./Components/chatbot/BaseChatScreen";
import authService from "./Service/authService";
import ChatPage from "./pages/ChatPage";
import PasswordPage from "./pages/Password";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/talk" element={<TalkPage />} />
          <Route path="/password" element={<PasswordPage/>}/>
          {/* <Route path="/grammar" element={<ChatPage />} /> */}
          {/* <Route path="/grammar/:chatRoomId" element={<ChatPage />} /> */}
          {["/grammar", "/grammar/:chatRoomId"].map((path, index) => (
            <Route path={path} element={<ChatPage />} key={index} />
          ))}
          {/* <Route path="/chat" element={<BaseChatScreen />} /> */}
          <Route path="/talk/:chatRoomId" element={<TalkPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
