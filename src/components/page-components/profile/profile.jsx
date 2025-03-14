import { useProfile } from "../../../hooks/useProfile";

const ProfileComponent = () => {
  const defaultImage = "/img/Profile Photo.png";
  const { isLoaded, user } = useProfile();
  return (
    <>
      {!isLoaded ? (
        <div>fetching...</div>
      ) : (
        <div className="flex flex-col space-y-4">
          <img
            src={
              user?.profile_image &&
              user.profile_image !==
                "https://minio.nutech-integrasi.com/take-home-test/null"
                ? user.profile_image
                : defaultImage
            }
            alt="Profile"
            className="w-16 h-16 bg-white rounded-full"
          />
          <div className="flex flex-col">
            <div className="text-base font-semibold text-gray-600">
              Selamat datang,
            </div>
            <div className="flex flex-row space-x-2 text-xl font-bold">
              <div> {user.first_name}</div>
              <div> {user.last_name}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileComponent;
