import React from "react";

import styles from "./Header.module.scss";
import userLogin from "../../assets/img/userLogin.png";
import { Link } from "react-router-dom";

const NewsHeader = () => {
  return (
    <div className={styles.newsHeader}>
      <div className={styles.newsLink}>
        <Link to="http://localhost:3000/news">Новости</Link>
      </div>
      <div className={styles.newsAuthorization}>
        <img width={30} src={userLogin} alt="" />
      </div>
    </div>
  );
};

export default NewsHeader;
