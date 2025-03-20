"use client"

import { useState } from "react";

const CounterButton = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="flex items-center space-x-3">
            <button
                className="bg-red-500 px-3 py-1 rounded text-white"
                onClick={() => setCount(count - 1)}
                disabled={count <= 0}
            >
                -
            </button>
            <span className="text-lg text-white">{count}</span>
            <button
                className="bg-green-500 px-3 py-1 rounded text-white"
                onClick={() => setCount(count + 1)}
            >
                +
            </button>
        </div>
    );
};

export default CounterButton;
