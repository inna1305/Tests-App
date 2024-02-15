import React, {ReactElement} from 'react';
import styles from './NoResults.module.scss';

export const NoResults = (): ReactElement => {
    return (
        <div className={styles.container}>
            <p className={styles.message}>Your search did not match any results.</p>
            <button className={styles.resetButton} onClick={() => {
                //searchContext.setSearchWord('');
            }
            }>Reset
            </button>
        </div>
    );
}
