import React, { useEffect, useState } from "react";
import { setLogout, setError } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfile } from "../../redux/actions/profileAction";
import { fetchProfileData, updateProfileData } from "../../redux/api/api";
import ModalUpload from "./ModalUpload";
import { uploadAction } from "../../redux/actions/uploadAction";

export default function Akun() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [updatedFirstName, setUpdatedFirstName] = useState(profileData.first_name);
  const [updatedLastName, setUpdatedLastName] = useState(profileData.last_name);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const userProfile = await fetchProfileData(token);
      dispatch(setProfile(userProfile));
    } catch (error) {
      console.error("Error fetching Profile:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLogout());
      // console.log("Logged out successfully.");
      navigate("/");
    } catch (error) {
      dispatch(setError("Error during logout. Please try again later."));
    }
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    if (!editMode) {
      setUpdatedFirstName(profileData.first_name);
      setUpdatedLastName(profileData.last_name);
    }
    setEditMode(!editMode);
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfileData(token, updatedFirstName, updatedLastName);
      const userProfile = await fetchProfileData(token);
      dispatch(setProfile(userProfile));

      setEditMode(false);
    } catch (error) {
      dispatch(setError("Failed to update profile. Please try again later."));
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && <ModalUpload isOpen={isModalOpen} closeModal={closeModal} uploadAction={uploadAction} token={token} />}
      <div className="container mx-auto py-4 px-4 md:px-10 lg:px-20 xl:px-40 mt-10">
        <div>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex items-center">
              <div className="block">
                <img src={profileData.profile_image} alt="" className="h-32 md:w-42 rounded-full" />
              </div>
            </div>
          </div>
          <h1 className={`text-2xl md:text-4xl font-semibold text-center ${editMode ? "hidden" : ""}`}>
            {profileData.first_name} {profileData.last_name}
          </h1>
          <form action="" className="w-full md:w-2/3 lg:w-1/2 items mx-auto my-2">
            <label>
              Email
              <input className="icon-email px-8 p-2 my-4 border w-full" type="text" value={profileData.email} disabled />
            </label>
            <label>
              Nama Depan
              <input className="icon-nama px-8 p-2 my-4 border w-full" type="text" value={updatedFirstName} disabled={!editMode} onChange={(e) => setUpdatedFirstName(e.target.value)} />
            </label>
            <label>
              Nama Belakang
              <input className="icon-nama px-8 p-2 my-4 border w-full" type="text" value={updatedLastName} disabled={!editMode} onChange={(e) => setUpdatedLastName(e.target.value)} />
            </label>
            {editMode ? (
              <button onClick={handleUpdateProfile} className="text-white bg-red-500 p-2 my-4 border w-full hover:bg-red-600 font-semibold">
                Simpan
              </button>
            ) : (
              <div>
                <button onClick={openModal} className="text-white bg-blue-500 p-2 my-4  border w-full hover:bg-blue-600 font-semibold">
                  Change Profile Image
                </button>
                <button onClick={handleEditProfile} className="bg-white p-2 my-4 border-2 w-full border-red-300 text-red-400 hover:bg-gray-100 font-semibold">
                  Edit Profile
                </button>
                <button onClick={handleLogout} className="text-white bg-red-500 p-2 my-4 border w-full hover:bg-red-600 font-semibold">
                  Logout
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
