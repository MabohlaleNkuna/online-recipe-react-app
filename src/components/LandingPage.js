import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const styles = {
        container: {
            textAlign: 'center',
            padding: '20px',
            background: 'linear-gradient(to right, #F4C561, #004AAD)',
            color: '#FFFFFF',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        heading: {
            fontSize: '2.5em',
            color: '#241D10',
            marginBottom: '10px',
        },
        paragraph: {
            fontSize: '1.2em',
            color: '#FFFFFF',
            margin: '20px 0',
        },
        recipeImages: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '20px',
            maxWidth: '1000px',
        },
        recipeItem: {
            textAlign: 'center',
            margin: '15px',
            border: '2px solid #FFFFFF',
            borderRadius: '10px',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        },
        recipeImage: {
            width: '200px',
            height: '150px',
            objectFit: 'cover',
        },
        label: {
            margin: '10px 0',
            color: '#241D10',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to RecipeApp</h1>
            <p style={styles.paragraph}>
                Click <Link to="/login" style={{ color: '#FFD700', fontWeight: 'bold' }}>login</Link> or <Link to="/registration" style={{ color: '#FFD700', fontWeight: 'bold' }}>register</Link> to view and update your favorite recipes!
            </p>
            <div style={styles.recipeImages}>
                <div style={styles.recipeItem}>
                    <img
                        src={require('../assets/breakfast.jpg')}
                        alt="Breakfast"
                        style={styles.recipeImage}
                    />
                    <h3 style={styles.label}>Breakfast</h3>
                </div>
                <div style={styles.recipeItem}>
                    <img
                        src={require('../assets/lunch.jpg')}
                        alt="Lunch"
                        style={styles.recipeImage}
                    />
                    <h3 style={styles.label}>Lunch</h3>
                </div>
                <div style={styles.recipeItem}>
                    <img
                        src={require('../assets/dinner.jpg')}
                        alt="Dinner"
                        style={styles.recipeImage}
                    />
                    <h3 style={styles.label}>Dinner</h3>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
