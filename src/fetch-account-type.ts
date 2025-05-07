import axios from 'axios';

export async function fetchAccountType(address: string, KEY: string) {
  const url = `https://mainnet.infura.io/v3/${KEY}`;
  const id = Math.floor(Math.random() * 10000) + 1;
  const data = JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_getCode',
    params: [address],
    id: id
  });
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url,
    headers: { },
    timeout: 3900,
    data: data
  };

  try {
    const response = await axios.request(config);
    const result = response.data.result;
    const isEOA = result === '0x';
    return JSON.stringify(isEOA);
  } catch (error) {
    console.error("ErrFetchAccountType", error);
    throw error;
  }
}