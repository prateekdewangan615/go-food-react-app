import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);  // State to control toast visibility
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/GoFood/api/signup', { username, password, email });
            if (response.status === 200) {
                setShowToast(true);  // Show the toast

                // After 3 seconds, hide the toast and navigate to the login page
                setTimeout(() => {
                    setShowToast(false);
                    navigate('/login');
                }, 3000);
            }
        } catch (error: any) {
            setError('Username already exists or something went wrong');
        }
    };

    return (
      <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#FFF3E0',
                fontFamily: "'Roboto', sans-serif",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: '#FFFFFF',
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <h2
                    style={{
                        textAlign: 'center',
                        color: '#FF6F00',
                        marginBottom: '20px',
                        fontWeight: '600',
                    }}
                >
                    Sign Up
                </h2>

                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '16px',
                            borderRadius: '6px',
                            border: '1px solid #FF6F00',
                            transition: 'border-color 0.3s',
                        }}
                        onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#FF3D00'}
                        onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = '#FF6F00'}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '16px',
                            borderRadius: '6px',
                            border: '1px solid #FF6F00',
                            transition: 'border-color 0.3s',
                        }}
                        onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#FF3D00'}
                        onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = '#FF6F00'}
                    />
                </div>

                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '16px',
                            borderRadius: '6px',
                            border: '1px solid #FF6F00',
                            transition: 'border-color 0.3s',
                        }}
                        onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#FF3D00'}
                        onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = '#FF6F00'}
                    />
                </div>

                {error && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{error}</p>}

                <button
                    type="submit"
                    style={{
                        padding: '12px 20px',
                        fontSize: '16px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#FF6F00',
                        color: '#fff',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#FF3D00'}
                    onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#FF6F00'}
                >
                    Sign Up
                </button>
            </form>

            {/* Custom Toast Notification */}
            {showToast && (
                <div
                    className="toast align-items-center text-bg-success border-0 show"
                    style={{
                        position: "fixed",
                        bottom: "10px",
                        right: "10px",
                        width: "400px",
                        zIndex: 999,
                    }}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div
                            className="toast-body"
                            style={{ fontSize: "1.2rem", padding: "1.2rem" }}
                        >
                            Signup successful! Redirecting to login...
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            onClick={() => setShowToast(false)}
                            aria-label="Close"
                        ></button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default SignupForm;
