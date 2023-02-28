import React from 'react';
import NewsHeader from '../../components/header';

import styles from './CurrentNews.module.scss'

const CurrentNews = () => {
    return (
        <div className={styles.currentNews}>
            <NewsHeader />
        </div>
    );
};

export default CurrentNews;