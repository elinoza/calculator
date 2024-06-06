import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

const Calculator = () => {
  const [value, setValue] = useState(null);
  const [storage, setstorage] = useState(null);
  //   const [virtualResult, setVirtualResult] = useState(null);
  const [result, setResult] = useState(null);
  const [op, setOp] = useState(null);
  const [textShrinkPercentage, setTextShrinkPercentage] = useState(100);
  const textRef = useRef(null);

  const arr = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ","];
  const topOps = ["AC", "+/-", "%"];
  const sideOps = ["/", "*", "-", "+", "="];
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => {
      if (b !== 0) {
        return a / b;
      } else {
        throw new Error("Division by zero is not allowed.");
      }
    },
    "%": (a, b) => a % b,
    "^": (a, b) => Math.pow(a, b),
  };

  const handleOperation = (operator) => {
    if (operator === "=") {
      setValue(storage);
      setOp(null);
    } else if (!op) {
      setOp(operator);
      setValue(storage);
    } else if (op) {
      const result = operators[op](storage, value);
      setstorage(result);
      setValue(result);
      setOp(op);
    }
  };
  const handleValue = (val) => {
    if (!value && value !== 0 && !op) {
      setValue(val);
      setstorage(val);
    } else if ((value || value === 0) && !op) {
      const valueAsString = value.toString();
      if (typeof val === "string") {
      } else {
        const newValueAsString = val.toString();
        const newValue = parseFloat(valueAsString.concat(newValueAsString));
        setValue(newValue);
        setstorage(newValue);
      }
    } else if ((value || value === 0) && op) {
      setValue(val);
    }
  };
  useEffect(() => {
    console.log(value, storage, op);
  }, [op, value]);

  useEffect(() => {
    if (textRef.current.offsetWidth >= 300) {
      const newShrinkPercentage = textShrinkPercentage / 1.1;
      textRef.current.style.fontSize = `${newShrinkPercentage}%`;
      setTextShrinkPercentage(newShrinkPercentage);
    }
  }, [value]);

  return (
    <div className="w-[360px] shadow">
      <header className=" w-full flex overflow-hidden items-end justify-end text-7xl h-[150px] text-white p-7 rounded-t bg-[#081E58]">
        <h1 ref={textRef}>{value ? value : "0"}</h1>
      </header>
      <main className="w-full h-[450px] flex  text-white bg-[#314AA6]">
        {" "}
        <section className="flex-col  ">
          <div className="flex ">
            {" "}
            {topOps.map((operator, i) => (
              <div
                className=" but border  border-[#081E58] text-white text-center text-2xl"
                onClick={() => handleOperation(operator)}
                key={i}
              >
                {operator}
              </div>
            ))}
          </div>
          <div className=" flex flex-wrap">
            {" "}
            {arr.map((num) => (
              <div
                className={clsx(
                  num == 0 ? "!w-[180px]" : "",
                  "but p-2 border  border-[#081E58] flex-wrap text-center text-2xl text-white "
                )}
                onClick={() => handleValue(num)}
                key={num}
              >
                {num}
              </div>
            ))}
          </div>
        </section>
        <aside className="flex-col bg-[#B3CEE1] ">
          {sideOps.map((operator, i) => (
            <div
              className="but border  text-black border-[#081E58]  text-center text-2xl "
              onClick={() => handleOperation(operator)}
              key={i}
            >
              {operator}
            </div>
          ))}
        </aside>
      </main>
    </div>
  );
};
export default Calculator;