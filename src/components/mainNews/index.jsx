import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchNews } from "../../redux/slices/newsSlice";
import styles from "./MainNews.module.scss";

const MainNews = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const { category } = useParams();

  const news = useSelector((state) =>
    state.news.news.filter((news) => {
      if (!category) return true;

      return news.category.name === category;
    })
  );

  return (
    <div className={styles.mainNews}>
      {news.map((news) => {
        return (
          <div className={styles.news} key={news._id}>
            <div className={styles.newsImg}>
              <img
                width={400}
                height={250}
                src={`http://localhost:4000/${news.img}`}
                alt=""
              />
            </div>
            <div className={styles.newsInfo}>
              <div className={styles.newsName}>{news.name}</div>
              <div
                className={styles.newsDescription}
              >{`${news.description.slice(0, 140)}...`}</div>
              <div className={styles.newsButton}>
                <Link><button>Перейти к новости</button></Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainNews;
