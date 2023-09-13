import React, { useState } from "react";
import { useDispatch } from "react-redux";

const ModalUpload = ({ isOpen, closeModal, uploadAction, token }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedImage) {
      let uploadSukses = false;
      dispatch(uploadAction(token, selectedImage))
        .then((response) => {
          uploadSukses = true;
          window.alert("Update Profile Berhasil");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Image upload error:", error);
        });
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
        <input type="file" accept="image/jpeg, image/png" onChange={handleImageSelect} />
        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600" onClick={handleUpload}>
          Upload
        </button>
        <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalUpload;
