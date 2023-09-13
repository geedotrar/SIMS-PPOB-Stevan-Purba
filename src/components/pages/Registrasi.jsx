import React, { useState } from "react";
import ilustrasi from "../../assets/images/Illustrasi Login.png";
import logo from "../../assets/images/Logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registrationAction } from "../../redux/actions/registrasiAction";

export default function Registrasi() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password.length < 8) {
      window.alert("Kesalahan: Password harus memiliki setidaknya 8 karakter");
      return;
    }
    if (password !== confirmPassword) {
      window.alert("Kesalahan: Password dan konfirmasi password tidak sama");
      return;
    }
    try {
      await dispatch(registrationAction(email, password, firstName, lastName));

      window.alert("Registrasi Berhasil");
    } catch (error) {
      console.error("Registration error:", error);
      window.alert("Registrasi Gagal");
    }
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <section className="min-h-screen flex box-border justify-center items-center">
        <div className="flex max-w-5xl p-5 items-center">
          <div className="md:w-1/2 px-8">
            <div className="flex items-center justify-center">
              <img src={logo} alt="logo" />
              <h2 className="font-bold text-xl text-[#002D74]">SIMS PPOB</h2>
            </div>
            <div className="flex justify-center items-center m-4">
              <h3 className="m-4 text-xl w-60 font-semibold text-center">Lengkapi data untuk membuat akun</h3>
            </div>

            <form className="mt-6 relative" onSubmit={handleRegister}>
              <input className="icon-email px-8 p-2 m-2 border w-full" type="email" placeholder="masukkan email anda" value={email} onChange={(e) => setEmail(e.target.value)} />

              <input className="icon-nama px-8 p-2 m-2 border w-full" type="text" placeholder="nama depan" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input className="icon-nama px-8 p-2 m-2 border w-full" type="text" placeholder="nama belakang" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <div className="relative">
                <input className="icon-password px-8 p-2 m-2 border w-full" type={showPassword ? "text" : "password"} placeholder="buat password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {password.length > 0 && (
                  <button type="button" className="absolute top-0 right-0 m-3" onClick={togglePassword}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                )}
              </div>
              <div className="relative">
                <input className="icon-password px-8 p-2 m-2 border w-full" type={showConfirmPassword ? "text" : "password"} placeholder="konfirmasi password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {confirmPassword.length > 0 && (
                  <button type="button" className="absolute top-0 right-0 m-3" onClick={toggleConfirmPassword}>
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                )}
              </div>
              <button className="register text-white bg-red-500 py-2 mx-2 mt-8 mb-6 w-full  hover:bg-red-600" type="submit">
                Registrasi
              </button>
            </form>
            <div className="flex justify-center text-xs">
              <p className="text-xs">
                sudah punya akun? Login
                <NavLink to="/">
                  <span className="text-red-500"> disini</span>
                </NavLink>
              </p>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl max-h-[700px]" src={ilustrasi} alt="login form image" />
          </div>
        </div>
      </section>
    </div>
  );
}
