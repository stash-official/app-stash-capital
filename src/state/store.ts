import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppState } from "src/shared/type/State/app";
import appReducer from "./app";
import accountReducer from "./account";
import { AccountState } from "src/shared/type/State/account";

const store = configureStore({
  reducer: {
    app: appReducer,
    account: accountReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<{
  app: AppState,
  account: AccountState
}> = useSelector;

export default store;
