import React from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token and session data
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('email');

        navigate('/');
    };

    return (
        <nav style={{
            padding: '10px',
            backgroundColor: '#004AAD', 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#F4C561' 
        }}>
            <h1 style={{ color: '#F4C561' }}>Recipe App</h1>
            <div>
                {location.pathname === '/home' ? (
                    <>
                        <Link to="/profile" style={linkStyle}>Profile</Link>
                        <button onClick={handleLogout} style={linkStyle}>Logout</button>
                    </>
                ) : location.pathname === '/profile' ? (
                    <>
                        <Link to="/home" style={linkStyle}>Home</Link>
                        <button onClick={handleLogout} style={linkStyle}>Logout</button>
                    </>
                ) : null}
            </div>
        </nav>
    );
}

const linkStyle = {
    color: '#F4C561', 
    textDecoration: 'none',
    margin: '0 10px',
    fontSize: '16px',
    border: 'none', 
    background: 'none', 
    cursor: 'pointer', 
};

export default Navbar;
