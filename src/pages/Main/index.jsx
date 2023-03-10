import React from "react";
import MainNews from "../../components/MainNews";
import MainSideBar from "../../components/MainSideBar";

const News = () => {
  return (
    <div>
      <div className="mainflex">
        <MainSideBar />
        <MainNews />
      </div>
    </div>
  );
};

export default News;
