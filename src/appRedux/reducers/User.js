import {
  MATCH_LIST_REQUEST,
  MATCH_LIST_SUCCESS,
  MATCH_LIST_FAILURE,

  DOMIAN_SETTING_BY_DOMAIN_NAME_REQUEST,
  DOMIAN_SETTING_BY_DOMAIN_NAME_SUCCESS,
  DOMIAN_SETTING_BY_DOMAIN_NAME_FAILURE,

  USER_STATEMENT_REQUEST,
  USER_STATEMENT_SUCCESS,
  USER_STATEMENT_FAILURE,

  USER_LEDGER_LIST_REQUEST,
  USER_LEDGER_LIST_SUCCESS,
  USER_LEDGER_LIST_FAILURE,
  complete_Ledger_Details_FAILURE,
  complete_Ledger_Details_SUCCESS,
  complete_Ledger_Details_REQUEST,
  MATCH_DETAIL_REQUEST,
  MATCH_DETAIL_SUCCESS,
  MATCH_DETAIL_FAILURE,
  USER_POSITION_BY_MARKETID_REQUEST,
  USER_POSITION_BY_MARKETID_SUCCESS,
  USER_POSITION_BY_MARKETID_FAILURE,
  COMPLATED_FANCY_BY_MARKET_ID_REQUEST,
  COMPLATED_FANCY_BY_MARKET_ID_SUCCESS,
  COMPLATED_FANCY_BY_MARKET_ID_FAILURE,
  SPORTS_BET_LIST_REQUEST,
  SPORTS_BET_LIST_SUCCESS,
  SPORTS_BET_LIST_FAILURE,
  USER_BALANCE_REQUEST,
  USER_BALANCE_SUCCESS,
  USER_BALANCE_FAILURE,


  UPDATE_RATE_REFFRENECE_REQUEST,
  UPDATE_RATE_REFFRENECE_SUCCESS,
  UPDATE_RATE_REFFRENECE_FAILURE,


  CASINO_TRANSACTION_REPORT_REQUEST,
  CASINO_TRANSACTION_REPORT_SUCCESS,
  CASINO_TRANSACTION_REPORT_FAILURE,

  DIAMOND_BETS_LIST_REQUEST,
  DIAMOND_BETS_LIST_SUCCESS,
  DIAMOND_BETS_LIST_FAILURE,

  BET_PLACE_REQUEST,
  BET_PLACE_SUCCESS,
  BET_PLACE_FAILURE,

  ODDS_BET_PLACE_REQUEST,
  ODDS_BET_PLACE_SUCCESS,
  ODDS_BET_PLACE_FAILURE,

  CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_REQUEST,
  CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_SUCCESS,
  CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_FAILURE,


  CASINO_CASINO_BET_PLACE_REQUEST,
  CASINO_CASINO_BET_PLACE_SUCCESS,
  CASINO_CASINO_BET_PLACE_FAILURE,
  CASINO_LOGIN_URL_REQUEST,
  CASINO_LOGIN_URL_SUCCESS,
  CASINO_LOGIN_URL_FAILURE,
  CLOSE_ERROR_MODAL_MATCH_DETAIL,
  GET_MATKA_LIST_REQUEST,
  GET_MATKA_LIST_SUCCESS,
  GET_MATKA_LIST_FAILURE,
  GET_MATKA_BY_MATKA_EVENT_ID_REQUEST,
  GET_MATKA_BY_MATKA_EVENT_ID_SUCCESS,
  GET_MATKA_BY_MATKA_EVENT_ID_FAILURE,
  MATKA_BET_LIST_REQUEST,
  MATKA_BET_LIST_SUCCESS,
  MATKA_BET_LIST_FAILURE,
  diamondCasinoReportByUser_REQUEST,
  diamondCasinoReportByUser_SUCCESS,
  diamondCasinoReportByUser_FAILURE,
  GET_MATKA_PLACE_BET_REQUEST,
  GET_MATKA_PLACE_BET_SUCCESS,
  GET_MATKA_PLACE_BET_FAILURE,
  CLIENT_BET_LIST_REQUEST,
  CLIENT_BET_LIST_SUCCESS,
  CLIENT_BET_LIST_FAILURE,

  
  AVIATOR_BET_PLACE_REQUEST,
  AVIATOR_BET_PLACE_SUCCESS,
  AVIATOR_BET_PLACE_FAILURE,
  AVIATOR_CASHOUT_REQUEST,
  AVIATOR_CASHOUT_SUCCESS,
  AVIATOR_CASHOUT_FAILURE,
  RESET_AVIATOR_BET_FLAG,
  RESET_AVIATOR_CASHOUT_FLAG,
  AVIATOR_ROUNDID_LIST_REQUEST,
  AVIATOR_ROUNDID_LIST_SUCCESS,
  AVIATOR_ROUNDID_LIST_FAILURE,


  AVIATOR_BET_PLACE_REQUEST2,
  AVIATOR_BET_PLACE_SUCCESS2,
  AVIATOR_BET_PLACE_FAILURE2,
  AVIATOR_CASHOUT_REQUEST2,
  AVIATOR_CASHOUT_SUCCESS2,
  AVIATOR_CASHOUT_FAILURE2,
  RESET_AVIATOR_BET_FLAG2,
  RESET_AVIATOR_CASHOUT_FLAG2,

} from "../../constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: '',
  showMessage: false,
  initURL: '',
};


const UserReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    //..................match list 
    case MATCH_LIST_REQUEST: {
      return {
        ...state,
        loadingMatch: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case MATCH_LIST_SUCCESS: {
      return {
        ...state,
        loadingMatch: false,
        showMessage: true,
        matchList: action.payload,
      };
    }
    case MATCH_LIST_FAILURE: {
      return {
        ...state,
        loadingMatch: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }
    case DOMIAN_SETTING_BY_DOMAIN_NAME_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case DOMIAN_SETTING_BY_DOMAIN_NAME_SUCCESS: {
      return {
        ...state,
        loader: false,
        showMessage: false,
        doaminsettingData: action.payload.data,
      };
    }
    case DOMIAN_SETTING_BY_DOMAIN_NAME_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

    // USER STATEMENT.......

    case USER_STATEMENT_REQUEST:
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    case USER_STATEMENT_SUCCESS:
      return {
        ...state,
        userStatement: action.payload.data,
        userStatementMessage: action.payload,
        loading: false,
        showMessage: true,
      };
    case USER_STATEMENT_FAILURE:
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };

    case USER_LEDGER_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    }
    case USER_LEDGER_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        userLedgerListData: action.payload.data,
        alertMessage: action.payload.message
      };
    }
    case USER_LEDGER_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }


    case complete_Ledger_Details_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      };
    }
    case complete_Ledger_Details_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        completeLedgerListData: action.payload.data,
        alertMessage: action.payload.message
      };
    }
    case complete_Ledger_Details_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }
    case MATCH_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
        matchDetailsResponse: '',
      };
    }
    case MATCH_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        matchDetailsResponse: action.payload.data,
        alertMessage: action.payload.message
      };
    }
    case MATCH_DETAIL_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error,
        matchDetailsResponse: '',

      };
    }

    // USERPOSITION bY MARKET ID 

    case USER_POSITION_BY_MARKETID_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case USER_POSITION_BY_MARKETID_SUCCESS: {
      return {
        ...state,
        loading: false,
        showMessage: false,
        userpositionbymarketId: action.payload.data,
      };
    }
    case USER_POSITION_BY_MARKETID_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }
    //COMPLATED_FANCY_BY_MARKET_ID_REQUEST

    case COMPLATED_FANCY_BY_MARKET_ID_REQUEST: {
      return {
        ...state,
        loading: true,
        alertMessage: '',
        showMessage: false,
        completeDataLoading: true
      };
    }
    case COMPLATED_FANCY_BY_MARKET_ID_SUCCESS: {

      return {
        ...state,
        loading: false,
        showMessage: false,
        complatedFancy: action.payload.data,
        completeDataLoading: false

      };
    }
    case COMPLATED_FANCY_BY_MARKET_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        alertMessage: action.payload,
        showMessage: true,
        completeDataLoading: false
      };
    }

    // sportsBetsList
    case SPORTS_BET_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      }
    }
    case SPORTS_BET_LIST_SUCCESS: {
      return {
        ...state,
        sportsBetsList: action.payload,
        loading: false,
        showMessage: true,
      };
    }
    case SPORTS_BET_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }

    case USER_BALANCE_REQUEST: {
      return {
        ...state,
        loader: true,
        alertMessage: '',
        showMessage: false
      };
    }
    case USER_BALANCE_SUCCESS: {
      return {
        ...state,
        loader: false,
        // alertMessage: action.payload.message,
        balance: action.payload.data.coins,
        exposure: action.payload.data.exposure,
        // showMessage: true
      };
    }
    case USER_BALANCE_FAILURE: {
      return {
        ...state,
        loader: false,
        alertMessage: action.payload,
        showMessage: true
      };
    }

    //updateRateReffrenece
    case UPDATE_RATE_REFFRENECE_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      }
    }
    case UPDATE_RATE_REFFRENECE_SUCCESS: {
      return {
        ...state,
        updateRateReffrenece: action.payload.data,
        loading: false,
        showMessage: true,

      };
    }
    case UPDATE_RATE_REFFRENECE_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }

    // casinoTransactionReport      
    case CASINO_TRANSACTION_REPORT_REQUEST: {
      return {
        ...state,
        casinoReportLoader: true,
        showMessage: false,
      }
    }
    case CASINO_TRANSACTION_REPORT_SUCCESS: {
      return {
        ...state,
        casinoTransactionReport: action.payload.data,
        casinoReportLoader: false,
        showMessage: true,

      };
    }
    case CASINO_TRANSACTION_REPORT_FAILURE: {
      return {
        ...state,
        casinoReportLoader: false,
        showMessage: true,
        alertMessage: action.error
      };
    }


    case CLIENT_BET_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      }
    }
    case CLIENT_BET_LIST_SUCCESS: {
      return {
        ...state,
        clientSportsBetsList: action.payload,
        loading: false,
        showMessage: true,
      };
    }
    case CLIENT_BET_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }
    //casino/diamondBetsList

    case DIAMOND_BETS_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      }
    }
    case DIAMOND_BETS_LIST_SUCCESS: {
      return {
        ...state,
        diamondBetsList: action.payload.data,
        loading: false,
        showMessage: true,

      };
    }
    case DIAMOND_BETS_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }


    //updateRateReffrenece
    case BET_PLACE_REQUEST: {
      return {
        ...state,
        loading: true,
        betPlaceMessage: "",
        showMessage: false,
        processingBet: true,
        betStatus: false
      }
    }
    case BET_PLACE_SUCCESS: {
      return {
        ...state,
        betPlaceData: action.payload.data,
        betPlaceMessage: action.payload.message,
        loading: false,
        showMessage: true,
        processingBet: false,
        betStatus: true

      };
    }
    case BET_PLACE_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        betPlaceMessage: action.payload,
        processingBet: false,
        betStatus: "error"
      };
    }


    case AVIATOR_BET_PLACE_REQUEST: {
      return {
        ...state,
        loading: true,
        aviatorLoading1: true,
        aviatorBetPlaceMessage: "",
        aviatorBetFlag: false,
        aviatorOneTimeBet: false,
      }
    }
    case AVIATOR_BET_PLACE_SUCCESS: {
      return {
        ...state,
        aviatorBetPlaceData: action.payload.data,
        aviatorBetPlaceMessage: action.payload.message,
        aviatorBetFlag: true,
        aviatorOneTimeBet: true,
        loading: false,
        aviatorLoading1: false,

      };
    }
    case AVIATOR_BET_PLACE_FAILURE: {
      return {
        ...state,
        loading: false,
        aviatorLoading1: false,
        aviatorBetPlaceMessage: action.payload,
        aviatorBetFlag: false,
        aviatorOneTimeBet: false,
      };
    }


    case RESET_AVIATOR_BET_FLAG:
      return {
        ...state,
        aviatorBetFlag: false,
        aviatorBetPlaceData: null,
        aviatorOneTimeBet: false,
      };

    case RESET_AVIATOR_CASHOUT_FLAG:
      return {
        ...state,
        aviatorCashoutData: null,
        aviatorCashoutMessage: null,
        aviatorCashout: false,
        aviatorOneTimeCashout: false,
      };


    case AVIATOR_CASHOUT_REQUEST: {
      return {
        ...state,
        loading: true,
        aviatorLoadingCashout1: true,
        aviatorCashoutMessage: "",
        aviatorCashout: false,
        aviatorOneTimeCashout: false,
      }
    }
    case AVIATOR_CASHOUT_SUCCESS: {
      return {
        ...state,
        aviatorCashoutData: action.payload.data,
        aviatorCashoutMessage: action.payload.message,
        aviatorCashout: true,
        aviatorOneTimeCashout: true,
        aviatorLoadingCashout1: false,
        loading: false,

      };
    }
    case AVIATOR_CASHOUT_FAILURE: {
      return {
        ...state,
        loading: false,
        aviatorCashoutMessage: action.payload,
        aviatorOneTimeCashout: false,
        aviatorCashout: false,
         aviatorLoadingCashout1: false,
      };
    }



    // avaitor bet place 2


    case AVIATOR_BET_PLACE_REQUEST2: {
      return {
        ...state,
        loading: true,
        aviatorBetPlaceMessage2: "",
        aviatorBetFlag2: false,
        aviatorOneTimeBet2: false,
        aviatorLoading2: true,
      }
    }
    case AVIATOR_BET_PLACE_SUCCESS2: {
      return {
        ...state,
        aviatorBetPlaceData2: action.payload.data,
        aviatorBetPlaceMessage2: action.payload.message,
        aviatorBetFlag2: true,
        aviatorOneTimeBet2: true,
        loading: false,
        aviatorLoading2: false,

      };
    }
    case AVIATOR_BET_PLACE_FAILURE2: {
      return {
        ...state,
        loading: false,
        aviatorBetPlaceMessage2: action.payload,
        aviatorBetFlag2: false,
        aviatorOneTimeBet2: false,
        aviatorLoading2: false
      };
    }


    case RESET_AVIATOR_BET_FLAG2:
      return {
        ...state,
        aviatorBetFlag2: false,
        aviatorBetPlaceData2: null,
        aviatorOneTimeBet2: false,
        
      };

    case RESET_AVIATOR_CASHOUT_FLAG2:
      return {
        ...state,
        aviatorCashoutData2: null,
        aviatorCashoutMessage2: null,
        aviatorCashout2: false,
        aviatorOneTimeCashout2: false,
      };


    case AVIATOR_CASHOUT_REQUEST2: {
      return {
        ...state,
        loading: true,
        aviatorCashoutMessage2: "",
        aviatorCashout2: false,
        aviatorOneTimeCashout2: false,
         aviatorLoadingCashout2: true,
      }
    }
    case AVIATOR_CASHOUT_SUCCESS2: {
      return {
        ...state,
        aviatorCashoutData2: action.payload.data,
        aviatorCashoutMessage2: action.payload.message,
        aviatorCashout2: true,
        aviatorOneTimeCashout2: true,
        loading: false,
         aviatorLoadingCashout2: false,

      };
    }
    case AVIATOR_CASHOUT_FAILURE2: {
      return {
        ...state,
        loading: false,
        aviatorCashoutMessage2: action.payload,
        aviatorOneTimeCashout2: false,
        aviatorCashout2: false,
         aviatorLoadingCashout2: false,
      };
    }



    case AVIATOR_ROUNDID_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        aviatorRoundList: "",
      }
    }
    case AVIATOR_ROUNDID_LIST_SUCCESS: {
      return {
        ...state,
        aviatorRoundList: action.payload.data,
        aviatorRoundMessage: action.payload.message,
        loading: false,

      };
    }
    case AVIATOR_ROUNDID_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        aviatorCashoutMessage: action.payload,
      };
    }




    case AVIATOR_ROUNDID_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        aviatorRoundList: "",
      }
    }
    case AVIATOR_ROUNDID_LIST_SUCCESS: {
      return {
        ...state,
        aviatorRoundList: action.payload.data,
        aviatorRoundMessage: action.payload.message,
        loading: false,

      };
    }
    case AVIATOR_ROUNDID_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        aviatorCashoutMessage: action.payload,
      };
    }
    //updateRateReffrenece
    case ODDS_BET_PLACE_REQUEST: {
      return {
        ...state,
        betPlaceMessage: "",
        loading: true,
        showMessage: false,
        processingBet: true
      }
    }
    case ODDS_BET_PLACE_SUCCESS: {
      return {
        ...state,
        betPlaceData: action.payload.data,
        betPlaceMessage: action.payload.message,
        loading: false,
        showMessage: true,
        processingBet: false,
        betStatus: true
      }
    }
    case ODDS_BET_PLACE_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        betPlaceMessage: action.payload,
        processingBet: false,
        betStatus: "error"
      }
    }

    // GET BETS CASINO

    case CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      }
    }
    case CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_SUCCESS: {
      return {
        ...state,
        casinogetdiamondbyeventId: action.payload.data,
        loading: false,
        showMessage: true,

      };
    }
    case CASINO_GET_DIAMOND_CASINO_BY_EVENT_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }


    case CASINO_CASINO_BET_PLACE_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      }
    }
    case CASINO_CASINO_BET_PLACE_SUCCESS: {
      return {
        ...state,
        casinoBetPlaceData: action.payload.data,
        loading: false,
        showMessage: true,

      };
    }
    case CASINO_CASINO_BET_PLACE_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }

    // casino login url

    case CASINO_LOGIN_URL_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      }
    }
    case CASINO_LOGIN_URL_SUCCESS: {
      return {
        ...state,
        casinoLoginUrlData: action.payload.data,
        loading: false,
        showMessage: true,

      };
    }
    case CASINO_LOGIN_URL_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }
    // handele the bet place modal auto open when page render 
    case CLOSE_ERROR_MODAL_MATCH_DETAIL: {
      return {
        ...state,
        betStatus: false
      };
    }

    // get matka list 

    case GET_MATKA_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      }
    }
    case GET_MATKA_LIST_SUCCESS: {
      return {
        ...state,
        getMatkaListData: action.payload.data,
        loading: false,
        showMessage: true,

      };
    }
    case GET_MATKA_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }












    case GET_MATKA_BY_MATKA_EVENT_ID_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      }
    }
    case GET_MATKA_BY_MATKA_EVENT_ID_SUCCESS: {
      return {
        ...state,
        getMatkabyMatkaEvent: action.payload.data,
        loading: false,
        showMessage: true,

      };
    }
    case GET_MATKA_BY_MATKA_EVENT_ID_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }



    case MATKA_BET_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      }
    }
    case MATKA_BET_LIST_SUCCESS: {
      return {
        ...state,
        matkaBetListData: action.payload.data,
        loading: false,
        showMessage: true,

      };
    }
    case MATKA_BET_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }



    // daimond casinoReportByUSe 
    case diamondCasinoReportByUser_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
      }
    }
    case diamondCasinoReportByUser_SUCCESS: {
      return {
        ...state,
        diamondCasinoReportByUserData: action.payload.data,
        loading: false,
        showMessage: true,

      };
    }
    case diamondCasinoReportByUser_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error
      };
    }

    // MATKA PLACE BET


    case GET_MATKA_PLACE_BET_REQUEST: {
      return {
        ...state,
        loading: true,
        showMessage: false,
        matkaBetSucess: false
      }
    }
    case GET_MATKA_PLACE_BET_SUCCESS: {
      return {
        ...state,
        matkaBetsPlace: action.payload.data,
        loading: false,
        showMessage: true,
        matkaBetSucess: true,

      };
    }
    case GET_MATKA_PLACE_BET_FAILURE: {
      return {
        ...state,
        loading: false,
        showMessage: true,
        alertMessage: action.error,
        matkaBetSucess: false
      };
    }



    default:
      return state;
  }
}

export default UserReducer;






