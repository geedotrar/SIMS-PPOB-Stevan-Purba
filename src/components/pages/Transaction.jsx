import React, { useState } from "react";
import bgSaldo from "../../assets/images/Background Saldo.png";
import { fetchBalanceData, fetchProfileData, fetchTransactionHistory } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setProfile } from "../../redux/actions/profileAction";
import { setBalance } from "../../redux/actions/balanceAction";
import { setHistory } from "../../redux/actions/transactionAction";

export default function Transaction() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { profileData } = useSelector((state) => state.profile);
  const { balanceData } = useSelector((state) => state.balance);
  const { historyData } = useSelector((state) => state.transaction);
  const initialLimit = 5;
  const [limit, setLimit] = useState(initialLimit);
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
      fetchTransactionHistory(0, limit, token)
        .then((historyData) => {
          dispatch(setHistory(historyData));
        })
        .catch((error) => {
          console.error("Error fetching History:", error);
        });
    }
  }, [token, limit]);

  const date = (day) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(day);
    let formattedTime = date.toLocaleTimeString("en-US", options);
    const replaceAt = formattedTime.replace("at", "");
    const replaceWib = replaceAt.replace("PM", "WIB");
    const result = replaceWib.replace(",", "");
    return result;
  };

  const convertToRupiah = (number) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    const formattedRupiah = formatter.format(number);
    return formattedRupiah;
  };

  const handleShowMore = () => {
    setLimit(limit + limit);
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
        <div className="my-10 mx-2">
          <h3 className="text-xl md:text-xl font-semibold">Semua Transaksi</h3>

          {historyData.map((data, index) => (
            <div key={index} className="text-black p-4 my-2 border w-full">
              <div className="flex justify-between items-center">
                <div className="text-start">
                  <p className="text-start">
                    {data.transaction_type === "TOPUP" ? (
                      <p className="text-2xl text-green-500 font-semibold">+ {convertToRupiah(data.total_amount)}</p>
                    ) : (
                      <p className="text-2xl text-red-500 font-semibold">- {convertToRupiah(data.total_amount)}</p>
                    )}
                  </p>
                  <div className="flex">
                    <p>{date(data.created_on)}</p>
                  </div>
                </div>
                <p>{data.description}</p>
              </div>
            </div>
          ))}
          <button onClick={handleShowMore} className="text-red-500 p-2 my-4  w-full hover:text-red-600 font-semibold">
            Show More
          </button>
        </div>
      </div>
    </div>
  );
}
