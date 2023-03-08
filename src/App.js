import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NewsHeader from "./components/header";
import Admin from "./pages/Admin/Admin";
import CurrentNews from "./pages/currentNews";
import News from "./pages/Main/";

function App() {
  const isAdmin = useSelector((state) => state.users.isAdmin);
  console.log(isAdmin);  
  if (isAdmin) {
    return (
      <div className="App">
        <NewsHeader />
        <Routes>
          <Route path="/news" element={<News />} />
          <Route path="/news/:category" element={<News />} />
          <Route path="/currentNews/:newsId" element={<CurrentNews />} />
          <Route path="/news/admin" element={<Admin />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="App">
      <NewsHeader />
      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/news/:category" element={<News />} />
        <Route path="/currentNews/:newsId" element={<CurrentNews />} />
        <Route path="/news/admin" element={<Navigate to='/news'/>} />
      </Routes>
    </div>
  );
}

export default App;
