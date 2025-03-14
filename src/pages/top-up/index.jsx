import { useState } from "react";
import { useHttpRequest } from "../../hooks/useHttpRequests";
import ProfileComponent from "../../components/page-components/profile/profile";
import BalanceComponent from "../../components/page-components/balance/balance";
import MoneyIcon from "../../components/icon/money-icon";
import ConfirmModal from "../../components/page-components/confirm-modal/confirm-modal";
import { useBalance } from "../../hooks/useBalance";
import NotifModal from "../../components/page-components/notif-modal/notif-modal";

const TopUpPage = () => {
  const { fetchBalance } = useBalance();
  const [confirmModal, setConfirmModal] = useState(false);
  const [notifModal, setNotifModal] = useState(false);
  const [notifModalType, setNotifModalType] = useState("");
  const [topUp, setTopUp] = useState("");
  const topUpAmounts = [
    "10000",
    "20000",
    "50000",
    "100000",
    "250000",
    "500000",
  ];

  const { sendRequest } = useHttpRequest(
    "https://take-home-test-api.nutech-integrasi.com"
  );

  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const parseCurrency = (value) => {
    return parseInt(value.replace(/\./g, ""), 10) || 0;
  };

  const onTopUp = async () => {
    try {
      const res = await sendRequest({
        url: "/topup",
        method: "POST",
        body: {
          top_up_amount: parseCurrency(topUp),
        },
      });

      if (res.status === 0) {
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
    setTopUp("");
    setNotifModal(false);
  };

  return (
    <>
      <ConfirmModal
        isOpen={confirmModal}
        onClose={() => setConfirmModal(!confirmModal)}
        onConfirm={onTopUp}
        title="Anda yakin untuk top up sebesar"
        message={`Rp${topUp} ?`}
        yesBtn="Ya, lanjutkan top up"
      />
      <NotifModal
        type={notifModalType}
        isOpen={notifModal}
        onConfirm={onConfirm}
        title="Top up sebesar"
        message={`Rp${topUp}`}
      />
      <div className="flex flex-col space-y-12">
        <div className="flex flex-row w-full justify-between space-x-40">
          <ProfileComponent />
          <BalanceComponent />
        </div>
        <div className="flex flex-col space-y-12">
          <div className="flex flex-col">
            <div className="text-base">Silahkan masukan</div>
            <div className="text-xl font-semibold">Nominal Top Up</div>
          </div>
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col w-full space-y-4">
              <div className="border flex flex-row px-4 py-2 space-x-2 items-center border-gray-300 w-full rounded-sm">
                <MoneyIcon className="w-6 h-6 text-gray-400" />
                <input
                  type="email"
                  placeholder="masukan nominal Top Up"
                  className="placeholder:text-lg w-full focus:outline-none"
                  value={topUp}
                  onChange={(e) => setTopUp(formatCurrency(e.target.value))}
                />
              </div>
              <button
                onClick={() => setConfirmModal(true)}
                className={`w-full py-2 text-white rounded-sm ${
                  topUp
                    ? "bg-red-500 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!topUp}
              >
                Top Up
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              {Array(2)
                .fill()
                .map((_, rowIndex) => (
                  <div key={rowIndex} className="flex flex-row space-x-4">
                    {topUpAmounts
                      .slice(rowIndex * 3, rowIndex * 3 + 3)
                      .map((amount) => (
                        <button
                          key={amount}
                          className={`w-[100px] border py-2 rounded-sm ${
                            topUp === formatCurrency(amount)
                              ? "border-red-500 bg-red-100"
                              : "border-gray-300"
                          }`}
                          onClick={() => setTopUp(formatCurrency(amount))}
                        >
                          Rp {amount.toLocaleString("id-ID")}
                        </button>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopUpPage;
