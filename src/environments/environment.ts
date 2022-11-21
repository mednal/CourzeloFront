// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripe: 'pk_test_51JYK8XLuKN48LccAhfUDj0vM9EjVCU3S4QBu2n1LOH6vEa7g3aKLNUzyABBixNvhJ8xXpjHKxsCdEhXIGWaLiHUG004bVv0EQb',
  serverUrl: '/api',
  firebase: {
    apiKey: "AIzaSyBPC7kCVM87F0fQyeRGDN6aAs-EcLK_dFs",
  authDomain: "courzelotrainerlast.firebaseapp.com",
  projectId: "courzelotrainerlast",
  storageBucket: "courzelotrainerlast.appspot.com",
  messagingSenderId: "805506847707",
  appId: "1:805506847707:web:3fe385d73dfb5e666e4dfe"

   // databaseURL: 'https://courzelotrainer-default-rtdb.firebaseio.com',

  }
};
export const environmentporject = {
  production: false,
  firebase: {
    apiKey: "AIzaSyARNo1OP-hLC1f9GiteI_bx_yTjGUCb-Gk",
    authDomain: "test-304c0.firebaseapp.com",
    projectId: "test-304c0",
    storageBucket: "test-304c0.appspot.com",
    messagingSenderId: "907750002997",
    appId: "1:907750002997:web:2915eead3206f8ab4dfc7c",
    measurementId: "G-K57KM26JJK",
   // databaseURL: 'https://test-304c0-default-rtdb.firebaseio.com/',

  }
};



export const environmentClassroom = {
  production: false,
   firebaseConfig: {
    apiKey: "AIzaSyAaaKBWdgEvdWi1531-ZMM_Ur7T1H6GlOc",
    authDomain: "classroom-8074b.firebaseapp.com",
    projectId: "classroom-8074b",
    storageBucket: "classroom-8074b.appspot.com",
    messagingSenderId: "968323556",
    appId: "1:968323556:web:d84ba739ab5809b8b817f1",

  }
  
};

export const environmentCourzeloCore = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDqkVgwGjz8Bl46j4iQr12BgBhGm-RRoCM",
    authDomain: "courzelo-core.firebaseapp.com",
    projectId: "courzelo-core",
    storageBucket: "courzelo-core.appspot.com",
    messagingSenderId: "921638314070",
    appId: "1:921638314070:web:c39a2f6ffc32ade2985bf7",
    measurementId: "G-Z9F4P02719"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
