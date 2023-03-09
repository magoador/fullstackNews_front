import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.errorCode}>404</div>
      <div className={styles.errorText}>Страница не найдена</div>
      <Link to="http://localhost:3000/news">
        <div className={styles.comeHome}>Вернуться на главную</div>
      </Link>
    </div>
  );
};

export default NotFound;
