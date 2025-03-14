import { useEffect, useState } from "react";
import BalanceComponent from "../../components/page-components/balance/balance";
import ConfirmModal from "../../components/page-components/confirm-modal/confirm-modal";
import NotifModal from "../../components/page-components/notif-modal/notif-modal";
import ProfileComponent from "../../components/page-components/profile/profile";
import { useHttpRequest } from "../../hooks/useHttpRequests";
import MoneyIcon from "../../components/icon/money-icon";
import { useBalance } from "../../hooks/useBalance";
import { useLocation, useParams } from "react-router-dom";

const ServiceTransaction = () => {
  const { code } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const icon = queryParams.get("icon");
  const service_name = queryParams.get("service_name");
  const service_price = queryParams.get("price");
  const { fetchBalance } = useBalance();
  const [payment, setPayment] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [notifModal, setNotifModal] = useState(false);
  const [notifModalType, setNotifModalType] = useState("");
  const { sendRequest, loading } = useHttpRequest(
    "https://take-home-test-api.nutech-integrasi.com"
  );

  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const parseCurrency = (value) => {
    return parseInt(value.replace(/\./g, ""), 10) || 0;
  };

  const onPay = async () => {
    try {
      const res = await sendRequest({
        url: "/transaction",
        method: "POST",
        body: {
          service_code: code,
        },
      });

      if (res.status == 0) {
        await fetchBalance();
        setNotifModalType("success");
      } else {
        setNotifModalType("failed");
      }
      setConfirmModal(false);
      setNotifModal(true);
    } catch (err) {
      console.error("Error", err);
    }
  };

  const onConfirm = () => {
    setNotifModal(false);
  };

  useEffect(() => {
    setPayment(formatCurrency(service_price));
  }, [service_price]);
  return (
    <>
      <ConfirmModal
        isOpen={confirmModal}
        onClose={() => setConfirmModal(!confirmModal)}
        onConfirm={onPay}
        title={`Beli ${service_name} senilai`}
        message={`Rp${payment} ?`}
        yesBtn="Ya, lanjutkan bayar"
      />
      <NotifModal
        type={notifModalType}
        isOpen={notifModal}
        onConfirm={onConfirm}
        title="Pembayaran sebesar"
        message={`Rp${payment}`}
      />
      <div className="flex flex-col space-y-12">
        <div className="flex flex-row w-full justify-between space-x-40">
          <ProfileComponent />
          <BalanceComponent />
        </div>
        <div className="flex flex-col space-y-12">
          <div className="flex flex-col space-y-2">
            <div className="text-base">PemBayaran</div>
            <div className="flex flex-row items-center space-x-2">
              <img src={icon} className="w-6 h-6" />
              <div className="text-xl font-semibold">{service_name}</div>
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col w-full space-y-4">
              <div className="border flex flex-row px-4 py-2 space-x-2 items-center border-gray-300 w-full rounded-sm">
                <MoneyIcon className="w-6 h-6 text-gray-400" />
                <input
                  type="email"
                  placeholder="masukan nominal PemBayaran"
                  className="placeholder:text-lg w-full focus:outline-none"
                  value={payment}
                  disabled={true}
                />
              </div>
              <button
                onClick={() => setConfirmModal(true)}
                className={`w-full py-2 text-white rounded-sm ${
                  payment
                    ? "bg-red-500 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!payment}
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceTransaction;
