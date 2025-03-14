import { useEffect, useState } from "react";
import BalanceComponent from "../../components/page-components/balance/balance";
import ProfileComponent from "../../components/page-components/profile/profile";
import { useHttpRequest } from "../../hooks/useHttpRequests";
import moment from "moment";

const TransactionPage = () => {
  const [transaction, setTransaction] = useState();
  const [limit, setLimit] = useState(5);
  const offset = 0;
  const { sendRequest } = useHttpRequest(
    "https://take-home-test-api.nutech-integrasi.com"
  );

  const fetchTransaction = async () => {
    try {
      const res = await sendRequest({
        url: "/transaction/history",
        method: "GET",
        params: {
          limit,
          offset,
        },
      });

      if (res.status === 0) {
        setTransaction(res.data.records);
      } else {
        // setNotifModalType("failed");
      }
      //   setConfirmModal(false);
      //   setNotifModal(true);
    } catch (err) {
      console.error("Error", err);
    }
  };

  const formattedBalance = (balance) => {
    return balance.toLocaleString("id-ID");
  };

  const formatDate = (date) => {
    const formattedDate = moment(date).format("DD MMMM YYYY HH:mm [WIB]");
    return formattedDate;
  };

  useEffect(() => {
    fetchTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <div className="flex flex-col space-y-12">
      <div className="flex flex-row w-full justify-between space-x-40">
        <ProfileComponent />
        <BalanceComponent />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <div className="text-xl font-semibold">Semua Transaksi</div>
        </div>
        <div className="flex flex-col space-y-4">
          {transaction &&
            transaction.map((item) => {
              return (
                <div
                  key={item.invoice_number}
                  className="flex flex-col border-[1px] border-gray-300 rounded-md p-4"
                >
                  <div className="flex flex-row justify-between">
                    <div
                      className={`text-lg font-semibold  ${
                        item.transaction_type === "PAYMENT"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {item.transaction_type === "PAYMENT" ? "-" : "+"}
                      Rp. {formattedBalance(item.total_amount)}
                    </div>
                    <div className="text-xs font-semibold">
                      {item.description}
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs">
                    {formatDate(item.created_on)}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {transaction && transaction.length === limit && (
        <div className="w-full items-center justify-center flex">
          <button
            onClick={() => setLimit(limit + 5)}
            className="text-red-500 w-fit font-semibold"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
