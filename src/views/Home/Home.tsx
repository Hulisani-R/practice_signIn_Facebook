import React from "react";
import {useFirebaseContext} from "../../context";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion"
import Grid from "@mui/material/Grid";

function HomePage() {
    const navigate = useNavigate()
    const {firebaseLogout, firebaseUser} = useFirebaseContext()

    console.log("Firebase user: ", firebaseUser)

    if (!firebaseUser) {
        navigate("/")
    }

    if (firebaseUser?.photoURL) {
        fetch("https://lh3.googleusercontent.com/a/AATXAJxgNYo-o6_eQxUXyBQE4XVbCRYPGOts-Cvx5TIN=s96-c")
            .then(response => response.blob())
            .then(blob => {
                console.log(blob);
            });
    }

    return (
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                position: "fixed",
                height: "100vh",
                width: "100%"
            }}
        >
        <div className="dashboard">
            <div className="dashboard__container">
                <div>Hello there {firebaseUser?.name}</div>
                <div>{firebaseUser?.email}</div>
                <button className="dashboard__btn" onClick={firebaseLogout}>
                    Logout
                </button>
            </div>
        </div>
        </Grid>
    );
}
export default HomePage;
//
// export function download(url: string,onComplete?: (blob: any) => void) {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url);
//     xhr.responseType = "blob";
//
//     if (onComplete) {
//         onComplete(xhr.response)
//     }
//
//     console.log(xhr.response)
// }
