import {Dispatch, ReactElement, SetStateAction} from 'react';
import styles from './SearchField.module.scss';

export interface SearchFieldProps {
    searchWord: string,
    setSearchWord: Dispatch<SetStateAction<string>>;
    countOfFounded: number | null,
}

export const SearchField = (props: SearchFieldProps): ReactElement => {
    return (<>
            <div className={styles.form}>
                <img src={process.env.PUBLIC_URL + '/assets/search.svg'} alt="search icon"
                     className={styles.search}></img>
                <input
                    value={props.searchWord}
                    name="s" placeholder="What test are you looking for?"
                    type="search" className={styles.input}
                    onChange={(e) => {
                        props.setSearchWord(e.target.value);
                    }
                    }>
                </input>
                <span className={styles.counter}>{props.countOfFounded} tests</span>
            </div>
        </>
    );
}
