import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Signed up successfully, send email verification
            await sendEmailVerification(auth.currentUser);
            console.log('Verification email sent.');
            navigate('/login');
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

                                    <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>
                                        Sign up
                                    </button>
                                </form>

                                {error && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        {error}
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
