import React from "react";

import styles from "./Header.module.scss";
import userLogin from "../../assets/img/userLogin.png";

const NewsHeader = () => {
  return (
    <div className={styles.newsHeader}>
      <div className={styles.newsLink}>
        <a href="http://localhost:3000/">Новости</a>
      </div>
      <div className={styles.newsAuthorization}>
        <img width={30} src={userLogin} alt="" />
      </div>
    </div>
  );
};

export default NewsHeader;
