import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./pages/Signin";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="signin" element={<Signin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
