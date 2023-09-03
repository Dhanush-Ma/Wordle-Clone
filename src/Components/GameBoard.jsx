import { useCallback, useEffect, useState, useRef } from "react";
import Row from "./Row";
import Confetti from "./Confetti";
import words from "../assets/words";
import IncorrectWordModal from "./IncorrectWordModal";

const GameBoard = ({ WORD }) => {
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(
    Array(6).fill([0, 0, 0, 0, 0])
  );
  const [gameOver, setGameOver] = useState(null);
  const [incorrectWord, setIncorrectWord] = useState(false);
  const guessesRef = useRef(guesses);
  const rowRef = useRef(currentRow);

  const checkForAnswer = (word, guess) => {
    word = word.toLowerCase();
    guess = guess.toLowerCase();

    const answer = [];
    let flag = true;
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) === guess.charAt(i)) {
        answer[i] = 3;
      } else if (word.includes(guess.charAt(i))) {
        answer[i] = 2;
        flag = false;
      } else {
        answer[i] = 1;
        flag = false;
      }
    }
    return { answer, flag };
  };

  const handleKeyStroke = useCallback(
    (e) => {
      const { key, keyCode } = e;

      if (
        (keyCode >= 65 && keyCode <= 90) ||
        (keyCode >= 97 && keyCode <= 122)
      ) {
        setGuesses((prev) => {
          if (prev[currentRow].length < 5) {
            const newGuesses = [...prev];
            newGuesses[currentRow] += key;
            return newGuesses;
          }
          return prev;
        });
      } else if (key === "Enter") {
        let guess = guessesRef.current[currentRow];
        const len = guess.length;
        if (len === 5) {
          if (!words.includes(guess.toLowerCase())) {
            setIncorrectWord(true);
            return;
          }
          const { answer, flag } = checkForAnswer(WORD, guess);
          setAnswerIndex((prev) => {
            const newAnswerIndex = [...prev];
            newAnswerIndex[currentRow] = answer;
            return newAnswerIndex;
          });
          setCurrentRow((prev) => prev + 1);

          if (flag) setGameOver("won");
          if (!flag && rowRef.current >= 5) setGameOver("lost");
        }
      } else if (key === "Backspace") {
        let guess = guessesRef.current[currentRow];
        const len = guess.length;
        if (len > 0) {
          setGuesses((prev) => {
            const newGuesses = [...prev];
            newGuesses[currentRow] = newGuesses[currentRow].slice(0, -1);
            return newGuesses;
            return prev;
          });
        }
      }
    },
    [currentRow, answerIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyStroke);
    guessesRef.current = guesses;
    rowRef.current = currentRow;

    if (gameOver) {
      console.log("game over");
      window.removeEventListener("keydown", handleKeyStroke);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyStroke);
    };
  }, [guesses, handleKeyStroke, currentRow, answerIndex]);

  return (
    <div className="gameboard">
      {guesses.map((guess, idx) => (
        <Row key={idx} guess={guess} answerIndex={answerIndex[idx]} />
      ))}
      {gameOver == "won" ? (
        <>
          <Confetti />
          <div className="winning_text">
            <p>You won! {currentRow} / 6 </p>
          </div>
        </>
      ) : gameOver == "lost" ? (
        <div className="losing_text">
          <p>
            The word is <span>{WORD.toUpperCase()}</span>
          </p>
        </div>
      ) : (
        ""
      )}
      {incorrectWord && (
        <IncorrectWordModal setIncorrectWord={setIncorrectWord} />
      )}
    </div>
  );
};

export default GameBoard;
