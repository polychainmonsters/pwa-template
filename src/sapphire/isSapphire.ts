import { sapphire } from "../chains.ts";

export const isSapphire = (chainId: string | number | undefined) => {
  return (
    `${chainId}` === `${sapphire.id}` ||
    `${chainId}` === `eip155:${sapphire.id}`
  );
};
