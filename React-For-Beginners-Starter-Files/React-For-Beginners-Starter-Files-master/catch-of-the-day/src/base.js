import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "", //TODO: Insert api key here
        authDomain: "", //TODO: Insert auth domain here
        databaseURL: "", //TODO: Insert database URL here 
});

// Return the actual database that we have (params)
const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp }

// Default export
export default base;