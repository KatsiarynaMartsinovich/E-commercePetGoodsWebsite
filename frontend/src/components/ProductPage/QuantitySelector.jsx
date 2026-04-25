import { useState } from "react";

const QuantitySelector = () => {
  const [count, setCount] = useState(1);

  return (
    <div className="quantity">
      <button onClick={() => setCount(Math.max(1, count - 1))}>
        –
      </button>

      <span>{count}</span>

      <button onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;