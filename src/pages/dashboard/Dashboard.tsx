import React, {ReactElement, useState} from 'react';
import styles from './Dashboard.module.scss';
import {SearchField} from '../../components/searchField/SearchField';
import {Table} from '../../components/table/Table';

export const Dashboard = (): ReactElement => {
    const [searchWord, setSearchWord] = useState('');
    const [countOfFoundedTests, setCountOfFoundedTests] = useState<number | null>(null);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Dashboard</h1>
            <main>{
                <>
                    <SearchField searchWord={searchWord}
                                 setSearchWord={setSearchWord}
                                 countOfFounded={countOfFoundedTests}/>
                    <Table searchWord={searchWord} setSearchWord={setSearchWord}
                           setCountOfFoundedTests={setCountOfFoundedTests}/>
                </>
            }
            </main>
        </div>
    );
}
