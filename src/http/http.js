


import axios from "axios";
import { CONST } from '../appRedux/sagas/HTTP'
import CryptoJS from "crypto-js";

function authHeader() {
  const user = JSON.parse(localStorage.getItem(`user_id_tvs99`) || 'null');
  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return {};
  }
}

export const betChipsData = {
  "1000": 1000,
  "2000": 2000,
  "5000": 5000,
  "10000": 10000,
  "20000": 20000,
  "50000": 50000,
  "100000": 100000,
  "250000": 250000,
};

async function encryptPayload(payload) {
  if (process.env.REACT_APP_DECREPT_FLAG) {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(payload),
      process.env.REACT_APP_SECRET_KEY_DECREPT
    ).toString();
    return { data: encryptedData };
  }
  return payload;
}

async function decryptResponse(response) {
  if (response.data.dataEncrupt && response.data.dataEncrupt == true) {
    if (response.data) {
      let encruptedData = response.data.data
      const bytes = CryptoJS.AES.decrypt(encruptedData, process.env.REACT_APP_SECRET_KEY
      );
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      if (decryptedData && decryptedData != null && decryptedData != "" && decryptedData != undefined) {
        response.data.data = JSON.parse(decryptedData)
      }
    }
  }


  return response.data;
}

const httpGet = async (url, params, isNotify) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    };

    const payload = await encryptPayload(params);

    const result = await axios({
      method: "GET",
      url: CONST.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });

    await decryptResponse(result);

    invalidToken(result);

    return result;
  } catch (err) {
    console.error(err);
    if (err.request?.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const httpPost = async (url, params, isNotify) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    };

    const payload = await encryptPayload(params);

    const result = await axios({
      method: "POST",
      url: CONST.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });

    await decryptResponse(result);

    return result.data;
  } catch (err) {
    console.error(err);
    if (err.request?.status) {
      invalidHeadres(err.request.status);
    }
    return err
  }
};

const httpPostFormData = async (url, data, isNotify) => {
  try {
    const result = await axios({
      method: "POST",
      url: CONST.BACKEND_URL + url,
      data: data, // FormData encrypt nahi karte
      headers: {
        'Content-Type': 'multipart/form-data',
        ...authHeader()
      },
    });

    await decryptResponse(result);

    return result.data;
  } catch (err) {
    console.error(err);
    if (err.request?.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const httpPatch = async (url, params, isNotify) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    };

    const payload = await encryptPayload(params);

    const result = await axios({
      method: "PATCH",
      url: CONST.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });

    await decryptResponse(result);

    return result.data;
  } catch (err) {
    console.error(err);
    if (err.request?.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const invalidToken = async (result) => {
  if (result.data?.code === 3) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/signin";
  }
};

const invalidHeadres = async (status = "") => {
  if (status === 401) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/signin";
  }
};

export { httpGet, httpPost, httpPatch, httpPostFormData };



// import axios from "axios";
// import { CONST } from "../appRedux/sagas/HTTP";




// function authHeader() {
//   let user = JSON.parse(localStorage.getItem('user_id_tvs99'));
//   if (user && user.token) {
//     return { 'Authorization': 'Bearer ' + user.token };
//   } else {
//     return {};
//   }
// }

// const httpGet = async (url, params, isNotify) => {
//   try {
//     let headers = {
//       'Content-Type': 'application/json',
//       // 'Access-Control-Allow-Origin':'*',
//       "Authorization": authHeader().Authorization
//     };
//     // params = { ...params };
//     const result = await axios({
//       method: "GET",
//       url: CONST.BACKEND_URL + url,
//       data: { ...params },
//       headers: headers,
//     });

//     invalidToken(result);

//     return result;
//   } catch (err) {
//     console.error(err);
//     // toast.error(err.response.data.message);
//     if (err.request.status) {
//       invalidHeadres(err.request.status);
//     }
//   }
// };

// const httpPost = async (url, params, isNotify) => {
//   try {
//     let headers = {
//       'Content-Type': 'application/json',
//       // 'Access-Control-Allow-Origin':'*',
//       "Authorization": authHeader().Authorization
//     };
//     const result = await axios({
//       method: "POST",
//       url: CONST.BACKEND_URL + url,
//       data: { ...params },
//       headers: headers,
//     });


//     // await invalidToken(result);

//     if (result.data) {
//       if (result.data.error && isNotify) {
//         // error(result.message)
//         // alert("h1")
//       }
//       else if (isNotify && !result.data.error) {
//         // alert("h3")

//         // success(result.message)
//         //alert(result.data.message)
//       }
//       return result.data
//     } else {
//       // alert("h2")

//       return false
//     }
//   } catch (err) {
//     console.error(err.response);
//     return err.response

//     if (err.request.status) {
//       invalidHeadres(err.request.status);
//     }
//   }
// };


// // const httpPost = async (url, params, isNotify) => {
// //   try {
// //     let headers = {
// //       'Content-Type': 'application/json',
// //       // 'Access-Control-Allow-Origin':'*',
// //       "Authorization": authHeader().Authorization
// //     };
// //     const result = await axios({
// //       method: "POST",
// //       url: CONST.BACKEND_URL + url,
// //       data: { ...params },
// //       headers: headers,
// //     });


// //     // await invalidToken(result);

// //     if (result.data) {
// //       if (result.data.error && isNotify) {
// //         // error(result.message)
// //         alert("h1")
// //       }
// //       else if (isNotify && !result.data.error) {
// //         alert("h3")

// //         // success(result.message)
// //         //alert(result.data.message)
// //       }
// //       return result.data
// //     } else {
// //       alert("h2")

// //       return false
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     // toast.error(err.response.data.message);
// //     if (err.request.status) {
// //       invalidHeadres(err.request.status);
// //     }
// //   }
// // };

// const httpPostFormData = async (url, data, isNotify) => {
//   try {

//     const result = await axios({
//       method: "POST",
//       url: CONST.BACKEND_URL + url,
//       data: data,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });


//     await invalidToken(result);

//     if (result.data) {
//       if (result.data.error && isNotify) {
//         // error(result.message)
//         //alert(result.data.message)
//       }
//       else if (isNotify && !result.data.error) {
//         // success(result.message)
//         //alert(result.data.message)
//       }
//       return result.data
//     } else {
//       return false
//     }
//   } catch (err) {
//     console.error(err);
//     // toast.error(err.response.data.message);
//     if (err.request.status) {
//       invalidHeadres(err.request.status);
//     }
//   }
// };

// const httpPatch = async (url, params, isNotify) => {
//   try {
//     let headers = {
//       'Content-Type': 'application/json',
//       // 'Access-Control-Allow-Origin':'*',
//       "Authorization": authHeader().Authorization
//     };
//     const result = await axios({
//       method: "PATCH",
//       url: CONST.BACKEND_URL + url,
//       data: { ...params },
//       headers: headers,
//     });

//     invalidToken(result);
//     if (result.data) {
//       if (result.data.error && isNotify) {
//         // error(result.message)
//         //alert(result.data.message)
//       }
//       else if (isNotify && !result.data.error) {
//         // success(result.message)
//         //alert(result.data.message)
//       }
//     } else {
//       return false
//     }

//     return result.data
//   } catch (err) {
//     console.error(err);
//     if (err.request.status) {
//       invalidHeadres(err.request.status);
//       //   toast.error(err.response.data.message);
//     }
//   }
// };

// const invalidToken = async (result) => {
//   if (result.data.code === 3) {
//     localStorage.clear();
//     sessionStorage.clear();
//     window.location.href = "/signin";
//   }
// };

// const invalidHeadres = async (status = "") => {
//   if (status === 401) {
//     localStorage.clear();
//     sessionStorage.clear();
//     window.location.href = "/signin";
//   }
// };


// export { httpGet, httpPost, httpPatch, httpPostFormData };
