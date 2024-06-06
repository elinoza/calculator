import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

const Calculator = () => {
  const [value, setValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [textShrinkPercentage, setTextShrinkPercentage] = useState(100);
  const textRef = useRef(null);

  const arr = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ","];
  const topOps = ["AC", "+/-", "%"];
  const sideOps = ["/", "*", "-", "+", "="];

  const handleOperation = (operator) => {};
  const handleValue = (val) => {
    if (!value && !operation) {
      setValue(val);
    } else if (value && !operation) {
      const valueAsString = value.toString();
      const newValueAsString = val.toString();

      const newValue = parseFloat(valueAsString.concat(newValueAsString));
      setValue(newValue);
    }
  };
  useEffect(() => {
    if (textRef.current.offsetWidth >= 300) {
      const newShrinkPercentage = textShrinkPercentage / 1.1;
      textRef.current.style.fontSize = `${newShrinkPercentage}%`;
      setTextShrinkPercentage(newShrinkPercentage);
    }
    console.log(textRef.current.style.fontSize, textRef.current.offsetWidth);
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
            {topOps.map((operator) => (
              <div
                className=" but border  border-[#081E58] text-white text-center text-2xl"
                onClick={handleOperation}
                key={operator}
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
          {sideOps.map((num) => (
            <div
              className="but border  text-black border-[#081E58]  text-center text-2xl "
              onClick={handleOperation}
              key={num}
            >
              {num}
            </div>
          ))}
        </aside>
      </main>
    </div>
  );
};
export default Calculator;
