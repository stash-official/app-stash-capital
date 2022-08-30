import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_TIME,
  generateTimeDisplay,
  getUTCDate,
} from "src/utils/dateHelper";

export const useTimeCounter = (
  endDate: Date,
  onChange?: (counterFormat: any) => any
) => {
  const parsedEndDate = useMemo(
    () => new Date(endDate),
    [endDate]
  );

  const [isEventEnded, setIsEventEnded] = useState(
    parsedEndDate ? new Date() > parsedEndDate : true
  );

  useEffect(() => {
    if (!parsedEndDate || new Date() > parsedEndDate) {
      setIsEventEnded(true);
    } else {
      setIsEventEnded(false);
    }
  }, [parsedEndDate]);

  useEffect(() => {
    if (!parsedEndDate) {
      return;
    }

    const interval = setInterval(() => {
      const _timeDisplay = generateTimeDisplay(parsedEndDate, 0);
      const formatTime: any = _timeDisplay["format"];
      if (formatTime === DEFAULT_TIME) {
        setIsEventEnded(true);
        onChange(DEFAULT_TIME);
        clearInterval(interval);
        return;
      }
      if (onChange) {
        onChange(_timeDisplay);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [parsedEndDate, onChange]);

  return isEventEnded;
};
