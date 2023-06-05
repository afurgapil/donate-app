import React from "react";
import Header from "./components/Header";
import "./style/App.scss";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
