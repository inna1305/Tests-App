import React from 'react';
import {Dashboard} from './pages/dashboard/Dashboard';
import {Navigate, Route, Routes} from 'react-router-dom';
import {ResultsPage} from './pages/resultsPage/ResultsPage';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="dashboard"/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route
                path="results/:testId"
                element={<ResultsPage typeOfResultsPage={'results'}/>}
            />
            <Route path="finalize/:testId"
                   element={<ResultsPage typeOfResultsPage={'finalize'}/>}
            />
        </Routes>
    );
}

