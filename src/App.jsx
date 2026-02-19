import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Borrowing from "./pages/Borrowing";
import Repayment from "./pages/Repayment";
import Refinance from "./pages/Refinance";
import Stamp from "./pages/Stamp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Navigate to="/borrowing" />} />

        <Route path="/borrowing" element={<Borrowing />} />
        <Route path="/repayment" element={<Repayment />} />
        <Route path="/refinance" element={<Refinance />} />
        <Route path="/stamp" element={<Stamp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
