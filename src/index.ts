#! /usr/bin/env node

import figlet from "figlet";
import chalk from "chalk";
import { Command } from "commander";
import { default as env } from "dotenv";
import * as fs from "fs";

import { fetchBalanceNative } from "./fetch-balance-native";

const program = new Command();

const ADDRESS_DEFAULT = `0x${"0".repeat(40)}`;
const OUT_DEFAULT = "./out.csv";
const CONFIG_DEFAULT = "./.env";

let address = "", output = "", config = "";

let ETHERSCAN_API_KEY = "";

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

async function getBalance() {
  if (process.env.ETHERSCAN_API_KEY) ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
  const promiseArr = [fetchBalanceNative(address, ETHERSCAN_API_KEY)];
  const result = await Promise.all(promiseArr);
  // await fetchBalanceNative(address, ETHERSCAN_API_KEY);
  // const result = await fetchBalanceNative(address, ETHERSCAN_API_KEY);
  console.log(result);
}

getBalance().then(console.log);
