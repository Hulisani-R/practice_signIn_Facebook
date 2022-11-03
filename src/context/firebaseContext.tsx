import React, {createContext, ReactNode, useContext, useState} from "react";
import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    getAdditionalUserInfo, getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import {addDoc, collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {useNavigate} from "react-router-dom";

interface FirebaseContextType {
    firebaseUser: User | undefined
    firebaseSignInWithFacebook: () => Promise<any>
    firebaseSignInWithGoogle: () => Promise<any>
    firebaseSignInWithEmail: (email: string, password: string) => Promise<any>
    firebaseRegisterWithEmailAndPassword: (name: string, email: string, password: string) => Promise<any>
    firebaseLogout: () => void
    userEmail: string | null  | undefined
}

interface User {
    name: string | null,
    email: string | null,
    photoURL: string | null
}

const FirebaseContext = createContext({} as FirebaseContextType)

function FirebaseProvider({ children }: { children?: ReactNode }) {

    const navigate = useNavigate()

    const firebaseConfig = {
        apiKey: "AIzaSyA73gUDqpbrK0y_b3xWHPMfjZ6qTtrMxkE",
        authDomain: "practice-signin-facebook.firebaseapp.com",
        projectId: "practice-signin-facebook",
        storageBucket: "practice-signin-facebook.appspot.com",
        messagingSenderId: "672517876931",
        appId: "1:672517876931:web:580f11f175710543c60676"
    };

    const [user, setUser] = useState<User>();


    const facebookProvider = new FacebookAuthProvider()
    const signInWithFacebook = async () => {

        try {
            const res = await signInWithPopup(auth, facebookProvider)
            const user = res.user;

            const credentials = FacebookAuthProvider.credentialFromResult(res)

            // get claims for currently logged-in user
            // const token = await getIdTokenResult(user, false)

            const additionalStuff = getAdditionalUserInfo(res)
            console.log({
                user: user,
                credentials: credentials,
            })

            setUser({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            })

            console.log({
                credentials: credentials,
                additionalUserInfo: additionalStuff,
                user: user
            })

            if (additionalStuff?.isNewUser) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "facebook",
                    authProviderDetails: user.providerData,
                    refreshToken: user.refreshToken,
                    email: user.email,
                    accessToken: credentials?.accessToken,
                })
            }
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    }

    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    authProvider: "google",
                    uid: user.uid,
                    name: user.displayName,
                    authProviderDetails: user.providerData,
                    refreshToken: user.refreshToken,
                    email: user.email,
                });
            }
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    };

    const logInWithEmailAndPassword = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    };

    const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
            });
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    };

    const logout = async () => {
        await auth.signOut()
        navigate("/")
    };

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);
    const db = getFirestore(app);

    const r = auth.currentUser

    return <FirebaseContext.Provider
     value={{
         firebaseUser: user,
         firebaseSignInWithFacebook: signInWithFacebook,
         firebaseSignInWithGoogle: signInWithGoogle,
         firebaseSignInWithEmail: logInWithEmailAndPassword,
         firebaseRegisterWithEmailAndPassword: registerWithEmailAndPassword,
         firebaseLogout: logout,
         userEmail: r?.email
     }}
    >
        {children}
    </FirebaseContext.Provider>
}

const useFirebaseContext = () => useContext(FirebaseContext);
export { useFirebaseContext };

export default FirebaseProvider;
