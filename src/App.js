import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import MainSchiffPage from "./components/MainSchiffPage/MainSchiffPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/schiffcoin" element={<MainSchiffPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
