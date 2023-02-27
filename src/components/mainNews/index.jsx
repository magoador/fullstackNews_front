import React from "react";
import styles from "./MainNews.module.scss";

const MainNews = () => {
  return (
    <div className={styles.mainNews}>
      <div className={styles.news}>
        <div className={styles.newsImg}>
          <img
            width={400}
            src="https://s0.rbk.ru/v6_top_pics/resized/1440xH/media/img/6/38/756693910339386.jpg"
            alt=""
          />
        </div>
        <div className={styles.newsInfo}>
          <div className={styles.newsName}>Новость 1</div>
          <div className={styles.newsDescription}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
            distinctio veritatis quo iste nulla porro cumque sunt nobis beatae,
            similique consequuntur autem a illum, qui rem impedit sapiente
            dolorum. Tempore?
          </div>
          <div className={styles.newsButton}>
            <button>Перейти к новости</button>
          </div>
        </div>
      </div>
      <div className={styles.news}>
        <div className={styles.newsImg}>
          <img
            width={400}
            src="https://s0.rbk.ru/v6_top_pics/resized/1440xH/media/img/6/38/756693910339386.jpg"
            alt=""
          />
        </div>
        <div className={styles.newsInfo}>
          <div className={styles.newsName}>Новость 1</div>
          <div className={styles.newsDescription}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
            distinctio veritatis quo iste nulla porro cumque sunt nobis beatae,
            similique consequuntur autem a illum, qui rem impedit sapiente
            dolorum. Tempore?
          </div>
          <div className={styles.newsButton}>
            <button>Перейти к новости</button>
          </div>
        </div>
      </div>
      <div className={styles.news}>
        <div className={styles.newsImg}>
          <img
            width={400}
            src="https://s0.rbk.ru/v6_top_pics/resized/1440xH/media/img/6/38/756693910339386.jpg"
            alt=""
          />
        </div>
        <div className={styles.newsInfo}>
          <div className={styles.newsName}>Новость 1</div>
          <div className={styles.newsDescription}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
            distinctio veritatis quo iste nulla porro cumque sunt nobis beatae,
            similique consequuntur autem a illum, qui rem impedit sapiente
            dolorum. Tempore?
          </div>
          <div className={styles.newsButton}>
            <button>Перейти к новости</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNews;
