import axios from 'axios'; // FromPostmanSnippet

// import { BN } from "bn.js";

// const qs = require('qs');

// let data = JSON.stringify({ 'owner': '0x4c2F150Fc90fed3d8281114c2349f1906cdE5346' });

export async function fetchBalanceERC721s(address: string, KEY: string) {

const axios = require('axios');

  let data = `owner=${address}`;
  let url =
    `https://eth-mainnet.g.alchemy.com/nft/v3/${KEY}/getNFTsForOwner?owner=${address}`
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: { },
    timeout: 2900,
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

// makeRequest();

// export async function fetchBalanceERC721s(address: string, KEY: string) {
//   const url = `https://api.chainbase.online/v1/account/nfts` +
//     `?limit=3&page=1&chain_id=1&address=${address}`;
//   let config = {
//     method: 'get',
//     maxBodyLength: Infinity,
//     url: url,
//     headers: {
//       'x-api-key': KEY
//     },
//     timeout: 1900
//   };
//   try {
//     const response = await axios.request(config);
//     const formattedNumNfts = response.data.count;
//     return `${formattedNumNfts}NFTs`;
//   } catch (error) {
//     console.error("ErrFetchBalErc721s" + error);
//     throw error;
//   }
// }