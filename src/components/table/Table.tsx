import React, {Dispatch, ReactElement, SetStateAction, useEffect, useReducer, useState} from 'react';
import styles from './Table.module.scss';
import {
    createRows,
    filterContextTestsByName,
} from './helpers/helpers';
import {getData} from '../../core/helpers';
import {NoResults} from '../noResults/NoResults';
import {ActionTypes, Data, rowsReducer} from './reducer';

export interface TableProps {
    searchWord: string,
    setSearchWord: Dispatch<SetStateAction<string>>;
    setCountOfFoundedTests: Dispatch<SetStateAction<number | null>>
}

export const Table = (props: TableProps): ReactElement => {
    const [tests, setTests] = useState([]);
    const [sites, setSites] = useState([]);
    const initialState: Data = {rows: [], sortDirection: true};
    const [state, dispatch] = useReducer(
        rowsReducer,
        initialState
    );

    useEffect(() => {
        Promise.all([
            getData('http://localhost:3100/sites'),
            getData('http://localhost:3100/tests'),
        ])
            .then(([sites, tests]) => {
                setSites(sites);
                setTests(tests);
                props.setCountOfFoundedTests(tests.length);
                return [sites, tests];
            })
    }, []);

    useEffect(() => {
        if (tests && sites) {
            filterContextTestsByName(tests, props.searchWord)
                .then((tests) => {
                    props.setCountOfFoundedTests(tests.length);
                    createRows(tests, sites!)
                        .then((result) => {
                            dispatch({type: ActionTypes.added, rows: result})
                        });
                })
            ;
        }
    }, [props.searchWord, sites, tests]);

    return (
        <>
            {state.rows.length === 0
                ? props.searchWord === '' ? (<h3>Loading...</h3>) : (<NoResults setSearchWord={props.setSearchWord}/>)
                : (
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th className={styles.tableHeader}
                                onClick={() => dispatch({type: ActionTypes.sortedByName})}>
                                Name
                            </th>
                            <th onClick={() => dispatch({type: ActionTypes.sortedByType})}>
                                Type
                            </th>
                            <th onClick={() => dispatch({type: ActionTypes.sortedByStatus})}>
                                Status
                            </th>
                            <th onClick={() => dispatch({type: ActionTypes.sortedBySiteName})}>
                                Site
                            </th>
                        </tr>
                        </thead>
                        <tbody>{state.rows}</tbody>
                    </table>
                )
            }
        </>
    );
}
