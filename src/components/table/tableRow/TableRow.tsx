import React from 'react';
import {CapitalizedStatus, CapitalizedType} from '../../../types';
import styles from './../Table.module.scss';
import {TableButton} from '../tableButton/TableButton';
import {useNavigate} from 'react-router-dom';
import {getBorderColorByHash, getStatusColor} from '../helpers/helpers';


export interface TableRowProps {
    key: number;
    name: string;
    type: CapitalizedType;
    status: CapitalizedStatus;
    siteName: string;
    testId: number;
    borderColor: string;
}

export const TableRow = (props: TableRowProps) => {
    const navigate = useNavigate();
    // useEffect(() => {
    //     console.log(`${props.testId} was updated`);
    // });

    const testId = props.testId;

    const buttonHandler = (status: CapitalizedStatus) => {
        const page = status === CapitalizedStatus.DRAFT ? 'finalize' : 'results';
        navigate(`/${page}/` + testId, {replace: true});
    }

    return (
        <tr style={styles}>
            <td style={{borderLeft: `5px solid ${getBorderColorByHash(props.siteName)}`}} className={styles.name}>{props.name}</td>
            <td className={styles.type}>{props.type}</td>
            <td style={{color: getStatusColor(props.status)}} className={styles.status}>
                {props.status}
            </td>
            <td className={styles.site}>
                {props.siteName}
            </td>
            <td>
                <TableButton handler={buttonHandler} testStatus={props.status}/>
            </td>
        </tr>
    );
};
