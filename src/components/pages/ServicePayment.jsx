import React, { useEffect, useState } from "react";
import bgSaldo from "../../assets/images/Background Saldo.png";
import { setProfile } from "../../redux/actions/profileAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalanceData, fetchProfileData } from "../../redux/api/api";
import { setBalance } from "../../redux/actions/balanceAction";
import { useLocation, useNavigate } from "react-router-dom";
import { servicePaymentAction } from "../../redux/actions/servicesAction";

export default function ServicePayment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { serviceCode, serviceName, serviceIcon, serviceTarif } = location.state || {};

  const dispatch = useDispatch();
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

  const convertToRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    const formattedRupiah = formatter.format(number);
    return formattedRupiah;
  };

  const handlePayment = () => {
    if (serviceCode && token) {
      dispatch(servicePaymentAction(serviceCode, token))
        .then((response) => {
          console.log("Payment response:", response);
          window.alert("Payment Successful");
          navigate("/transaction");
        })
        .catch((error) => {
          console.error("Payment error:", error);
          window.alert("Payment Failed");
        });
    } else {
      console.error("Invalid");
    }
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
            <h3 className="absolute text-lg md:text-2xl text-white top-8 md:top-14 left-2 md:left-5">{hideBalance ? convertToRupiah(balanceData.balance) : "Rp " + hiddenBalanceValue()}</h3>
            <p onClick={hiddenBalance} className="cursor-pointer absolute text-sm md:text-base text-white top-14 md:top-28 left-2 md:left-5">
              {hideBalance ? "Sembunyikan Saldo" : "Lihat Saldo"}
            </p>
          </div>
        </div>
      </div>
      <div className="my-10 mx-2">
        <p className="mt-5 mb-2 text-lg md:text-xl">Pembayaran</p>
        <div className="flex items-center ">
          <img src={serviceIcon} alt="" className="w-5 h-15 md:w-14 rounded-full" />
          <h1 className="text-2xl md:text-3xl font-semibold">{serviceName}</h1>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap">
          <form className="w-full">
            <input type="text" className="p-2 m-2 border w-full" placeholder="masukkan nominal Top Up" value={convertToRupiah(serviceTarif)} readOnly disabled />
            <button className={`text-white bg-red-500 hover:bg-red-600 p-2 m-2 border w-full`} type="button" onClick={handlePayment}>
              Bayar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
