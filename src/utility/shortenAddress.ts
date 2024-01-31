export const shortenAddress = (address: string, chars = 4): string => {
  return `${address.substring(0, chars + 2)}…${address.substring(
    address.length - chars,
  )}`;
};
