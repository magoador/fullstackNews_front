import React from 'react';
import styles from './MainSideBar.module.scss'

const MainSideBar = () => {
    return (
        <div className={styles.mainSideBar}>
            <div className={styles.category}><a href='#'>Политика</a></div>
            <div className={styles.category}><a href='#'>Политика</a></div>
            <div className={styles.category}><a href='#'>Политика</a></div>
            <div className={styles.category}><a href='#'>Политика</a></div>
        </div>
    );
};

export default MainSideBar;