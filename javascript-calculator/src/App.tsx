import { useState } from "react";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;

    const part = et.split(" ");
    const newPart = [];

    for (let i = part.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(part[i]) && isOperator(part[i - 1])) {
        newPart.unshift(part[i]);
        let j = 0;
        let l = i - 1;
        while (isOperator(part[l])) {
          l--;
          j++;
        }
        i -= j;
      } else {
        newPart.unshift(part[i]);
      }
    }
    const newExpression = newPart.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <h1>Calculator App</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button id="clear" onClick={() => buttonPress("clear")} className="light-gray">C</button>
          <button id="negative" onClick={() => buttonPress("negative")} className="light-gray">+/-</button>
          <button id="percentage" onClick={() => buttonPress("percentage")} className="light-gray">%</button>
          <button id="divide" onClick={() => buttonPress("/")} className="yellow">/</button>
          <button id="seven" onClick={() => buttonPress("7")} className="dark-gray">7</button>
          <button id="eight" onClick={() => buttonPress("8")} className="dark-gray">8</button>
          <button id="nine" onClick={() => buttonPress("9")} className="dark-gray">9</button>
          <button id="multiply" onClick={() => buttonPress("*")} className="yellow">*</button>
          <button id="four" onClick={() => buttonPress("4")} className="dark-gray">4</button>
          <button id="five" onClick={() => buttonPress("5")} className="dark-gray">5</button>
          <button id="six" onClick={() => buttonPress("6")} className="dark-gray">6</button>
          <button id="subtract" onClick={() => buttonPress("-")} className="yellow">-</button>
          <button id="one" onClick={() => buttonPress("1")} className="dark-gray">1</button>
          <button id="two" onClick={() => buttonPress("2")} className="dark-gray">2</button>
          <button id="three" onClick={() => buttonPress("3")} className="dark-gray">3</button>
          <button id="add" onClick={() => buttonPress("+")} className="yellow">+</button>
          <button id="zero" onClick={() => buttonPress("0")} className="dark-gray">0</button>
          <button id="decimal" onClick={() => buttonPress(".")} className="dark-gray">.</button>
          <button id="equals" onClick={() => buttonPress("=")} className="yellow">=</button>
        </div>
      </div>
    </>
  );
}

export default App;