import React from 'react';
import Routes from './Routes.js';
import {HashRouter as Router} from 'react-router-dom';
import './App.css';

function App() {
    document.title = "Central Safety System";
    return (
        <Router>
            <Routes/>
        </Router>
    );
}

export default App;
