import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Tips from "./pages/Tips";
import Guides from "./pages/Guides";
import ShareTip from "./pages/ShareTip";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="tips" element={<Tips />} />
          <Route path="guides" element={<Guides />} />
          <Route path="share" element={<ShareTip />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
