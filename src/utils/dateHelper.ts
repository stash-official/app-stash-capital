export const DEFAULT_TIME = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function getUTCDate(
  timezone: number,
  time = new Date().getTime()
): Date {
  return new Date(
    new Date(time + timezone * 3600 * 1000).toUTCString().replace(/ GMT$/, "")
  );
}

export function generateTimeDisplay(endate: Date, timezone?: number) {
  const targetDate = endate.getTime();
  const rightJustNow = new Date().getTime();

  const runway = targetDate - rightJustNow;

  const stateObj = {
    days: Math.floor(runway / (1000 * 60 * 60 * 24)),
    hours: Math.floor((runway % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((runway % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((runway % (1000 * 60)) / 1000),
  };

  if (
    stateObj.days <= 0 &&
    stateObj.hours <= 0 &&
    stateObj.minutes <= 0 &&
    stateObj.seconds <= 0
  ) {
    return {
      format: DEFAULT_TIME,
      time: runway,
    };
  }

  return {
    format: stateObj,
    time: runway,
  };
}
