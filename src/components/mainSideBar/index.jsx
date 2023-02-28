import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCategories } from "../../redux/slices/categoriesSlice";

import styles from "./MainSideBar.module.scss";

const MainSideBar = () => {
  const dispatch = useDispatch()
  
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  let categories = useSelector((state) => state.categories.categories);

  return (
    <div className={styles.mainSideBar}>
      {categories.map((category, index) => {
        return (
          <div className={styles.category} key={index}>
            <Link to={`http://localhost:3000/news/${category.name}`}>{category.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default MainSideBar;
