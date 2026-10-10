import { useDispatch, useSelector } from "react-redux";
import { counterReset, decrement, increment, incrementByNumber } from "../app/features/counterSlice";
import type { AppDispatch, RootState } from "../app/store";


const Counter = () => {
    const conterValue = useSelector((state:RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();
    return(
        <div className="flex flex-col gap-4 p-5 mx-auto">
            <h1 className="text-lg font-bold">Counter Value: {conterValue}</h1>
            <button onClick={() => dispatch(increment())} className="bg-blue-500 p-2 rounded-2xl w-3xs cursor-pointer text-white">Increment</button>
            <button onClick={() => dispatch(decrement())} className="bg-red-400 p-2 rounded-2xl w-3xs cursor-pointer text-white">Decrement</button>
            <button onClick={() => dispatch(incrementByNumber(5))} className="bg-green-400 p-2 rounded-2xl w-3xs cursor-pointer text-white">Increment by 5</button>
            <button onClick={() => dispatch(counterReset())} className="bg-gray-400 p-2 rounded-2xl w-3xs cursor-pointer text-white">Reset</button>
        </div>
    )
};
export default Counter;