import React, {Dispatch, ReactElement, SetStateAction, useContext, useEffect, useReducer, useState} from 'react';
import styles from './Table.module.scss';
import {
    createRows,
    filterContextTestsByName,
} from './helpers/helpers';
import {SearchWordContext, SitesContext, TestsContext} from '../../App';
import {getData} from '../../core/helpers';
import {sortByAlphabet, sortByStatus} from './helpers/sortHelpers';
import {NoResults} from '../noResults/NoResults';

export interface TableProps {
    setCountOfFoundedTests: Dispatch<SetStateAction<number>>
}
interface RowsAction {
    type: string,
    rows?: ReactElement[]
}
// //     name:
// //     type:
// //     status:
// //     siteName:
//

interface Data {
    rows: ReactElement[],
    sortDirection: boolean
}

function rowsReducer(data: Data, action: RowsAction): Data {
    switch (action.type) {
        case 'sortedName': {
            const newRows = [...data.rows];
            const sorted = sortByAlphabet(newRows, 'name', data.sortDirection);
            return { rows: sorted, sortDirection: !data.sortDirection };
        }
        case 'added': {
            const newRows = action.rows;
            console.log(data.rows);
            return { rows: [...(newRows || [])], sortDirection: data.sortDirection }
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

export const Table = (props: TableProps): ReactElement => {
    const testsContext = useContext(TestsContext);
    const sitesContext = useContext(SitesContext);
    const searchContext = useContext(SearchWordContext);
    const [sortDirection, setSortDirection] = useState(true);
    const [rowsElements, setRowsElements] = useState<ReactElement[]>([]);
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
                sitesContext.setSites(sites);
                testsContext.setTests(tests);
                props.setCountOfFoundedTests(tests.length);
                return [sites, tests];
            })
            .then(([sites, tests]) => createRows(tests, sites))
            .then((result) => {
                setRowsElements(result);
                dispatch({type: 'added', rows: result});
            });
    }, []);

    useEffect(() => {
        if (testsContext.tests && sitesContext.sites) {
            filterContextTestsByName(testsContext.tests, searchContext.searchWord)
                .then((tests) => {
                    props.setCountOfFoundedTests(tests.length);
                    createRows(tests, sitesContext.sites!)
                        .then((result) => {
                            setRowsElements(result);
                        });
                })
            ;
        }
    }, [searchContext.searchWord]);

    return (
        <>
            {state.rows.length === 0
                ? searchContext.searchWord === '' ? (<h3>Loading...</h3>) : (<NoResults/>)
                : (
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th className={styles.tableHeader}
                                onClick={() => {
                                    dispatch({type: 'sortedName'});
                                    // setRowsElements(sortByAlphabet(rowsElements, 'name', sortDirection));
                                    // setSortDirection(!sortDirection);
                                }}>Name
                            </th>
                            <th onClick={() => {
                                setRowsElements(sortByAlphabet(rowsElements, 'type', sortDirection));
                                setSortDirection(!sortDirection);
                            }}>Type
                            </th>
                            <th onClick={() => {
                                setRowsElements(sortByStatus(rowsElements, sortDirection));
                                setSortDirection(!sortDirection);
                            }}>
                                Status
                            </th>
                            <th onClick={() => {
                                setRowsElements(sortByAlphabet(rowsElements, 'siteName', sortDirection));
                                setSortDirection(!sortDirection);
                            }}>Site
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
