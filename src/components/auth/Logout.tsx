import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const Logout = () => {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const handleLogout = async () => {
            try {
                // Optional: Make an API request to your backend to handle logout
                await axios.post('http://localhost:8080/GoFood/api/logout');

                // Clear any stored authentication data (if using localStorage or cookies)
                localStorage.removeItem('authToken');
                
                // Show toast and redirect after 3 seconds
                setShowToast(true);
                setTimeout(() => {
                    navigate('/signup');  // Redirect to home page
                }, 3000);
            } catch (error) {
                console.error("Error logging out:", error);
            }
        };

        handleLogout();
    }, [navigate]);

    return (
      <>
      <Helmet>
        <title>Logout</title>
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
            {/* Toast notification for successful logout */}
            {showToast && (
                <div
                    className="toast align-items-center text-bg-success border-0 show"
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)', // Centering the toast
                        width: '500px',  // Increased width
                        zIndex: 999,
                    }}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div
                            className="toast-body"
                            style={{
                                fontSize: '1.5rem',  // Increased font size for better visibility
                                padding: '1.5rem',   // Increased padding to make the box bigger
                            }}
                        >
                            Successfully logged out.
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

export default Logout;
