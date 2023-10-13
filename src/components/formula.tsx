import { useState } from "react";
import { Answer, Equation } from "./answer";
import Checker from "./checker";

interface Props {
  numberOfRounds: number;
  gameNumber: number;
  startGameHandler: any;
}

const calculate_mark = (answer: Answer) => {
  const rate = answer.correct / (answer.nonCorrect + answer.correct);
  if (rate >= 0.8) {
    return (
      <>
        <strong>Кира</strong> получает оценку <strong>5</strong>
      </>
    );
  } else if (rate >= 0.6) {
    return (
      <>
        <strong>Кира</strong> получает оценку <strong>5</strong>
      </>
    );
  } else {
    return (
      <>
        <strong>Кира</strong> попробуй еще раз
      </>
    );
  }
};

const round_finished = (
  answer: Answer,
  gameNumber: number,
  numberOfRounds: number
) => {
  return (
    answer.correct + answer.nonCorrect === numberOfRounds || gameNumber === 0
  );
};

enum Operations {
  subs = "-",
  add = "+",
}

const randomEnumKey = (enumeration: any): string => {
  const keys = Object.keys(enumeration).filter(
    (k) => !(Math.abs(Number.parseInt(k)) + 1)
  );
  const enumKey = keys[Math.floor(Math.random() * keys.length)];
  return enumKey;
};

const make_operation = (op: Operations) => {
  switch (op) {
    case Operations.subs:
      return (a: number, b: number) => a - b;
    case Operations.add:
      return (a: number, b: number) => a + b;
  }
};

function Calc({ numberOfRounds, gameNumber, startGameHandler }: Props) {
  const [answer, setAnswer] = useState({
    correct: 0,
    nonCorrect: 0,
    history: new Array<Equation>(),
  });
  const a = Math.round(Math.random() * 100);
  const b = Math.round(Math.random() * 10);
  const randomOperation = randomEnumKey(Operations);
  const op = Operations[randomOperation as keyof typeof Operations];
  const operation = make_operation(op);

  if (round_finished(answer, gameNumber, numberOfRounds)) {
    return (
      <>
        {gameNumber > 0 && (
          <div>
            {calculate_mark(answer)}
            <p>
              правильно <strong>{answer.correct}</strong>, ошибок{" "}
              <span style={{ color: "red" }}>
                <strong>{answer.nonCorrect}</strong>
              </span>
            </p>
          </div>
        )}
        <ul className="list-group">
          {answer.history
            .filter((item) => item.status === false)
            .map((item, index) => (
              <li key={index} className="list-group-item">
                {item.content} ❌ правильный ответ {item.correct}
              </li>
            ))}
        </ul>
        <button className="btn btn-outline-dark" onClick={startGameHandler}>
          новые примеры
        </button>
      </>
    );
  }

  return (
    <>
      <span style={{ fontSize: 25 }}>
        {a} {op} {b} =
      </span>
      <Checker
        a={a}
        b={b}
        operation={operation}
        operation_str={op}
        setAnswer={setAnswer}
        answer={answer}
      ></Checker>
    </>
  );
}

export default Calc;
