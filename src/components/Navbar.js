import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); 

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>Home</Link>
                </li>
                {userId && (
                    <>
                        <li style={styles.navItem}>
                            <Link to="/recipelist" style={styles.navLink}>Recipe List</Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/profile" style={styles.navLink}>Profile</Link>
                        </li>
                        <li style={styles.navItem}>
                            <button onClick={handleLogout} style={{ ...styles.navLink, ...styles.logoutButton }}>
                                Logout
                            </button>
                        </li>
                    </>
                )}
                {!userId && (
                    <>
                        <li style={styles.navItem}>
                            <Link to="/login" style={styles.navLink}>Login</Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/registration" style={styles.navLink}>Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#333',
        padding: '10px 0',
    },
    navList: {
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    navItem: {
        margin: '0 15px',
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        padding: '8px 12px',
        borderRadius: '4px',
    },
    logoutButton: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    },
};

export default Navbar;
