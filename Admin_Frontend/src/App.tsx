import { useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import { ThemeState } from "./features/theme/themeTypes";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Sales from "./pages/Sales";
import AddProduct from "./pages/AddProduct";
import Analytics from "./pages/Analytics";
// import Sittings
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import theme from "./components/MUI/Theme";
import { ThemeProvider } from "@mui/material";
import ToastContainerComponent from "./components/UI/Notification";

function App() {
  const isDarkMode = useSelector(
    (state: { theme: ThemeState }) => state.theme.isDarkMode
  );

  const { light, dark } = useSelector(
    (state: { theme: ThemeState }) => state.theme
  );

  return (
    <div className={`overflow-x-hidden  ${isDarkMode ? dark : light}   `}>
     <ToastContainerComponent/>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin", "manager"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/Products-add"
            element={
              // <PrivateRoute allowedRoles={["admin", "manager"]}>
              <AddProduct />
              // </PrivateRoute>
            }
          />
          <Route path="/sales" element={<Sales />} />
          <Route path="/analytic" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
