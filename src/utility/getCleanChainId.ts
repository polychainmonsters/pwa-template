export const getCleanChainId = (
  chainId: string | number | undefined | null
): number => {
  return parseInt(`${chainId}`.replace("eip155:", ""));
};

export const getCleanChainIdString = (
  chainId: string | number | undefined | null
): string => {
  return `${getCleanChainId(chainId)}`;
};
