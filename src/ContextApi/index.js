
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getSocket, initSocket } from '../components/SocketConnection/SocketConnection';
import { userSignOut } from '../appRedux/actions';
import { useDispatch } from 'react-redux';
import { domainSettingByDomain, getMatchList, userBalance } from '../appRedux/actions/User';


const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState({
    coins: JSON.parse(localStorage.getItem("client-wallet-balance")) || "",
    exposure: JSON.parse(localStorage.getItem("client-wallet-exposure")) || ""
  });

  const dispatch = useDispatch()
  useEffect(() => {
    updateSocket();

    function updateSocket() {
      let userID = JSON.parse(localStorage.getItem("user_id_tvs99"));
      let token_Id = userID?.token;
      let socket = getSocket();

      if (!socket || socket == null) {
        socket = initSocket(token_Id);
      }

      const loginData = {
        userId: userID?.data?.userId,
        token: token_Id,
        domain: "tvs99.com"
      };

      socket.emit(`login`, loginData);
 
      socket.on("avaitorBetPlace", (data) => {
        console.log(data, "11111111111111111111");

      });
      
      socket.on("userLoggedOut", (data) => {
        // console.warn('userLoggedOut socket');
        // if (data == userID?.data?.userId){
        //   // return dispatch(userSignOut()) ff
        //   localStorage.clear()
        //   window.location.href = '/signin'
        // }
      });

      socket.on("sportsListUpdate", (data) => {
        if (data?.isUpdate) {
          dispatch(getMatchList())
        }
      });

      socket.on("domainUpdate", (data) => {
        if (data?.sportListUpdate) {
          dispatch(getMatchList())
        } if (data?.isDomainSettingUpdate) {
          dispatch(domainSettingByDomain())


        } if (data?.isLogout) {
          localStorage.clear()
          window.location.href = '/signin'
        }

        if (data?.isRefresh) {
          dispatch(userBalance());
          window.location.href = '/signin'
        }

      });

      socket.on("userLoggedIn", (data) => {
        console.warn('userLoggedIn socket');
      });
    


      socket.on("coinUpdate", (data) => {
        console.log("coinUpdate socket");
        localStorage.setItem("client-wallet-balance", JSON.stringify(data.coins));
        localStorage.setItem("client-wallet-exposure", JSON.stringify(data.exposure));
        setBalance({
          coins: data.coins,
          exposure: data.exposure,
        });
      });

      socket.on("fetchCasinoBetList", (data) => {
        console.log("fetchCasinoBetList scoket");
      });


    }
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  return useContext(BalanceContext);
};
