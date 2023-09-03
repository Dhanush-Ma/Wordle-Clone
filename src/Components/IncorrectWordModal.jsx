import React, { useEffect } from "react";

const IncorrectWordModal = ({ setIncorrectWord }) => {
  useEffect(() => {
    setTimeout(() => {
      setIncorrectWord(false);
    }, [2000]);
  }, []);

  return (
    <div className="incorrect_word">
      <p>Word is not in the list!</p>
    </div>
  );
};

export default IncorrectWordModal;
