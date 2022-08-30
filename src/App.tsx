import React from "react";
import { ThemeProvider } from "styled-components";
import AppRouter from "./AppRouter";
import { theme } from "./styles";
import { Web3ContextProvider } from "./hooks/web3Context";
import { colors } from "./styles/colors";
import { Provider } from "react-redux";
import store from './state/store';

const App: React.FC = () => {
  return (
    <Web3ContextProvider>
      <ThemeProvider theme={{
        colors: colors
      }}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </ThemeProvider>
    </Web3ContextProvider>
  );
};
export default App;
