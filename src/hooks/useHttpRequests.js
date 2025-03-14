import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useHttpRequest = (baseHttpUrl) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const controller = useRef(new AbortController());
  const navigate = useNavigate();

  const sendRequest = async ({
    url,
    method,
    body = null,
    params = null,
    baseUrl = "",
    headers = {}, // Tambahin default empty object biar bisa nerima headers
  }) => {
    setLoading(true);
    setProgress(0);

    controller.current = new AbortController();
    let response = null;
    const token = localStorage.getItem("token");

    try {
      response = await axios.request({
        baseURL: baseHttpUrl ? baseHttpUrl : baseUrl,
        url: url,
        timeout: 0,
        method: method,
        params: params,
        data: body,
        signal: controller.current.signal,
        headers: {
          ...(body instanceof FormData
            ? {}
            : { "Content-Type": "application/json" }),
          Authorization: token ? `Bearer ${token}` : "",
          ...headers, // Ini bakal nge-merge headers yang dikirim dari luar
        },
      });
      console.log("response", response);
    } catch (err) {
      response = err.response;
      if (err.status == 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      setError(err);
    } finally {
      setLoading(false);
    }
    return response ? response.data : null;
  };

  return { sendRequest, error, loading, progress };
};
