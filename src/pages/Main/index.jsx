import React from "react";
import MainNews from "../../components/mainNews";
import MainSideBar from "../../components/mainSideBar";

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
