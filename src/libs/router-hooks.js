import { myAuthAxios } from "./api.js";
import { createStore } from "../store";

//  -------------------------------- DOSSIER -----------------------------------------------
// const getMyDossier = () => {
//   return new Promise((resolve, reject) => {
//     myAuthAxios({
//       url: "/dossier/me",
//       method: "get"
//     })
//       .then((res) => {
//         if (
//           res &&
//           res.data &&
//           res.data.data &&
//           res.data.status === "success" &&
//           res.data.data.dossier
//         ) {
//           return resolve(res.data.data.dossier);
//         } else {
//           return resolve(false);
//         }
//       })
//       .catch((error) => {
//         return resolve(false);
//       });
//   });
// };

const checkDossierLogin = () => {
  return new Promise((resolve, reject) => {
    myAuthAxios({
      url: "/dossier/checklogin",
      method: "get"
    })
    .then((res) => {
      let resData = (res || {}).data || {};
      let data = (resData.data || {});
      if (resData.status === "success") {
        return resolve(data.dossierId);
      } else {
        return resolve(false);
      }
    })
    .catch((error) => {
      return resolve(false);
    });
  });
};

const checkregistered = () => {
    return new Promise((resolve, reject) => {
      myAuthAxios({
        url: "/dossier/checkregistered",
        method: "get"
      })
      .then((res) => {
        let resData = (res || {}).data || {};
        let data = (resData.data || {});
        if (resData.status === "success") 
        {
          return resolve({ baseInfo: data.baseInfo, dossierId: data.dossierId, isLogin: true, isRegistered: true });
        } else {
          return resolve({ baseInfo: data.baseInfo, dossierId: data.dossierId, isLogin: true, isRegistered: false });
        }
      })
      .catch((error) => {
        return resolve({ baseInfo: {},  dossierId: null, isLogin: false, isRegistered: false });
      });
    });
};

// const getMyDossierHook = async ({ to, from, next }) => {
//   try {
//     let dossier = await getMyDossier();
//     if (dossier) {
//       var store = createStore();
//       store.dispatch("dossier/setDossier", dossier);
//       return next();
//     }
//     return next({ name: 'dossier-login' });
//   } catch (e) {
//     return next({ name: 'dossier-login' });
//   }
// };

const requireDossierAuth = async ({ to, from, next }) => {
  try {
    let dossierId = await checkDossierLogin();
    if (dossierId) {
      var store = createStore();
      store.dispatch("dossier/setDossierId", dossierId);
      return next();
    }
    return next({ name: 'dossier-login' });
  } catch (e) {
    return next({ name: 'dossier-login' });
  }
};

const requireDossierAuthRegistered = async ({ to, from, next }) => {
  try {
    // get stored data from login
    var store = createStore();
    let dossier = store.state.dossier.dossier;
    if (Object.keys(dossier) && Object.keys(dossier).length) {
      let isRegistered = (
        dossier &&
        dossier.firstName &&
        dossier.lastName &&
        dossier.email &&
        dossier.address &&
        (dossier.address.city || dossier.address.street || dossier.zipcode)
      ) ? true : false;
      if (isRegistered) {
        return next();
      }
      return next({ name: 'dossier-register' });
    } else {
      var checkData = await checkregistered();
      if (checkData.dossierId) {
        store.dispatch("dossier/setDossier", checkData.baseInfo);
        store.dispatch("dossier/setDossierId", checkData.dossierId);
      }
      if (!checkData.isLogin) {
        return next({ name: 'dossier-login' });
      } else if (checkData.isLogin && checkData.isRegistered) {
        return next();
      } else if (checkData.isLogin && !checkData.isRegistered) {
        return next({ name: 'dossier-register' });
      }
      return next({ name: 'dossier-login' });
    }
  } catch (e) {
    return next({ name: 'dossier-login' });
  }
};

const requireDossierAuthNoRegistered = async ({ to, from, next }) => {
  try {
    // get stored data from login
    var store = createStore();
    let dossier = store.state.dossier.dossier;
    
    if (Object.keys(dossier) && Object.keys(dossier).length) {
      let isRegistered = (
        dossier &&
        dossier.firstName &&
        dossier.lastName &&
        dossier.email &&
        dossier.address &&
        (dossier.address.city || dossier.address.street || dossier.zipcode)
      ) ? true : false;
      if (isRegistered) {
        return next({ name: 'dossier-dash' });
      }
      return next();
    } else {
      var checkData = await checkregistered();
      if (checkData.dossierId) {
        store.dispatch("dossier/setDossier", checkData.baseInfo);
        store.dispatch("dossier/setDossierId", checkData.dossierId);
      }
      if (!checkData.isLogin) {
        return next({ name: 'dossier-login' });
      } else if (checkData.isLogin && checkData.isRegistered) {
        return next({ name: 'dossier-dash' });
      } else if (checkData.isLogin && !checkData.isRegistered) {
        return next();
      }
    }
  } catch (e) {
    return next({ name: 'dossier-login' });
  }
};

// const requireNoDossierAuth = async ({ to, from, next }) => {
//   try {
//     let myData = await checkDossierLogin();
//     if (!myData) {
//       let store = createStore();
//       store.dispatch("auth/setDossier", myData);
//       return next();
//     }
//   } catch (e) {
//     return next();
//   }
// };

// ---------------------------------------- SECRETARY -------------------------------------

const checkSecretaryLogin = () => {
  return new Promise((resolve, reject) => {
    myAuthAxios({
      url: "/secretary/checklogin",
      method: "get"
    })
    .then((res) => {
      let resData = (res || {}).data || {};
      let data = (resData.data || {});
      if (resData.status === "success") {
        return resolve(data.secretaryId);
      } else {
        return resolve(false);
      }
    })
    .catch((error) => {
      return resolve(false);
    });
  });
};

const requireSecretaryAuth = async ({ to, from, next }) => {
  try {
    let secretaryId = await checkSecretaryLogin();
    if (secretaryId) {
      var store = createStore();
      store.dispatch("secretary/setSecretaryId", secretaryId);
      return next();
    }
    return next({ name: 'secretary-login' });
  } catch (e) {
    return next({ name: 'secretary-login' });
  }
};

export { 
  // getMyDossierHook,
  requireDossierAuth,
  requireDossierAuthRegistered,
  requireDossierAuthNoRegistered,
  requireSecretaryAuth
  // requireNoDossierAuth
};
