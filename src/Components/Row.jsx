import React, { useEffect } from "react";

const Row = ({ guess, answerIndex }) => {

  return (
    <div className="single_row">
      {[1, 2, 3, 4, 5].map((_, idx) => {
        const cName =
          answerIndex[idx] == 1
            ? "tile_incorrect"
            : answerIndex[idx] == 2
            ? "tile_incorrect_position"
            : answerIndex[idx] == 3
            ? "tile_correct"
            : "";

        return (
          <div key={idx} className={`tile ${cName}`}>
            {guess.charAt(idx)}
          </div>
        );
      })}
    </div>
  );
};

export default Row;
