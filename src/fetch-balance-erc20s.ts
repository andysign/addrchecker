import axios from 'axios'; // FromPostmanSnippet

import { BN } from "bn.js";

export async function fetchBalanceERC20s(address: string, KEY: string) {
  const formatBalance = (balance: any, dec: any) => {
    const ten = new BN(10);
    const { div, mod } = balance.divmod(ten.pow(new BN(dec)));
    return `${div.toString()}.${mod.toString()}`;
  }
  let url = `https://eth.blockscout.com/api/v2/addresses/${address}/tokens?type=ERC-20`;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: { },
    timeout: 2900
  };
  // const url = `https://api.chainbase.online/v1/account/tokens` +
  //   `?limit=3&page=1&chain_id=1&address=${address}`;
  // let config = {
  //   method: 'get',
  //   maxBodyLength: Infinity,
  //   url: url,
  //   headers: {
  //     'x-api-key': KEY
  //   },
  //   timeout: 1900
  // };
  try {
    const response = await axios.request(config);
    const items = response.data.items;
    const firstThreeItems = items.slice(0, 3);
    const formattedBalances = firstThreeItems.map((token: any) => {
      const bal = new BN(token.value);
      const dec = token.token.decimals;
      const sym = token.token.symbol;
      const balStr = formatBalance(bal, dec);
      return `${sym}:${balStr}`
    }).join(';');
    return formattedBalances;
  } catch (error) {
    console.error("ErrFetchBalErc20s" + error);
    throw error;
  }
}
