import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [location, setLocation] = useState(window.location.pathname);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/login');
    };

    useEffect(() => {
        setLocation(window.location.pathname);
        const handleLocationChange = () => setLocation(window.location.pathname);
        window.addEventListener('popstate', handleLocationChange);

        return () => {
            window.removeEventListener('popstate', handleLocationChange);
        };
    }, []);

    const isRecipeListPage = location === '/recipelist';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 fixed-top">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <FontAwesomeIcon icon={faHome} className="text-white" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {userId && !isRecipeListPage && (
                            <>
                                <li className="nav-item">
                                    <Link to="/recipelist" className="nav-link">
                                        Recipe List
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        onClick={handleLogout}
                                        className="nav-link btn btn-link text-white"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        {!userId && (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/registration" className="nav-link">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
