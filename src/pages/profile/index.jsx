import { useSelector } from "react-redux";
import PencilIcon from "../../components/icon/pencil-icon";
import { useState } from "react";
import { useHttpRequest } from "../../hooks/useHttpRequests";
import { useProfile } from "../../hooks/useProfile";
import ProfileIcon from "../../components/icon/profile-icon";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  first_name: yup.string().required("Nama depan harus diisi"),
  last_name: yup.string(),
});

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const defaultImage = "img/Profile Photo.png";
  const user = useSelector((state) => state.auth.userInfo);
  const { sendRequest } = useHttpRequest(
    "https://take-home-test-api.nutech-integrasi.com"
  );
  const { fetchProfile } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
    },
  });

  const changeImageHandler = async (e) => {
    console.log("check", e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      try {
        const res = await sendRequest({
          url: "/profile/image",
          method: "PUT",
          body: { file },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 0) {
          await fetchProfile();
        }
      } catch (err) {
        console.error("Image upload failed", err);
      }
    }
  };

  const editProfileHandler = async (data) => {
    try {
      const res = await sendRequest({
        url: "/profile/update",
        method: "PUT",
        body: data,
      });

      if (res.status === 0) {
        await fetchProfile();
        setEditMode(false);
      }
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center space-y-12">
      <div className="relative w-24 h-24">
        <img
          src={
            user?.profile_image &&
            user.profile_image !==
              "https://minio.nutech-integrasi.com/take-home-test/null"
              ? user.profile_image
              : defaultImage
          }
          alt="Profile"
          className="w-full h-full bg-white rounded-full"
        />

        <button
          onClick={() => document.getElementById("fileInput").click()}
          className="absolute right-0 bottom-0 bg-white border-[1px] border-gray-400 p-1.5 rounded-full"
        >
          <PencilIcon className="w-4 h-4 text-gray-700" />
        </button>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={changeImageHandler}
        />
      </div>
      <form
        onSubmit={handleSubmit(editProfileHandler)}
        className="flex flex-col w-full space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <div className="font-semibold text-sm">Email</div>
          <div className="border flex flex-row px-4 py-2 space-x-2 items-center border-gray-300 w-full rounded-sm">
            <div className="text-gray-300 text-[20px]">@</div>
            <input
              type="email"
              placeholder="masukan nominal Top Up"
              className="placeholder:text-lg w-full focus:outline-none"
              value={user.email}
              disabled={true}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-semibold text-sm">Nama Depan</div>
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
              placeholder="masukan nama depan"
              className="placeholder:text-lg w-full focus:outline-none"
              disabled={!editMode}
            />
          </div>
          {errors.first_name && (
            <span>
              <div className="text-red-500 text-sm w-full text-end justify-end">
                {errors.first_name.message}
              </div>
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-semibold text-sm">Nama Belakang</div>
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
              placeholder="masukan nama belakang"
              className="placeholder:text-lg w-full focus:outline-none"
              disabled={!editMode}
            />
          </div>
          {errors.last_name && (
            <span>
              <div className="text-red-500 text-sm w-full text-end justify-end">
                {errors.last_name.message}
              </div>
            </span>
          )}
        </div>
        {editMode ? (
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-sm hover:bg-red-600 transition"
          >
            Simpan
          </button>
        ) : (
          <>
            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-red-500 text-white py-2 rounded-sm hover:bg-red-600 transition"
            >
              Edit Profile
            </button>
            <Link
              to="/logout"
              type="submit"
              className="w-full bg-white text-center text-red-500 py-2 rounded-sm border-[1px] border-red-500 transition hover:bg-red-50"
            >
              Logout
            </Link>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
