import React from "react";
import Counter from "./Counter";
import "./index.css";
import Todo from "./todo";
export default function App() {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <button
        className="bg-blue-500 absolute top-5 right-5 py-2 px-4 cursor-pointer text-white text-base "
        onClick={handleToggle}
      >
        {toggle ? "Switch to Todo" : "Switch to Counter"}
      </button>
      {toggle ? <Counter /> : <Todo />}
    </>
  );
}
