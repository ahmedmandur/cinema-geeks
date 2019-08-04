export const moneySpace = money => {
  let parts = money.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

export const convertMinsToHrsMins = mins => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? h : h;
  m = m < 10 ? "0" + m : m;
  return `${h} Hours, ${m} Minutes`;
};

export const urlSlug = title => {
  return title
    .trim()
    .toLowerCase()
    .split(" ")
    .join("-");
};
