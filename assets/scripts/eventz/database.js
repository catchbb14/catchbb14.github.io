
// Initialize Firebase Global Searches
var config = {
  apiKey: "AIzaSyAcyA3p8B00X6r0jQwZC5W1X5g7Q6plzBI",
  authDomain: "eventz-fd24f.firebaseapp.com",
  databaseURL: "https://eventz-fd24f.firebaseio.com",
  projectId: "eventz-fd24f",
  storageBucket: "",
  messagingSenderId: "450909265460"
};
firebase.initializeApp(config);

var database = firebase.database();

// Initialize Firebase User Storage
var userConfig = {
  apiKey: "AIzaSyAT0kVDSaaKtAJFWUfb_VOHY6YY5aX3hxw",
  authDomain: "events-users.firebaseapp.com",
  databaseURL: "https://events-users.firebaseio.com",
  projectId: "events-users",
  storageBucket: "events-users.appspot.com",
  messagingSenderId: "160565921035"
};
var userApp = firebase.initializeApp(userConfig, 'userData');
var userDatabase = userApp.database();
var userRef = userApp.database().ref('users/');

