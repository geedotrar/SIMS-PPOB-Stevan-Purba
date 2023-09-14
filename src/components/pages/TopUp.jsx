import React, { useEffect, useState } from "react";
import bgSaldo from "../../assets/images/Background Saldo.png";
import { setProfile } from "../../redux/actions/profileAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalanceData, fetchProfileData } from "../../redux/api/api";
import { setBalance } from "../../redux/actions/balanceAction";
import { topUp } from "../../redux/actions/topUpAction";

export default function TopUp() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { profileData } = useSelector((state) => state.profile);
  const { balanceData } = useSelector((state) => state.balance);
  const [hideBalance, setHideBalance] = useState(false);

  useEffect(() => {
    if (token) {
      fetchProfileData(token)
        .then((profileData) => {
          dispatch(setProfile(profileData));
        })
        .catch((error) => {
          console.error("Error fetching Profile:", error);
        });
      fetchBalanceData(token)
        .then((balanceData) => {
          dispatch(setBalance(balanceData));
        })
        .catch((error) => {
          console.error("Error fetching balance:", error);
        });
    }
  }, [token]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSelectedOption(inputValue);
  };

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const handleTopUp = () => {
    if (selectedOption && token) {
      dispatch(topUp(selectedOption, token))
        .then((response) => {
          // console.log("Top-up Berhasil:", response);
          window.alert("Top Up Berhasil");
        })
        .catch((error) => {
          console.error("Top-up error:", error);
        });
    } else {
      console.error("Invalid");
    }
  };

  const buttonDisable = !selectedOption;

  const convertToRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    const formattedRupiah = formatter.format(number);
    return formattedRupiah;
  };

  const hiddenBalance = () => {
    setHideBalance(!hideBalance);
  };

  const hiddenBalanceValue = () => {
    const length = balanceData.balance.toString().length;
    return "*".repeat(length);
  };

  return (
    <div className="container mx-auto py-4 px-4 md:px-10 lg:px-20 xl:px-40 mt-10">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <div className="block">
              <img src={profileData.profile_image} alt="" className="w-16 h-20 md:w-24 rounded-full" />
              <div className="ml-4">
                <p className="mt-2 md:mt-0 text-lg md:text-xl">Selamat datang,</p>
                <h1 className="text-2xl md:text-4xl font-semibold">
                  {profileData.first_name} {profileData.last_name}
                </h1>
              </div>
            </div>
          </div>
          <div className="relative mt-4 md:mt-0">
            <img src={bgSaldo} alt="" className="w-full md:w-auto" />
            <h3 className="absolute text-lg md:text-2xl text-white top-2 md:top-5 left-2 md:left-5">Saldo anda</h3>
            <h3 className="absolute text-lg md:text-2xl text-white top-8 md:top-14 left-2 md:left-5">{hideBalance ? "Rp " + hiddenBalanceValue() : convertToRupiah(balanceData.balance)}</h3>
            <p onClick={hiddenBalance} className="cursor-pointer absolute text-sm md:text-base text-white top-14 md:top-28 left-2 md:left-5">
              {hideBalance ? "Lihat Saldo" : "Sembunyikan Saldo"}
            </p>
          </div>
        </div>
      </div>
      <div className="my-10 mx-2">
        <p className="mt-5 text-lg md:text-xl">Silahkan masukkan</p>
        <h1 className="text-2xl md:text-3xl font-semibold">Nominal Top Up</h1>
      </div>
      <div>
        <div className="flex flex-wrap">
          <form onSubmit={handleTopUp} className="w-full md:w-2/3 lg:w-1/2">
            <input type="number" className="p-2 m-2 border w-full" placeholder="masukkan nominal Top Up" value={selectedOption} onChange={handleInputChange} min={10000} max={1000000} />
            <button className={`text-white ${buttonDisable ? "bg-gray-500" : "bg-red-500  hover:bg-red-600"} p-2 m-2 border w-full`} type="submit" disabled={buttonDisable}>
              Top Up
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-10">
            <button className="btn-option border px-2" onClick={() => handleButtonClick(10000)}>
              Rp10.000
            </button>
            <button className="btn-option border px-2" onClick={() => handleButtonClick(20000)}>
              Rp20.000
            </button>
            <button className="btn-option border px-2" onClick={() => handleButtonClick(50000)}>
              Rp50.000
            </button>
            <button className="btn-option border px-2" onClick={() => handleButtonClick(100000)}>
              Rp100.000
            </button>
            <button className="btn-option border px-2" onClick={() => handleButtonClick(250000)}>
              Rp250.000
            </button>
            <button className="btn-option border px-2" onClick={() => handleButtonClick(500000)}>
              Rp500.000
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
