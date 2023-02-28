import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Routes from "./routes";
import { useTheme } from "./hooks/theme";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes />
      <Toaster position="top-right" reverseOrder={false} />
    </ThemeProvider>
  );
};

export default App;
