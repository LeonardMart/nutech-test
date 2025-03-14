import { useDispatch, useSelector } from "react-redux";
import { useHttpRequest } from "./useHttpRequests";
import { useState, useEffect, useCallback } from "react";
import { setUserInfo } from "../store/auth/authSlice";

export const useProfile = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.auth.userInfo);

  const { sendRequest } = useHttpRequest(
    "https://take-home-test-api.nutech-integrasi.com"
  );

  const fetchProfile = useCallback(async () => {
    try {
      const res = await sendRequest({
        url: "/profile",
        method: "GET",
      });

      if (res.status === 0) {
        dispatch(setUserInfo(res.data));
      }
    } catch (err) {
      console.error("Gagal mengambil data profil");
    } finally {
      setIsLoaded(true);
    }
  }, [dispatch, sendRequest]);

  useEffect(() => {
    if (!user) {
      fetchProfile();
    } else {
      setIsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { fetchProfile, user, isLoaded };
};
