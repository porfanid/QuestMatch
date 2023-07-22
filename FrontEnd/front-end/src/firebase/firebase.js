import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
    apiKey: "AIzaSyAS3t_-6UlfS472AMMa5qyeiCyl1LNRjgE",
    authDomain: "questmatch2023.firebaseapp.com",
    projectId: "questmatch2023",
    storageBucket: "questmatch2023.appspot.com",
    messagingSenderId: "356123712758",
    appId: "1:356123712758:web:51595a201b32c260e060d7",
    measurementId: "G-W9627M92HG"
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lf76UQnAAAAAO4CywXFhQX16qW-TPknnyWwLVOr'),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
});
export default app;