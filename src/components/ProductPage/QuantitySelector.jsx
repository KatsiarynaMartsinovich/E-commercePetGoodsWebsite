const QuantitySelector = ({ value, onChange }) => {
  const decrease = () => {
    onChange(Math.max(1, value - 1));
  };

  const increase = () => {
    onChange(value + 1);
  };

  return (
    <div className="quantity">
      <button onClick={decrease}>–</button>

      <span>{value}</span>

      <button onClick={increase}>+</button>
    </div>
  );
};

export default QuantitySelector;