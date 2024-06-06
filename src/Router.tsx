import EntryPage from "./pages/Entry";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import FindPage from "./pages/Find";
import RegisterPage from "./pages/Register";
import MainPage from "./pages/Main";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/find" element={<FindPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}
