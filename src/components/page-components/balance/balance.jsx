import { useState } from "react";
import EyeIcon from "../../icon/eye-icon";
import { useSelector } from "react-redux";

const BalanceComponent = () => {
  const [isHidden, setIsHidden] = useState(true);
  const balance = useSelector((state) => state.balance.amount);

  const formattedBalance = (balance) => {
    return balance.toLocaleString("id-ID");
  };

  return (
    <div className="relative">
      <img
        src="img/Background Saldo.png"
        alt="Background Saldo"
        className="w-full h-full"
      />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-white p-4">
        <h1 className="text-sm font-normal">Saldo Anda</h1>

        <p className="text-2xl font-bold">
          Rp {isHidden ? "•••••••" : formattedBalance(balance)}
        </p>

        <button
          onClick={() => setIsHidden(!isHidden)}
          className="flex flex-row items-center space-x-1"
        >
          <div className="text-sm font-normal">
            {isHidden ? "Lihat Saldo" : "Tutup Saldo"}
          </div>
          <EyeIcon className="w-4 h-4 mt-0.5" />
        </button>
      </div>
    </div>
  );
};

export default BalanceComponent;
