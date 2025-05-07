import axios from 'axios'; // FromPostmanSnippet

import { BN } from "bn.js";

export async function fetchBalanceNative(address: string, KEY: string) {
  const formatBalance = (balance: any) => {
    const oneEth = new BN(`1${"0".repeat(18)}`);
    const { div, mod } = balance.divmod(new BN(oneEth));
    return `${div.toString()}.${mod.toString()}`;
  }
  const url = `https://api.etherscan.io/v2/` +
    `api?chainid=1&module=account&action=balance&` +
    `address=${address}&tag=latest&apikey=${KEY}`;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: { },
    timeout: 2900
  };
  try {
    const response = await axios.request(config);
    const balanceWei = new BN(response.data.result);
    return `${formatBalance(balanceWei)}ETH`;
  } catch (error) {
    console.error("ErrFetchBalanceNative " + error);
    throw error;
  }
}
