import { useEffect, useState } from "react";
import { FETCH_ALL_DATA_INTERVAL } from "src/constant";
import { AppState } from "src/shared/type/State/app";
import { fetchDataContract } from "src/state/app";
import { useAppDispatch, useAppSelector } from "src/state/store";

export const useInitData = () => {

  const {
    timeNextRebase
  }: AppState = useAppSelector((state) => state.app);

  const [isDone, setIsDone] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchDataContract());
      setIsDone(true);
    }
    fetch();
    const interval = setInterval(fetch, FETCH_ALL_DATA_INTERVAL);

    return () => {
      clearInterval(interval)
    }
  }, [dispatch]);

  useEffect(() => {
    if (timeNextRebase) {
      dispatch(fetchDataContract());
    }
  }, [timeNextRebase]);

  return isDone;
}