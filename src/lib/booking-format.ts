export const formatBookingDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatMoney = (amount: number) =>
  `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const bookingCode = (id: string) => `SD-${id.slice(-5).toUpperCase()}`;

export const shortLocation = (location: string) =>
  location.split(",").slice(-2).join(",").trim();
