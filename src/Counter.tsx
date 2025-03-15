import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./store";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./counter/counterSlice";

export default function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-600">
      <h3
        className={`text-3xl ${
          count < 0 ? "text-red-400" : "text-green-400"
        }   mb-12`}
      >
        Counter : {count}{" "}
      </h3>

      <div className="flex gap-3">
        <button
          className="bg-red-500 py-2 px-4 cursor-pointer text-white text-base rounded-xl"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="bg-green-500 py-2 px-4 cursor-pointer text-white text-base rounded-xl"
          onClick={() => dispatch(decrement())}
        >
          Decrement{" "}
        </button>
        <button
          className="bg-orange-500 py-2 px-4 cursor-pointer text-white text-base rounded-xl"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Increment by 5
        </button>
      </div>
    </div>
  );
}
