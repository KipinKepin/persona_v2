import CustomerList from "./pages/CustomerList";
import CustomerSegmentationDetail from "./pages/CustomerSegmentationDetail";
import Segmentation from "./pages/Segmentation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Segmentation />} />
        <Route path="/segment-customers/:id" element={<CustomerList />} />
        <Route
          path="/segment-customers/:id/detail"
          element={<CustomerSegmentationDetail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
