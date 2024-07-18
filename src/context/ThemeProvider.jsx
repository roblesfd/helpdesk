import { useEffect, useState } from "react";
import ThemeContext from "./themeContext";

const ThemeProvider = ({ children }) => {
  const themeStorage =
    typeof localStorage !== "undefined" && localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : false;
  const [darkTheme, setDarkTheme] = useState(themeStorage);
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    setRenderComponent(true);
  }, []);

  if (!renderComponent) return <></>;

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""} min-h-screen`}>
        <div className="dark:text-primary-50 text-primary-960 dark:bg-primary-970 ">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
