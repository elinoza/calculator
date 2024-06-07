import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

const Calculator = () => {
  const [value, setValue] = useState("");
  const [operation, setOperaton] = useState("");
  const [display, setDisplay] = useState(null);
  const [textShrinkPercentage, setTextShrinkPercentage] = useState(100);
  const textRef = useRef(null);

  const arr = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
  const topOps = ["AC", "+/-", "%"];
  const sideOps = ["/", "*", "-", "+", "="];
  const operators = {
    "+/-": (a) => a * -1,
    "%": (a) => a / 100,
  };

  const handleTopOperators = (e) => {
    const operator = e.target.value;
    if (operator === "AC") {
      init();
    } else {
      if (value) {
        const result = operators[operator](display);
        handleDisplay(result);
        setValue(result);
      } else if (operator === "AC") {
        init();
      }
    }
  };
  const init = () => {
    setValue("");
    setOperaton("");
    setDisplay(null);
  };

  const handleDisplay = (displayValue) => {
    setDisplay(displayValue);
  };
  const handleCalculation = () => {
    //there is an error when isNaN(lastChar) true
    const updateddisplay = operation + value;
    const display = eval(updateddisplay);
    handleDisplay(display);
    console.log(updateddisplay);
  };

  const handleOperation = (e) => {
    let newOperation = operation;
    const operator = e.target.value;
    const lastChar = operation.charAt(operation.length - 1);

    if (isNaN(lastChar)) {
      newOperation = operation.slice(0, operation.length - 1);
      setOperaton(newOperation);
    }
    if (operator !== "*" && operator !== "/") {
      handleCalculation();
    }
    const operatorIsEquality = operator === "=";
    const updatedOperation = operatorIsEquality
      ? operation + value
      : operation + value + operator;
    setOperaton(updatedOperation);
    setValue("");
  };

  const handleValue = (e) => {
    setValue(value + e.target.value);
    handleDisplay(value + e.target.value);
  };

  useEffect(() => {
    if (textRef.current.offsetWidth >= 300) {
      const newShrinkPercentage = textShrinkPercentage / 1.4;
      textRef.current.style.fontSize = `${newShrinkPercentage}%`;
      setTextShrinkPercentage(newShrinkPercentage);
    }
  }, [display]);

  return (
    <div className="w-[360px] shadow">
      <header className=" w-full flex overflow-hidden items-end justify-end text-7xl relative h-[150px] text-white p-7 rounded-t bg-[#081E58]">
        {operation && (
          <span className="text-sm text-stone-300 absolute top-2 right-2 p-2">
            {operation}
          </span>
        )}
        <h1 ref={textRef}>{display ? display : "0"}</h1>
      </header>
      <main className="w-full h-[450px] flex  text-white bg-[#314AA6]">
        {" "}
        <section className="flex-col  ">
          <div className="flex ">
            {" "}
            {topOps.map((operator, i) => (
              <input
                type="button"
                value={operator}
                className=" but border  border-[#081E58] text-white text-center text-2xl"
                onClick={handleTopOperators}
                key={i}
              />
            ))}
          </div>
          <div className=" flex flex-wrap">
            {" "}
            {arr.map((num) => (
              <input
                type="button"
                value={num}
                className={clsx(
                  num == 0 ? "!w-[180px]" : "",
                  "but p-2 border  border-[#081E58] flex-wrap text-center text-2xl text-white "
                )}
                onClick={handleValue}
                key={num}
              />
            ))}
          </div>
        </section>
        <aside className="flex-col bg-[#B3CEE1] ">
          {sideOps.map((operator, i) => (
            <input
              type="button"
              value={operator}
              className="but border  text-black border-[#081E58]  text-center text-2xl "
              onClick={handleOperation}
              key={i}
            />
          ))}
        </aside>
      </main>
    </div>
  );
};
export default Calculator;
