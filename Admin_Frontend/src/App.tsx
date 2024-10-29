import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import { ThemeState } from "./features/theme/themeTypes";
import { toggleTheme } from "./features/theme/themeSlice";
import Button from "./components/UI/Button";

function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(
    (state: { theme: ThemeState }) => state.theme.isDarkMode
  );

  const {light , dark} = useSelector((state: { theme: ThemeState }) => state.theme);
  const toggleMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`  ${isDarkMode ? dark : light} `}>
      <h1>hii</h1>
      <Button onClick={toggleMode} variant="primary">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </Button>
        <Button onClick={toggleMode} variant="secondary">
          Light Theme
        </Button>
        <Button onClick={toggleMode} variant="main">
          Dark Theme
        </Button>

      <Header />
    </div>
  );
}

export default App;
