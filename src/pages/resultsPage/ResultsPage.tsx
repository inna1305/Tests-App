import React, {ReactElement, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Test} from '../../types';
import {capitalizeFirstLetter, getData} from '../../core/helpers';
import styles from './ResultsPage.module.scss';

interface ResultsPageProps {
    typeOfResultsPage: 'results' | 'finalize';
}

export const ResultsPage = (props: ResultsPageProps): ReactElement => {
    const location = useLocation();
    const navigate = useNavigate();
    const [test, setTest] = useState<Test | null>(null);

    useEffect(() => {
        const id = location.pathname.split('/').pop();
        getData(`http://localhost:3100/tests/${id}`).then((result) => setTest(result));
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{capitalizeFirstLetter(props.typeOfResultsPage)}</h1>
            <main>
                <div className={styles.name}>{test?.name}</div>
                <div className={styles.buttonContainer}>
                    <img src={process.env.PUBLIC_URL + '/assets/leftArrow.svg'} alt="left arrow icon"></img>
                    <button className={styles.button} onClick={() => navigate('/dashboard')}>Back</button>
                </div>
            </main>
        </div>);
}
