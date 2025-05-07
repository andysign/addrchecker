import axios from 'axios';

export async function fetchENS(address: string, KEY: string) {
  const contractResolverAddr = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
  const url = `https://eth-mainnet.g.alchemy.com/nft/v3/${KEY}/getNFTsForOwner` +
    `?owner=${address}&contractAddresses[]=${contractResolverAddr}`;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: { },
    timeout: 2900
  };

  try {
    const response = await axios.request(config);
    if (response.data.ownedNfts && response.data.ownedNfts.length > 0) {
      return response.data.ownedNfts[0].name;
    } else {
      return 'N/A';
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
