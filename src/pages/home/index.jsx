import { useEffect, useState } from "react";
import { useHttpRequest } from "../../hooks/useHttpRequests";
import ProfileComponent from "../../components/page-components/profile/profile";
import BalanceComponent from "../../components/page-components/balance/balance";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [banner, setBanner] = useState([]);

  const { sendRequest } = useHttpRequest(
    "https://take-home-test-api.nutech-integrasi.com"
  );
  const getServices = async () => {
    try {
      const res = await sendRequest({
        url: "/services",
        method: "GET",
      });

      if (res.status === 0) {
        setServices(res.data);
      }
    } catch (err) {
      console.error("Registrasi gagal");
    }
  };

  const getBanner = async () => {
    try {
      const res = await sendRequest({
        url: "/banner",
        method: "GET",
      });

      if (res.status === 0) {
        setBanner(res.data);
      }
    } catch (err) {
      console.error("Registrasi gagal");
    }
  };

  useEffect(() => {
    getServices();
    getBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col space-y-12">
      <div className="flex flex-row w-full justify-between space-x-40">
        <ProfileComponent />
        <BalanceComponent />
      </div>
      <div className="flex flex-row w-full justify-between">
        {services &&
          services.map((item) => {
            return (
              <Link
                to={`/service-transaction/${item.service_code}?service_name=${item.service_name}&icon=${item.service_icon}&price=${item.service_tariff}`}
                key={item.service_code}
                className="flex flex-col space-y-1 items-center"
              >
                <img src={item.service_icon} alt="service icon" className="w-20 h-18" />
                <div className="text-xs text-center w-[80px]">
                  {item.service_name}
                </div>
              </Link>
            );
          })}
      </div>
      <div className="flex flex-col space-y-4">
        <div className="font-semibold">Temukan Promo Menarik</div>
        <div className="flex flex-row w-full space-x-4 overflow-x-auto whitespace-nowrap">
          {banner.map((item) => (
            <div key={item.banner_name} className="flex-shrink-0 w-64">
              <img src={item.banner_image} alt="banner" className="w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
