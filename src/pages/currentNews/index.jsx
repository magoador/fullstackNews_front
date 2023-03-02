import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NewsHeader from "../../components/header";
import { fetchNews } from "../../redux/slices/newsSlice";
import { fetchUsers } from "../../redux/slices/usersSlice";
import styles from "./CurrentNews.module.scss";

const CurrentNews = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentNews = useSelector((state) => state.news.news).find(
    (news) => news._id === id
  );
  const users = useSelector((state) => state.users.users);

  React.useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);
  
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);



  if(!currentNews) {
    return 'Loading...'
  }

  return (
    <div className={styles.currentNews}>
      <NewsHeader />
      <div className={styles.news} key={currentNews._id}>
        <div className={styles.newsImg}>
          <img
            width={800}
            src={`http://localhost:4000/${currentNews.img}`}
            alt=""
          />
        </div>
        <div className={styles.newsInfo}>
          <div className={styles.newsName}>{currentNews.name}</div>
          <div className={styles.newsDescription}>
            {currentNews.description}
          </div>
        </div>
      </div>
      {currentNews.comments.length ? (
        <div className={styles.comments}>
          <span>Комментарии:</span>
          {currentNews.comments.map((comment) => {
            const user = users.find((user) => user._id === comment.user);
            return (
              <div className={styles.comment} key={user._id}>
                <div className={styles.commentUser}>{user.name}</div>
                <div className={styles.commentText}>{comment.text}</div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CurrentNews;
