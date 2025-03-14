import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockIcon from "../../components/icon/lock-icon";
import ProfileIcon from "../../components/icon/profile-icon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EyeIcon from "../../components/icon/eye-icon";
import { useHttpRequest } from "../../hooks/useHttpRequests";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email harus diisi"),
  first_name: yup.string().required("Nama depan harus diisi"),
  last_name: yup.string(),
  password: yup
    .string()
    .min(8, "Password minimal 8 karakter")
    .required("Password harus diisi"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password tidak sama")
    .required("Konfirmasi password harus diisi"),
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { sendRequest } = useHttpRequest(
    "https://take-home-test-api.nutech-integrasi.com"
  );
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });


  const onSubmit = async (data) => {
    try {
      const res = await sendRequest({
        url: "/registration",
        method: "POST",
        body: data,
      });
      if (res.status === 0) {
        navigate("/home");
      }
    } catch (err) {
      console.error("Registrasi gagal");
    }
  };

  return (
    <div className="flex items-center h-screen bg-gray-100 w-full">
      <div className="w-full space-y-12 bg-white px-14 py-14 h-full">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-2 items-center justify-center">
            <img src="img/Logo.png" alt="Logo" />
            <div className="text-xl font-bold">SIMS PPOB</div>
          </div>
          <div className="text-xl font-bold text-center">
            Lengkapi data untuk membuat akun
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div
            className={`border flex flex-row px-4 py-2 space-x-2 items-center ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          >
            <div
              className={
                errors.email
                  ? "text-red-600 text-[20px]"
                  : "text-gray-300 text-[20px]"
              }
            >
              @
            </div>
            <input
              {...register("email")}
              type="email"
              placeholder="Masukkan email Anda"
              className="placeholder:text-lg w-full focus:outline-none"
            />
          </div>
          {errors.email && (
            <span>
              <div className="text-red-500 text-sm w-full text-end justify-end">
                {errors.email.message}
              </div>
            </span>
          )}

          <div
            className={`border flex flex-row px-4 py-2 space-x-2 items-center ${
              errors.first_name ? "border-red-500" : "border-gray-300"
            }`}
          >
            <ProfileIcon
              className={
                errors.first_name
                  ? "text-red-600 w-6 h-6"
                  : "text-gray-300 w-6 h-6"
              }
            />
            <input
              {...register("first_name")}
              type="text"
              placeholder="Nama depan"
              className="placeholder:text-lg w-full focus:outline-none"
            />
          </div>
          {errors.first_name && (
            <span>
              <div className="text-red-500 text-sm w-full text-end justify-end">
                {errors.first_name.message}
              </div>
            </span>
          )}

          <div
            className={`border flex flex-row px-4 py-2 space-x-2 items-center ${
              errors.last_name ? "border-red-500" : "border-gray-300"
            }`}
          >
            <ProfileIcon
              className={
                errors.last_name
                  ? "text-red-600 w-6 h-6"
                  : "text-gray-300 w-6 h-6"
              }
            />
            <input
              {...register("last_name")}
              type="text"
              placeholder="Nama belakang"
              className="placeholder:text-lg w-full focus:outline-none"
            />
          </div>

          <div
            className={`border flex flex-row px-4 py-2 justify-between items-center ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          >
            <div className="flex flex-row space-x-2 w-full">
              <LockIcon
                className={
                  errors.password
                    ? "text-red-600 w-6 h-6"
                    : "text-gray-300 w-6 h-6"
                }
              />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Buat password"
                className="placeholder:text-lg w-full focus:outline-none"
              />
            </div>

            <button onClick={() => setShowPassword(!showPassword)}>
              <EyeIcon className="text-gray-300 w-6 h-6" />
            </button>
          </div>
          {errors.password && (
            <span>
              <div className="text-red-500 text-sm w-full text-end justify-end">
                {errors.password.message}
              </div>
            </span>
          )}

          <div
            className={`border flex flex-row px-4 py-2 space-x-2 items-center ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          >
            <div className="flex flex-row space-x-2 w-full">
              <LockIcon
                className={
                  errors.confirmPassword
                    ? "text-red-600 w-6 h-6"
                    : "text-gray-300 w-6 h-6"
                }
              />
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi password"
                className="placeholder:text-lg w-full focus:outline-none"
              />
            </div>

            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <EyeIcon className="text-gray-300 w-6 h-6" />
            </button>
          </div>
          {errors.confirmPassword && (
            <span>
              <div className="text-red-500 text-sm w-full text-end justify-end">
                {errors.confirmPassword.message}
              </div>
            </span>
          )}

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-sm hover:bg-blue-600 transition"
          >
            Registrasi
          </button>

          <div className="flex flex-row space-x-1 justify-center">
            <div>sudah punya akun? login</div>
            <Link to="/" className="text-red-500 font-semibold">
              di sini
            </Link>
          </div>
        </form>
      </div>
      <img
        src="/img/Illustrasi Login.png"
        className="max-h-screen"
        alt="Illustrasi Login"
      />
    </div>
  );
};

export default RegisterPage;
