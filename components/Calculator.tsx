import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

const Calculator = () => {
  const [value, setValue] = useState<string>("");
  const [operation, setOperaton] = useState<string>("");
  const [display, setDisplay] = useState<string | number | null>(null);
  const [textShrinkPercentage, setTextShrinkPercentage] = useState<number>(100);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [topOps, setTopOps] = useState<string[]>(["AC", "+/-", "%"]);

  const arr = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
  const sideOps = ["/", "*", "-", "+", "="];
  const operators: any = {
    "+/-": (a: number) => a * -1,
    "%": (a: number) => a / 100,
  };

  const removeLeadingZeros = (value: string) => {
    return parseFloat(value).toString();
  };

  const handleTopOperators = (e: React.MouseEvent<HTMLInputElement>) => {
    const operator = e.currentTarget.value;
    if (operator === "AC") {
      init();
    } else if (operator === "C") {
      setValue("");
      handleDisplay(null);
    } else {
      if (value) {
        const lastCharOfOperation = operation.charAt(operation.length - 1);
        if (lastCharOfOperation === "-") {
          return;
        }
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
    setTextShrinkPercentage(100);
    if (textRef.current) {
      textRef.current.style.fontSize = `100%`;
    }
  };

  const handleDisplay = (displayValue: string | number | null) => {
    setDisplay(displayValue);
  };

  const handleCalculation = (operator: string, formattedValue: string) => {
    if (operator === "*" || operator === "/") {
      return;
    }
    const updateddisplay = operation + formattedValue;
    const display = eval(updateddisplay);
    handleDisplay(display);
    console.log("updatedDisplay", updateddisplay);
  };

  const handleOperation = (e: any) => {
    const operator = e.target.value;
    if (!value) {
      return;
    }
    const formattedValue = removeLeadingZeros(value);
    handleCalculation(operator, formattedValue);
    const operatorIsEquality = operator === "=";
    const updatedOperation = operatorIsEquality
      ? operation + formattedValue
      : operation + formattedValue + operator;
    setValue(operatorIsEquality ? eval(operation + formattedValue) : "");
    setOperaton(operatorIsEquality ? "" : updatedOperation);
  };

  const handleValue = (e: any) => {
    setValue(value + e.target.value);
    handleDisplay(value + e.target.value);
  };

  useEffect(() => {
    setTopOps((prevOps) => {
      const newOps = [...prevOps];
      newOps[0] = value ? "C" : "AC";
      return newOps;
    });
  }, [value]);

  useEffect(() => {
    if (textRef.current && textRef.current.offsetWidth >= 300) {
      const newShrinkPercentage = textShrinkPercentage / 1.4;
      textRef.current.style.fontSize = `${newShrinkPercentage}%`;
      setTextShrinkPercentage(newShrinkPercentage);
    }
  }, [display]);

  return (
    <div className="bg-[#081E58] w-[400px] h-[650px] flex items-center justify-center">
      <div className="w-[360px]   ">
        <header className=" w-full flex overflow-hidden items-end justify-end text-7xl mb-3 relative h-[130px] text-stone-800  p-5 shadow-header rounded-t bg-[#D1DBDA]">
          {operation && (
            <span className="text-sm text-stone-700 absolute top-2 right-2 p-2">
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
                  className="shadow-operator  focus:shadow-header text-white text-center text-2xl"
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
                    "shadow-operator flex-wrap text-center text-2xl text-white focus:shadow-header "
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
                className="shadow-operator text-black  text-center text-2xl focus:shadow-header "
                onClick={handleOperation}
                key={i}
              />
            ))}
          </aside>
        </main>
      </div>
    </div>
  );
};
export default Calculator;
