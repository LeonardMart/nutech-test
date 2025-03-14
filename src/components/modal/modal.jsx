
const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-fit max-w-md">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
