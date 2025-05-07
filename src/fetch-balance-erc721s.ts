import axios from 'axios'; // FromPostmanSnippet

export async function fetchBalanceERC721s(address: string, KEY: string) {
  let data = `owner=${address}`;
  let url =
    `https://eth-mainnet.g.alchemy.com/nft/v3/${KEY}/getNFTsForOwner?owner=${address}`
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: { },
    timeout: 3900,
    data : ""
  };

  try {
    const response = await axios.request(config);
    const nfts = response.data.totalCount || 0;
    return `${nfts}NFTs`;
  }
  catch (error) {
    console.log("ErrorFetchBalanceErc721s", error);
    throw error;
  }
}
