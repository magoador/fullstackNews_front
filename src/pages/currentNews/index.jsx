import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NewsHeader from "../../components/header";
import { addComment, fetchNews } from "../../redux/slices/newsSlice";
import { fetchUsers } from "../../redux/slices/usersSlice";
import styles from "./CurrentNews.module.scss";

const CurrentNews = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { newsId } = useParams();
  const currentNews = useSelector((state) => state.news.news).find(
    (news) => news._id === newsId
  );

  const users = useSelector((state) => state.users);

  const [commentText, setCommentText] = React.useState("");

  const handleSendComment = (commentText) => {
    function parseJwt(token) {
      let base64Url = token.split(".")[1];
      let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      let jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    }
    const userId = parseJwt(users.token);
    dispatch(addComment({ text: commentText, newsId, userId: userId.id }));
    setCommentText("");
  };

  const handleOnChangeTextArea = (text) => {
    setCommentText(text);
  };

  if (!currentNews) {
    return "Loading...";
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
        users.token ? (
          <div className={styles.comments}>
            <span>Комментарии:</span>
            {currentNews.comments.map((comment, index) => {
              const user = users.users.find(
                (user) => user._id === comment.user
              );
              return (
                <div className={styles.comment} key={index}>
                  <div className={styles.commentUser}>{user.firstName}</div>
                  <div className={styles.commentText}>{comment.text}</div>
                </div>
              );
            })}
            <div className={styles.addCommentText}>Оставить комментарий</div>
            <textarea
              name=""
              value={commentText}
              onChange={(e) => handleOnChangeTextArea(e.target.value)}
              id={styles.textarea}
              cols="30"
              rows="5"
            ></textarea>
            <div className={styles.sendComment}>
              <button
                disabled={!commentText}
                onClick={() => handleSendComment(commentText)}
              >
                Отправить
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.comments}>
            <span>Комментарии:</span>
            {currentNews.comments.map((comment, index) => {
              const user = users.users.find(
                (user) => user._id === comment.user
              );
              return (
                <div className={styles.comment} key={index}>
                  <div className={styles.commentUser}>{user.firstName}</div>
                  <div className={styles.commentText}>{comment.text}</div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        users.token && (
          <div
            style={{ marginBottom: 80, textAlign: "center" }}
            className={styles.comments}
          >
            <span>Комментариев нет</span>
            <div className={styles.addCommentText}>Оставить комментарий</div>
            <textarea
              name=""
              value={commentText}
              onChange={(e) => handleOnChangeTextArea(e.target.value)}
              id={styles.textarea}
              cols="30"
              rows="5"
            ></textarea>
            <div className={styles.sendComment}>
              <button
                disabled={!commentText}
                onClick={() => handleSendComment(commentText)}
              >
                Отправить
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CurrentNews;
