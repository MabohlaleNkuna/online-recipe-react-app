import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = localStorage.getItem('userId');

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const isRecipeListPage = location.pathname === '/recipelist';

    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>
                        <FontAwesomeIcon icon={faHome} style={styles.icon} />
                    </Link>
                </li>
                {userId && !isRecipeListPage && (
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
        backgroundColor: 'transparent',
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
    icon: {
        fontSize: '24px',
        padding: '4px',
        borderRadius: '50%',
        color: 'black',
    },
    logoutButton: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    },
};

export default Navbar;
