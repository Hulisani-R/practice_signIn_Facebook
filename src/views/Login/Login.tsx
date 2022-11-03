import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFirebaseContext} from "../../context";
import Container from "@mui/material/Container";

const theme = createTheme();

export enum User {
    Login = 0,
    SignUp = 1,
}

export default function Login() {
    const {firebaseSignInWithFacebook, firebaseSignInWithGoogle, firebaseSignInWithEmail, userEmail, firebaseRegisterWithEmailAndPassword} = useFirebaseContext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate()
    const [view, setView] = useState<User>(0)

    useEffect(() => {

        if (view === User.Login) {
            navigate("/login/hello",{
                replace: true,
            })
        }else {
            navigate("/login/me",{
                replace: true,
            })
        }
        if (userEmail){ navigate("/home")}
    }, [userEmail, navigate, view]);

    const register = () => {
        if (!name) alert("Please enter name");
        firebaseRegisterWithEmailAndPassword(name, email, password);
    };



    return (
        <ThemeProvider theme={theme}>
            {(() => {
                switch (view) {
                    case User.SignUp:
                        return <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign up
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="firstName"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                                onChange={(e) => {
                                                    setName(e.target.value)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="family-name"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                                label="I want to receive inspiration, marketing promotions and updates via email."
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={register}
                                    >
                                        Sign Up
                                    </Button>
                                    <Button onClick={firebaseSignInWithGoogle}>
                                        Sign Up With Google
                                    </Button>
                                    <Button onClick={firebaseSignInWithFacebook}>
                                        Sign Up With Facebook
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Button onClick={() => {
                                                setView(User.Login)
                                            }}>
                                                Already have an account? Sign in
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    case User.Login:
                        return <Grid container component="main" sx={{ height: '100vh' }}>
                            <CssBaseline />
                            <Grid
                                item
                                xs={false}
                                sm={4}
                                md={7}
                                sx={{
                                    backgroundImage: 'url(https://source.unsplash.com/random)',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: (t) =>
                                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                                <Box
                                    sx={{
                                        my: 8,
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Sign in
                                    </Typography>
                                    <Box component="form" noValidate sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={() => {
                                                firebaseSignInWithEmail(email, password)
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                        <Button onClick={firebaseSignInWithGoogle}>
                                            Login With Google
                                        </Button>
                                        <Button onClick={firebaseSignInWithFacebook}>
                                            Login With Facebook
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link to={"/"}>
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Button onClick={() => {
                                                    setView(User.SignUp)
                                                }}>
                                                    Don't have an account? Sign Up
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                }
            })()}
        </ThemeProvider>
    );
}