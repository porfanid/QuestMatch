import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import {auth, firestore} from '../../firebase/firebase';
import { collection, doc, setDoc } from "firebase/firestore";

const Signup = (reference, data) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const [discord, setDiscord] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            if(password!==repeatPassword){
                throw new Error("The passwords do not match");
            }
            await createUserWithEmailAndPassword(auth, email, password);
            // Signed up successfully, send email verification
            await sendEmailVerification(auth.currentUser);
            console.log('Verification email sent.');

            // Update the user's display name with the provided name
            await updateProfile(auth.currentUser, {
                displayName: name
            });

            try {
                await setDoc(doc(firestore,"users",auth.currentUser.email), {
                    "discord": discord
                });
                console.log("Document written with ID: ");
            } catch (e) {
                console.error("Error adding document: ", e);
            }


            setVerificationSent(true);
        } catch (error) {
            const errorMessage = error.message;
            setError(errorMessage);
        }
    };

    return (
        <main className="container">
            <section>
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center mb-4">Sign Up</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            placeholder="Name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email-address">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Email address"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Password"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Repeat Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={repeatPassword}
                                            onChange={(e) => setRepeatPassword(e.target.value)}
                                            required
                                            placeholder="Repeat Password"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Discord Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={discord}
                                            onChange={(e) => setDiscord(e.target.value)}
                                            required
                                            placeholder="Discord Username"
                                        />
                                        <span className={"text-muted"}>This app relies on Discord to create the groups. You can register for a free Discord account <a href={"https://discord.com/"} target={"_blank"} rel={"noreferrer"}>here</a></span>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>
                                        Sign up
                                    </button>
                                </form>

                                {error && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        {error}
                                    </div>
                                )}

                                {verificationSent && (
                                    <div className="alert alert-success mt-3" role="alert">
                                        Verification email has been sent. Please check your inbox.
                                    </div>
                                )}

                                <p className="mt-3 text-center">
                                Already have an account?{' '}
                                    <NavLink to="/login">
                                        Sign in
                                    </NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Signup;
