import React from "react";
import NewsHeader from "../../components/header";
import MainNews from "../../components/mainNews";
import MainSideBar from "../../components/mainSideBar";

const News = () => {
  return (
    <div>
      <NewsHeader />
      <div className="mainflex">
        <MainSideBar />
        <MainNews />
      </div>
    </div>
  );
};

export default News;
