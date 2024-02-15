import React, {Dispatch, ReactElement, SetStateAction} from 'react';
import styles from './NoResults.module.scss';

interface NoResultsProps {
    setSearchWord: Dispatch<SetStateAction<string>>;
}

export const NoResults = (props: NoResultsProps): ReactElement => {
    return (
        <div className={styles.container}>
            <p className={styles.message}>Your search did not match any results.</p>
            <button className={styles.resetButton} onClick={() => {
                props.setSearchWord('');
            }
            }>Reset
            </button>
        </div>
    );
}
