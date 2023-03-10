import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NewsHeader from "./components/Header";
import Admin from "./pages/Admin/Admin";
import CurrentNews from "./pages/CurrentNews";
import News from "./pages/Main/";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const isAdmin = useSelector((state) => state.users.isAdmin);

  if (isAdmin) {
    return (
      <div className="App">
        <NewsHeader />
        <Routes>
          <Route path="/news" element={<News />} />
          <Route path="/news/:category" element={<News />} />
          <Route path="/currentNews/:newsId" element={<CurrentNews />} />
          <Route path="/news/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
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
        <Route path="/news/admin" element={<Navigate to="/news" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
