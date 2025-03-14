import { XIcon } from "lucide-react";
import CheckIcon from "../../icon/check-icon";
import Modal from "../../modal/modal";

const NotifModal = ({ isOpen, onConfirm, title, message, type }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen onClose>
      <div className="p-6 flex flex-col w-full text-center items-center justify-center space-y-6">
        {type == "success" && (
          <div className="bg-green-500 rounded-full p-6">
            <CheckIcon className="text-white w-12 h-12" />
          </div>
        )}

        {type == "failed" && (
          <div className="bg-red-500 rounded-full p-6">
            <XIcon className="text-white" />
          </div>
        )}

        <div className="flex flex-col items-center justify-center">
          <div>{title}</div>
          <div className="text-xl font-bold">{message}</div>
          {type == "success" && <div>berhasil!</div>}
          {type == "failed" && <div>gagal!</div>}
        </div>

        <div className="flex flex-col items-center justify-center mt-6">
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-red-500 rounded-md font-semibold"
          >
            Kembali ke beranda
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotifModal;
