import { KeyboardEvent, useState } from "react";
import { Answer } from "./answer";

type AggFunc = (a: number, b: number) => number;
interface Props {
  a: number;
  b: number;
  operation: AggFunc;
  operation_str: string;
  setAnswer: React.Dispatch<React.SetStateAction<Answer>>;
  answer: Answer;
}

function Checker({ a, b, operation, operation_str, setAnswer, answer }: Props) {
  const [guess, setGuess] = useState("");
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const checkResult = () => {
    const expr =
      a.toString() + " " + operation_str + " " + b.toString() + " = " + guess;
    const status: boolean = operation(a, b) === parseInt(guess);
    const anw = operation(a, b);
    setGuess("");
    setAnswer((prev: Answer) => {
      if (status) {
        return {
          correct: prev.correct + 1,
          nonCorrect: prev.nonCorrect,
          history: [
            { content: expr, status: status, correct: anw },
            ...prev.history,
          ],
        };
      } else {
        return {
          correct: prev.correct,
          nonCorrect: prev.nonCorrect + 1,
          history: [
            { content: expr, status: status, correct: anw },
            ...prev.history,
          ],
        };
      }
    });
  };

  const onClickHandler = () => {
    checkResult();
  };

  const onEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkResult();
    }
  };

  return (
    <>
      <input
        style={{ margin: "5px" }}
        type="number"
        onChange={onChangeHandler}
        value={guess}
        onKeyUp={onEnterClick}
      ></input>
      <button className="btn btn-outline-dark" onClick={onClickHandler}>
        Проверить
      </button>
      <ul className="list-group">
        {answer.history.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.content}{" "}
            {item.status ? "✅" : "❌ правильный ответ " + item.correct}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Checker;
