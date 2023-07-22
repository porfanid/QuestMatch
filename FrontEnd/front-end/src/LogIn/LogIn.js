import {NavLink, useNavigate} from "react-router-dom";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import React, {useState} from 'react';


function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if (!user.emailVerified) {
                    setErrorMessage('Please verify your email before logging in.');
                    return;
                }
                localStorage.setItem('isLoggedIn', 'true');
                setIsLoggedIn(true);
                navigate("/home");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setErrorMessage('Invalid email or password. Please try again.');
            });
    }

    if(localStorage.getItem('isLoggedIn')==='true'){
        navigate('/home');
        return;
    }

    return (
        <main className="py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card p-4 shadow">
                            <h2 className="text-center mb-4">Login</h2>
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <form onSubmit={onLogin}>
                                <div className="form-group">
                                    <label htmlFor="email-address">Email address</label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        required
                                        placeholder="Email address"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        required
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"

                                    >
                                        Login
                                    </button>
                                </div>
                            </form>

                            <p className="text-sm text-center mt-3">
                                No account yet?{' '}
                                <NavLink to="/signup">Sign up</NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;