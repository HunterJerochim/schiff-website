import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainSchiffPage from "./components/MainSchiffPage/MainSchiffPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSchiffPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
