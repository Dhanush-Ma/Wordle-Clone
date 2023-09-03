import { useEffect, useState } from "react";
import GameBoard from "./Components/GameBoard";
import words from "./assets/words";

function App() {
  const [word, setWord] = useState(null);

  useEffect(() => {
    const random = Math.floor(Math.random() * words.length);
    setWord(words[random]);
  }, []);

  return (
    <>
      {word && (
        <div className="main_container">
          <h1>Wordle</h1>
          <GameBoard WORD={word} />
        </div>
      )}
    </>
  );
}

export default App;
