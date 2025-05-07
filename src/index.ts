#! /usr/bin/env node

import figlet from "figlet";
import chalk from "chalk";
import { Command } from "commander";
import { default as env } from "dotenv";
import * as fs from "fs";
import { createObjectCsvWriter } from 'csv-writer';

import { fetchBalanceNative } from "./fetch-balance-native";
import { fetchBalanceERC20s } from "./fetch-balance-erc20s";
import { fetchBalanceERC721s } from "./fetch-balance-erc721s";
import { fetchENS } from "./fetch-ens";
import { fetchLabelsMetadata } from "./fetch-labels-metadata";
import { fetchAccountType } from "./fetch-account-type";

const program = new Command();

const ADDRESS_DEFAULT = `0x${"0".repeat(40)}`;
const OUT_DEFAULT = "./out.csv";
const CONFIG_DEFAULT = "./.env";

let address = "", output = "", config = "";

let ETHERSCAN_API_KEY = "", CHAINBASE_API_KEY = "", ALCHEMY_API_KEY = "", INFURA_API_KEY = "";

program
  .version('1.0.0', '-v, --version', 'output the current version')
  .description(
    figlet.textSync("AddrChecker") + "\n" +
    "Checks the metadata of an 0x address and saves the data in a CSV"
  )
  .argument('<address>', 'Specify the required 42-length address, e.g: ' + ADDRESS_DEFAULT)
  .option('-c, --config [config]', 'Specify the config file path (default .env)')
  .option('-o, --output [output]', 'Specify the output file (default out.csv)')
  .parse(process.argv);

const options = program.opts();

const args = program.args;
address = args[0];
if (address && address.length !== 42) {
  console.error(chalk.red("Error: Address must be exactly 42 characters long."));
  process.exit(1);
}

config = options.config ? options.config : CONFIG_DEFAULT;

output = options.output ? options.output : OUT_DEFAULT;

if (fs.existsSync(config)) { env.config({ path: config }) }
else {
  console.error("CannotFindCfgFile");
}

async function fetchAndSave() {
  if (process.env.ETHERSCAN_API_KEY) ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
  if (process.env.CHAINBASE_API_KEY) CHAINBASE_API_KEY = process.env.CHAINBASE_API_KEY;
  if (process.env.ALCHEMY_API_KEY) ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  if (process.env.INFURA_API_KEY) INFURA_API_KEY = process.env.INFURA_API_KEY;
  const promiseArr = [
    fetchBalanceNative(address, ETHERSCAN_API_KEY),
    fetchBalanceERC20s(address /*, CHAINBASE_API_KEY*/),
    fetchBalanceERC721s(address, ALCHEMY_API_KEY),
    fetchENS(address, ALCHEMY_API_KEY),
    fetchLabelsMetadata(address, CHAINBASE_API_KEY),
    fetchAccountType(address, INFURA_API_KEY),
  ];

  const result = await Promise.all(promiseArr);

  // const result = [
  //   '9.166564326948819435ETH',
  //   'LPT:2.138487312887138189;OMG:46.214859429674783871;XDATA:118.825549636387764898',
  //   '64NFTs',
  //   'gemini.eth',
  //   'CATEG_CEX_USERS:TAGS_Gemini_User;CATEG_INSTITUTION:TAGS_Gemini_Deployer_2;CATEG_SOCIAL:TAGS_gusd.eth',
  //   'true'
  // ]

  const [balEth, balERC20s, balNFTs, ensDomain, metadataList, isEOA] = result;
  const csvWriter = createObjectCsvWriter({
    path: output,
    header: [
      { id: 'balEth', title: 'Balance(Ether)' },
      { id: 'balERC20s', title: 'BalanceFirst3tkns(ERC20s)' },
      { id: 'balNFTs', title: 'BalanceNFTs(count)' },
      { id: 'ensDomain', title: 'ENSdomainName(.ens)' },
      { id: 'metadataList', title: 'MetaDataTags(list)' },
      { id: 'isEOA', title: 'IsExternallyOwnOrContract(bool)' },
    ],
  });
  try {
    await csvWriter.writeRecords([
      { balEth, balERC20s, balNFTs, ensDomain, metadataList, isEOA }
    ]);
  } catch (e) {
    console.error("ErrorSavingCsv ", e);
    throw e;
  }
  return "PATH: " + output;
}

fetchAndSave().then(console.log).catch(e=>console.error(e));
