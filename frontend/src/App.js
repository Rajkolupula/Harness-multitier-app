import React, { useEffect, useState } from "react";

function App() {
  const [backendMsg, setBackendMsg] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setBackendMsg(data.message))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div>
      <h1>Hello from Frontend</h1>
      <p>This is a basic React app served with Nginx.</p>
      <p><strong>Backend says:</strong> {backendMsg}</p>
    </div>
  );
}

export default App;
