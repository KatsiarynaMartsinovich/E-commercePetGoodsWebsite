import ToastItem from "./ToastItem";

const Toaster = ({ toasts }) => {
  return (
    <section
      aria-label="Notifications alt+T"
      tabIndex="-1"
      aria-live="polite"
      aria-relevant="additions text"
      aria-atomic="false"
    >
      <div className="toaster-wrapper">
        <ol className="toaster group">
          {toasts.map((toast, index) => (
            <ToastItem 
              key={toast.id} 
              toast={toast} 
              index={index}
              totalCount={toasts.length}
            />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Toaster;