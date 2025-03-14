import { useDispatch, useSelector } from "react-redux";
import { useHttpRequest } from "./useHttpRequests";
import { useState, useEffect, useCallback } from "react";
import { setBalance } from "../store/balance/balanceSlice";

export const useBalance = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const balance = useSelector((state) => state.balance.amount);
  const { sendRequest } = useHttpRequest(
    "https://take-home-test-api.nutech-integrasi.com"
  );

  const fetchBalance = useCallback(async () => {
    try {
      setIsLoaded(false);
      const res = await sendRequest({
        url: "/balance",
        method: "GET",
      });

      if (res.status === 0) {
        console.log("masuk sini", res);
        dispatch(setBalance(res.data.balance));
      }
    } catch (err) {
      console.error("Gagal mengambil data balance");
    } finally {
      setIsLoaded(true);
    }
  }, [sendRequest]);

  useEffect(() => {
    if (!balance) {
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { fetchBalance, isLoaded };
};
