import "react";

export let BOARD_DIMENSION = 9;

export function Square({even_or_odd }) {
  return <span className={`square--${even_or_odd}`}></span>;
}

function ShogiBoard() {
  return (
    <div id="shogi_game_board">
      {(function () {
        let a = [],
          DIMENSION = BOARD_DIMENSION;
        for (let i = 0; i < DIMENSION; i++) {
          for (let j = 0; j < DIMENSION; j++) {
            a.push(
              <Square
		key={(i * DIMENSION + j)}
                even_or_odd={(i * DIMENSION + j) % 2 == 0 ? "even" : "odd"}
              />,
            );
          }
        }
	return a;
      })()}
    </div>
  );
}

export default ShogiBoard;
