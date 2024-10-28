import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import Navbar from './components/Navbar'; 
//import Recipelist from './components/RecipeForm';
import HomePage from './components/HomePage';

function App() {
    return (
        <Router>
            <div>
               
                <Routes>
                    <Route path="/" element={<HomePage />} />
                   
                </Routes>
            </div>
        </Router>
    );
}

export default App;
