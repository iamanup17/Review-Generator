import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ReviewPage from "./components/ReviewPage";
import { GlobalStyle } from "./styles";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
         <Routes>
      {/* Full route with category and businessId */}
      <Route path="/review/:category/:businessId" element={<ReviewPage />} />

      {/* Partial route: only category */}
      <Route path="/review/:category" element={<ReviewPage />} />

      {/* /review root */}
      <Route path="/review" element={<ReviewPage />} />

      {/* Home or root */}
      <Route path="/" element={<ReviewPage />} />

      {/* Optional: catch-all 404 */}
      <Route path="*" element={<ReviewPage />} />
    </Routes>
      </Router>
    </>
  );
}

export default App;
