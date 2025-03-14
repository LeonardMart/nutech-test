import Modal from "../../modal/modal";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, yesBtn }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen onClose>
      <div className="p-6 flex flex-col w-full text-center items-center justify-center space-y-6">
        <img src="img/Logo.png" alt="Logo" className="w-16 h-16" />

        <div className="flex flex-col items-center justify-center">
          <div>{title}</div>
          <div className="text-xl font-bold">{message}</div>
        </div>

        <div className="flex flex-col items-center justify-center mt-6">
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-red-500 rounded-md font-semibold"
          >
            {yesBtn}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 rounded-md font-semibold"
          >
            Batalkan
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
