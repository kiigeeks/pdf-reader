import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import PDFReader from "./components/pdf-reader/PDFReader";
import Flip from "./components/flipbook/Flip";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/pdf" element={<PDFReader />}></Route>
        <Route path="/flipbook" element={<Flip />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
