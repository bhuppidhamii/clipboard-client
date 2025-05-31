import { useEffect, useState } from "react";
import { connect, io } from "socket.io-client";

// Replace this with your backend URL
const socket = io("http://localhost:3000");
// it is creating a connection 

function App() {
  const [content, setContent] = useState("");

  useEffect(() => {
    const clipId = "test123"; // Later we'll make this dynamic
    socket.emit("join_clipboard", clipId); // -  user is the joing the room 
    // This sends a message to the server saying:
    // “Hey server, I want to join the room called test123.” 👆

    // When other user types
    socket.on("clipboard_update", (data) => {
      setContent(data);
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    
    setContent(newText);
    // console.log("emmiting", newText);
    // it is sending updated data to the server 
    // As the user types, the new value is emitted to the backend.
    // •	We send both the clipboard ID and the new content.
    socket.emit("clipboard_update", {
      clipId: "test123",
      content: newText,
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1>Real-Time Clipboard</h1>
      <textarea
        className="w-full h-96 p-2 border"
        value={content}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
