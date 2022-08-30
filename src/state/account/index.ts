import { createSlice } from "@reduxjs/toolkit";
import { initialAccountState } from "./detailsState";
import { AccountState } from "src/shared/type/State/account";
import { getAccountInfo } from "src/shared/services/helper";

const initialState: AccountState = initialAccountState;

export const fetchAccountData = (address: string) => async (dispatch: any) => {
  const info = await getAccountInfo(address);

  dispatch(
    setAccountDataContract({
      info
    })
  );
};

export const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountDataContract: (state, action) => {
      const payload = action?.payload || {};
      state.info = payload?.info;

      return state;
    },
  },
  extraReducers: (builder) => { },
});

// Actions
export const { setAccountDataContract } = AccountSlice.actions;

export default AccountSlice.reducer;
