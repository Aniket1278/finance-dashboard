export const fmt = (n) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(n);
};

export const fmtDate = (d) => {
  return new Date(d).toLocaleDateString("en-IN");
};