import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import { addNews, fetchNews } from "../../redux/slices/newsSlice";

import styles from "./Admin.module.scss";

const Admin = () => {
  const dispatch = useDispatch();

  const [openCategoriesList, setOpenCategoriesList] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");
  const [img, setImg] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [postNews, setPostNews] = React.useState(false);
  const [changeNews, setChangeNews] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchNews());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);
  const newsState = useSelector((state) => state.news);

  const handleOpenCategoriesList = () => {
    setOpenCategoriesList(!openCategoriesList);
  };

  const formClear = () => {
    setNewsId("");
    setImg("");
    setName("");
    setDescription("");
    setCategory("");
  };

  const handleAddNews = () => {
    dispatch(addNews({ img, name, description, category }));
    formClear();
  };

  const handlePostNews = () => {
    setPostNews(!postNews);
    setChangeNews(false);
  };

  const handleChangeNews = () => {
    setChangeNews(!changeNews);
    setPostNews(false);
  };

  return (
    <div className={styles.admin}>
      <button onClick={handlePostNews} className={styles.postNewsButton}>
        Добавить новость
      </button>
      <button onClick={handleChangeNews} className={styles.postNewsButton}>
        Изменить новость
      </button>
      {postNews && (
        <div className={styles.addNewsForm}>
          <div className={styles.newsImg}>
            <div className={styles.inputDescription}>Путь к изображению</div>
            <input
              type="text"
              placeholder="Введите путь к изображению"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <span>img/1.jpg</span>
          </div>
          <div className={styles.newsTitle}>
            <div className={styles.inputDescription}>Название новости</div>
            <input
              type="text"
              placeholder="Введите название новости"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span>News title 1</span>
          </div>
          <div className={styles.newsDescription}>
            <div className={styles.inputDescription}>Описание новости</div>
            <textarea
              name=""
              id=""
              cols="22"
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <span>News description 1</span>
          </div>
          <div className={styles.newsCategory}>
            <div className={styles.inputDescription}>Id категории новости</div>
            <input
              type="text"
              placeholder="Введите категорию новости"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <span>63fdb16af428fead70c73dec</span>
            <div className={styles.categoriesList}>
              <div
                className={styles.categoriesListText}
                onClick={handleOpenCategoriesList}
              >
                Список категорий
              </div>
              {openCategoriesList &&
                categories.map((category) => {
                  return (
                    <div key={category._id} className={styles.categoryRow}>
                      <div className={styles.categoryName}>{category.name}</div>
                      <div className={styles.categoryId}>{category._id}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <button onClick={handleAddNews}>Добавить новость</button>
          {newsState.addNewsMessage && (
            <div className={styles.addNewsMessage}>
              {newsState.addNewsMessage}
            </div>
          )}
          {newsState.addNewsSuccess && (
            <div className={styles.addNewsMessage}>
              {newsState.addNewsSuccess}
            </div>
          )}
        </div>
      )}
      {changeNews && (
        <div className={styles.addNewsForm}>
            <div className={styles.findNewsText}>Для начала найдите новость которую хотите изменить.</div>
            <div className={styles.findNews}>
                <div className={styles.inputDescription}>Введите id новости, которую хотите найти</div>
                <input type="text" placeholder="Введите id новости" />
                <div className={styles.findNewsButton}><button>Найти новость</button></div>
            </div>
          <div className={styles.newsId}>
            <div className={styles.inputDescription}>Id новости</div>
            <input
              type="text"
              placeholder="Введите id новости"
              value={newsId}
              onChange={(e) => setNewsId(e.target.value)}
            />
            <span>6408914430146b5188358684</span>
          </div>
          <div className={styles.newsImg}>
            <div className={styles.inputDescription}>Путь к изображению</div>
            <input
              type="text"
              placeholder="Введите путь к изображению"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <span>img/1.jpg</span>
          </div>
          <div className={styles.newsTitle}>
            <div className={styles.inputDescription}>Название новости</div>
            <input
              type="text"
              placeholder="Введите название новости"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span>News title 1</span>
          </div>
          <div className={styles.newsDescription}>
            <div className={styles.inputDescription}>Описание новости</div>
            <textarea
              name=""
              id=""
              cols="22"
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <span>News description 1</span>
          </div>
          <div className={styles.newsCategory}>
            <div className={styles.inputDescription}>Id категории новости</div>
            <input
              type="text"
              placeholder="Введите категорию новости"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <span>63fdb16af428fead70c73dec</span>
            <div className={styles.categoriesList}>
              <div
                className={styles.categoriesListText}
                onClick={handleOpenCategoriesList}
              >
                Список категорий
              </div>
              {openCategoriesList &&
                categories.map((category) => {
                  return (
                    <div key={category._id} className={styles.categoryRow}>
                      <div className={styles.categoryName}>{category.name}</div>
                      <div className={styles.categoryId}>{category._id}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <button onClick={handleAddNews}>Изменить новость</button>
          {newsState.addNewsMessage && (
            <div className={styles.addNewsMessage}>
              {newsState.addNewsMessage}
            </div>
          )}
          {newsState.addNewsSuccess && (
            <div className={styles.addNewsMessage}>
              {newsState.addNewsSuccess}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
