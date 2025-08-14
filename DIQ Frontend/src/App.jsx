import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import './cssFiles/App.css'
import Register from "./register";
import Login from "./login";
import VerifyLogin from "./verifyLogin";
import Home from "./home";
import Upload_CSV from "./upload_csv";
import Show_dataset from "./show_dataset";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <VerifyLogin>
              <Home />
            </VerifyLogin>
          }
        />

        <Route
          path="/upload_data"
          element={
            <VerifyLogin>
              <Upload_CSV />
            </VerifyLogin>
          }
        />

        <Route
          path="/show_dataset/:id"
          element={
            <VerifyLogin>
              <Show_dataset />
            </VerifyLogin>
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}
export default App
