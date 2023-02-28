import { Route, Routes } from "react-router-dom";
import "./App.css";
import CurrentNews from "./pages/currentNews";
import News from "./pages/Main/";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/news/:category" element={<News />} />
        <Route path="/news/:id" element={<CurrentNews />} />
      </Routes>
    </div>
  );
}

export default App;
