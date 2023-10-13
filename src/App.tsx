import { useState } from "react";
import "./App.css";
import Calc from "./components/formula";

function App() {
  const [gameNumber, setGameNumber] = useState(0);

  const startGameHandler = () => {
    setGameNumber((prev) => prev + 1);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <Calc
            key={gameNumber}
            numberOfRounds={10}
            gameNumber={gameNumber}
            startGameHandler={startGameHandler}
          ></Calc>
        </div>
      </div>
    </>
  );
}

export default App;
