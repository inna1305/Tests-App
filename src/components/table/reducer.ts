import {sortByAlphabet, sortByStatus} from './helpers/sortHelpers';
import {ReactElement} from 'react';

export enum ActionTypes {
    sortedByName = 'sortedByName',
    sortedByType = 'sortedByType',
    sortedByStatus = 'sortedByStatus',
    sortedBySiteName = 'sortedBySiteName',
    added = 'added'
}

interface RowsAction {
    type: ActionTypes,
    rows?: ReactElement[]
}

export interface Data {
    rows: ReactElement[],
    sortDirection: boolean
}

export function rowsReducer(data: Data, action: RowsAction): Data {
    switch (action.type) {
        case 'sortedByName': {
            const newRows = [...data.rows];
            const sorted = sortByAlphabet(newRows, 'name', data.sortDirection);
            return {rows: sorted, sortDirection: !data.sortDirection};
        }
        case 'sortedByType': {
            const newRows = [...data.rows];
            const sorted = sortByAlphabet(newRows, 'type', data.sortDirection);
            return {rows: sorted, sortDirection: !data.sortDirection};
        }
        case 'sortedByStatus': {
            const newRows = [...data.rows];
            const sorted = sortByStatus(newRows, data.sortDirection);
            return {rows: sorted, sortDirection: !data.sortDirection};
        }
        case 'sortedBySiteName': {
            const newRows = [...data.rows];
            const sorted = sortByAlphabet(newRows, 'siteName', data.sortDirection);
            return {rows: sorted, sortDirection: !data.sortDirection};
        }
        case 'added': {
            return {rows: [...(action.rows || [])], sortDirection: data.sortDirection}
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
