import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginPage from "./pages/auth/login";
// import RegisterPage from "./pages/RegisterPage";
// import ProfilePage from "./pages/ProfilePage";
// import HomePage from "./pages/HomePage";
// import TopUpPage from "./pages/TopUpPage";
// import PaymentPage from "./pages/PaymentPage";
// import TransactionHistoryPage from "./pages/TransactionHistoryPage";
// import { Provider } from "react-redux";
// import store from "./redux/store";
import "./index.css"; // Import Tailwind CSS
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import HomePage from "./pages/home";
import { Provider } from "react-redux";
import store from "./store/store";
import TopUpPage from "./pages/top-up";
import TransactionPage from "./pages/transaction";
import ServiceTransaction from "./pages/transaction/serviceTransaction";
import ProfilePage from "./pages/profile";
import Logout from "./pages/auth/Logout";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="bg-white flex justify-center items-center">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/top-up" element={<TopUpPage />} />
              <Route path="/transaction" element={<TransactionPage />} />
              <Route
                path="/service-transaction/:code"
                element={<ServiceTransaction />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
