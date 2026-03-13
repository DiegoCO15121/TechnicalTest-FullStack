import LoginPage from "@/pages/auth/LoginPage";
import HomePage from "@/pages/home/HomePage";
import AuthGuard from "./Guards/AuthGuard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path="/auth/login" />

        <Route element={<AuthGuard />}>
          <Route element={<HomePage />} path="/home" />
        </Route>

        <Route path="/" element={<Navigate to={"/auth/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
