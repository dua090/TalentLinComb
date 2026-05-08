import {
  useEffect,
  useState,
} from "react";

const useDarkMode = () => {

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {

    const updateDarkMode =
      () => {

        setDarkMode(
          document.documentElement.classList.contains(
            "dark"
          )
        );
      };

    updateDarkMode();

    const observer =
      new MutationObserver(
        updateDarkMode
      );

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    );

    return () => {
      observer.disconnect();
    };

  }, []);

  return darkMode;
};

export default useDarkMode;