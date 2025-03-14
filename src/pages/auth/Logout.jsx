import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetAuth } from "../../store/auth/authSlice";
import { resetBalance } from "../../store/balance/balanceSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");

    dispatch(resetAuth());
    dispatch(resetBalance());
    navigate("/");
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
