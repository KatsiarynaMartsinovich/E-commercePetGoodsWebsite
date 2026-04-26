import { useRef, useState } from "react";

const ToastItem = ({ toast, index, totalCount }) => {
  const ref = useRef(null);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  const reversedIndex = totalCount - 1 - index;
  const scale = 1 - reversedIndex * 0.04;
  const translateY = reversedIndex * 46;

  const onPointerDown = (e) => {
    setDragging(true);
    startX.current = e.clientX;
    ref.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;

    let dx = e.clientX - startX.current;
    if (dx < 0) {
      dx = Math.max(dx, -40);
    }
    setX(dx);
  };

  const onPointerUp = () => {
    setDragging(false);

    if (x > 120) {
      ref.current.style.transition = "all 0.2s ease";
      setX(500);
      return;
    }

    setX(0);
  };

  return (
    <li
      ref={ref}
      className="toast-item"
      data-index={index}
      style={{
        "--i": reversedIndex,
        transform: `
          translateX(${x}px)
          translateY(${translateY}px)
          scale(${scale})
        `,
        zIndex: 100 - reversedIndex,
        transition: dragging ? "none" : "transform 0.25s ease, opacity 0.25s ease",
        touchAction: "none",
        cursor: "grab",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="toast-icon">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="toast-content">
        <div className="toast-title">{toast.message}</div>
      </div>
    </li>
  );
};

export default ToastItem;