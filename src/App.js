import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Button from "./components/Button";

function App() {
  const [screen, setScreen] = useState("landing");

  return (
    <div className="app">
      <Header />

      {screen === "landing" && (
        <>
          <Hero />
          <Button
            text="Start Interview"
            onClick={() => setScreen("intro")}
          />
        </>
      )}

      {screen === "intro" && (
        <div>
          <h2>Interview Instructions</h2>
          <p>You will answer 5 questions. Each question has a time limit.</p>
          <Button
            text="Begin Interview"
            onClick={() => alert("Interview starts tomorrow")}
          />
        </div>
      )}
    </div>
  );
}

export default App;