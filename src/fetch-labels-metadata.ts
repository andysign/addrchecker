import axios from 'axios';

export async function fetchLabelsMetadata(address: string, KEY: string) {
  const url = `https://api.chainbase.online/v1/address/labels` +
    `?chain_id=1&address=${address}`;
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      'x-api-key': KEY
    },
    timeout: 3900
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;
    const labels = data[address.toLowerCase()];
    const parseAndConvert = (jsonData: any) => {
      return jsonData?.map((item: any) => {
        const category = item.category;
        const tags = item.tags;
        const processedCategory = 'CATEG_' + category.split(' ').join('_').toUpperCase();
        const processedTags = tags.map((tag: any) => 'TAGS_' + tag.split(' ').join('_')).join(':');
        return `${processedCategory}:${processedTags}`;
      }).join(';');
    }
    return parseAndConvert(labels);
  } catch (error) {
    console.error("ErrFetchLabelsMetadata", error);
    throw error;
  }
}