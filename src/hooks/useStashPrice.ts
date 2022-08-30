import { useEffect, useState } from "react"
import { FETCH_STASH_PRICE_INTERVAL } from "src/constant";
import { getAVAXPrice } from "src/shared/services/helper";
import { getStashPriceInAvax } from "src/shared/services/infura";
import { AppState } from "src/shared/type/State/app";
import { useAppSelector } from "src/state/store";

export const useStashPrice = () => {
  const {
    avaxPrice,
    stashPrice,
  }: AppState = useAppSelector((state) => state.app);

  const [price, setPrice] = useState(stashPrice.multipliedBy(avaxPrice));
  useEffect(() => {
    const fetch = async () => {
      const avaxPrice = await getAVAXPrice();
      const stashPriceInAvax = await getStashPriceInAvax();
      setPrice(stashPriceInAvax.multipliedBy(avaxPrice))
    }

    const interval = setInterval(fetch, FETCH_STASH_PRICE_INTERVAL)
    return () => { clearInterval(interval) }
  }, [])

  return price;
}