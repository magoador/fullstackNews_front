import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import {
  addNews,
  deleteNewsById,
  fetchNews,
  getNewsById,
  patchNewsById,
} from "../../redux/slices/newsSlice";

import styles from "./Admin.module.scss";

const Admin = () => {
  const dispatch = useDispatch();

  const [openCategoriesList, setOpenCategoriesList] = React.useState(false);
  const [newsId, setNewsId] = React.useState("");
  const [img, setImg] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [idForFindNews, setIdForFindNews] = React.useState("");
  const [action, setAction] = React.useState("POST");

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

  const handlePatchNews = () => {
    dispatch(patchNewsById({ id: newsId, img, name, description, category }));
    formClear();
    setIdForFindNews("");
  };

  const handleFindNews = () => {
    dispatch(getNewsById(idForFindNews));
    if (newsState.currentNews) {
      setNewsId(newsState.currentNews._id);
      setImg(newsState.currentNews.img);
      setName(newsState.currentNews.name);
      setDescription(newsState.currentNews.description);
      setCategory(newsState.currentNews.category);
    }
  };

  const handleDeleteNews = () => {
    dispatch(deleteNewsById(idForFindNews));
    setIdForFindNews("");
  };

  const handleChangeAction = (newAction) => {
    setAction(newAction);
    setIdForFindNews("");
  };

  const handleDisabledButton = () => {
    if (!img || !name || !description || !category) {
        return true
    }
    return false
  }

  return (
    <div className={styles.admin}>
      <button
        onClick={() => handleChangeAction("POST")}
        className={styles.postNewsButton}
      >
        Добавить новость
      </button>
      <button
        onClick={() => handleChangeAction("PATCH")}
        className={styles.postNewsButton}
      >
        Изменить новость
      </button>
      <button
        onClick={() => handleChangeAction("DELETE")}
        className={styles.postNewsButton}
      >
        Удалить новость
      </button>
      {action === "POST" && (
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
          <button onClick={handleAddNews} disabled={handleDisabledButton()}>Добавить новость</button>
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
      {action === "PATCH" && (
        <div className={styles.addNewsForm}>
          <div className={styles.findNewsText}>
            Для начала найдите новость которую хотите изменить.
          </div>
          <div className={styles.findNews}>
            <div className={styles.inputDescription}>
              Введите id новости, которую хотите найти
            </div>
            <input
              type="text"
              placeholder="Введите id новости"
              value={idForFindNews}
              onChange={(e) => setIdForFindNews(e.target.value)}
            />
            <span>6408914430146b5188358684</span>
            <div className={styles.findNewsButton}>
              <button onClick={handleFindNews} disabled={!idForFindNews}>Найти новость</button>
            </div>
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
          <button onClick={handlePatchNews} disabled={handleDisabledButton()}>
            Изменить новость
          </button>
        </div>
      )}
      {action === "DELETE" && (
        <div className={styles.addNewsForm}>
          <div className={styles.findNews} style={{ marginBottom: 10 }}>
            <div className={styles.inputDescription}>
              Введите id новости, которую хотите удалить
            </div>
            <input
              type="text"
              placeholder="Введите id новости"
              value={idForFindNews}
              onChange={(e) => setIdForFindNews(e.target.value)}
            />
            <span>6408914430146b5188358684</span>
          </div>
          <button onClick={handleDeleteNews} disabled={!idForFindNews}>
            Удалить новость
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
