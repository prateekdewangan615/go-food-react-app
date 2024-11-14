import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/GoFood/api/signup', { username, password, email });
            if (response.status === 200) {
                window.location.href = '/login';  // Redirect to login page after successful signup
            }
        } catch (error: any) {
            setError('Username already exists or something went wrong');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#FFF3E0',  // Light orangish background for the page
                fontFamily: "'Roboto', sans-serif",  // Clean and modern font
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: '#FFFFFF',  // White background for the form
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',  // Max width of form
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <h2
                    style={{
                        textAlign: 'center',
                        color: '#FF6F00',  // Orange color for title
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
                            border: '1px solid #FF6F00',  // Orange border for input
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
                            border: '1px solid #FF6F00',  // Orange border for input
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
                            border: '1px solid #FF6F00',  // Orange border for input
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
                        backgroundColor: '#FF6F00',  // Orange button background
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
        </div>
    );
};

export default SignupForm;