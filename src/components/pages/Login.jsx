import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setError } from "../../redux/actions/authAction";
import ilustrasi from "../../assets/images/Illustrasi Login.png";
import logo from "../../assets/images/Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../redux/api/api";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { token, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      if (data) {
        const userToken = data.data.token;
        dispatch(setToken(userToken));
        dispatch(setError(null));
        console.log("Logged in successfully. Token:", userToken);
        navigate("/home");
      }
    } catch (error) {
      dispatch(setError(error.message || "Error during login. Please try again later."));
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="min-h-screen flex box-border justify-center items-center">
      <div className="flex max-w-5xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <div className="flex items-center justify-center">
            <img src={logo} alt="logo" />
            <h2 className="font-bold text-xl text-[#002D74]">SIMS PPOB</h2>
          </div>
          <div className="flex justify-center items-center m-4">
            <h3 className="m-4 text-xl w-60 font-semibold text-center">Masuk atau buat akun untuk memulai</h3>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <input className="icon-email px-8 p-2 m-2 border w-full" placeholder="masukkan email anda" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="relative">
              <input className="icon-password px-8 p-2 m-2 border w-full" type={showPassword ? "text" : "password"} placeholder="masukkan password anda" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {password.length > 0 && (
                <button type="button" className="absolute top-0 right-0 m-3" onClick={togglePassword}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              )}
            </div>
            <button type="submit" className="register text-white bg-red-500 py-2 mx-2 mt-8 mb-6 w-full  hover:bg-red-600">
              Masuk
            </button>
          </form>
          <div className="flex justify-center text-xs">
            <p className="text-xs">
              belum punya akun? registrasi
              <NavLink to="/register">
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
  );
};

export default Login;
