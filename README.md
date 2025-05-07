<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [AddrChecker](#addrchecker)
  - [Description](#description)
  - [Requirements](#requirements)
  - [Installation](#installation)
    - [Install Dependencies](#install-dependencies)
    - [Build the Project](#build-the-project)
    - [Install Globally](#install-globally)
  - [Usage](#usage)
  - [Options](#options)
  - [Outline Diagram](#outline-diagram)
  - [Testing](#testing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# AddrChecker

## Description

AddrChecker is a CLI tool that checks the metadata of an Ethereum address and saves the data in a CSV file. It fetches balance information ( not only the native balance of Ethereum ETH but also balance in tokens and non fungible tokens ) and also fetches information about various tags that the address might have, all using various 3rd party APIs.

Ideally, this should include more address metadata elements. Unfortunately all the address related tags and reputation scores are accessible trough the EtherScan PRO subscription only. Ideally this CLI should include such information because it is super relevant as per the description available on Etherscan Documentation website **[here](https://metadata.etherscan.io/)**: _"Address Metadata provides endpoints that return additional information for addresses, including Public Name Tags and Labels, along with extra attributes like ENS and Token Reputation. This feature is available exclusively through the API Pro Plus plan."_

In addition to this other things could be added like the value of all the tokens owned by the user(s), be it fungible or non fungible tokens. Also, weather or not if it is a smart contract, if the code is verified as in available to see or only the binary code is available. Other things could be added like: Funded By, Transaction Sent Last, Transaction Sent First, Internal Transactions, Erc-20 Transactions, etc.

```
❯ addrchecker --help
     _       _     _       ____ _               _
    / \   __| | __| |_ __ / ___| |__   ___  ___| | _____ _ __
   / _ \ / _` |/ _` | '__| |   | '_ \ / _ \/ __| |/ / _ \ '__|
  / ___ \ (_| | (_| | |  | |___| | | |  __/ (__|   <  __/ |
 /_/   \_\__,_|\__,_|_|   \____|_| |_|\___|\___|_|\_\___|_|

Checks the metadata of an 0x address and saves the data in a CSV

Arguments:
  address                Specify the required 42-length address, e.g: 0x0000000000000000000000000000000000000000

Options:
  -v, --version          output the current version
  -c, --config [config]  Specify the config file path (default .env)
  -o, --output [output]  Specify the output file (default out.csv)
  -h, --help             display help for command
```

---

## Requirements

What's needed:

- Node.js v22.13.0 or higher
- NPM v11.3.0 or higher
- TypeScript (installed via devDependencies)
- Required API keys for **Etherscan**, **Chainbase**, **Alchemy** and **Infura**

---

## Installation

### Install Dependencies

```bash
npm install
```

---

### Build the Project

```bash
npm run build
```

---

### Install Globally

```bash
npm install -g .
```

---

## Usage

```bash
addrchecker [options] <address>
```

**Examples:**

- Basic usage:
  ```bash
  addrchecker 0x123...abc
  ```
- Custom config and output:
  ```bash
  addrchecker 0x123...abc -c .env -o out.csv
  ```

---

## Options

- `-c, --config [config]`: Specify config file path (default: `.env`)
- `-o, --output [output]`: Specify output file (default: `out.csv`)

---

---

## Outline Diagram

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│ Input                                                   │
│                                                         │
│ 0xa1ce... ( optional, default 0x0 ) checksum later ?    │
│                                                         │
│ out.csv ( optional, default out )                       │
│                                                         │
│ config.env ( optional, default config.env ) ?           │
│                                                         │
└─────────────────────────────────────────────────────────┘

 │
 │
 ▼

┌─────────────────────────────────────────────────────────┐
│                                                         │
│ Assign global address variable ( custom or default )    │
│                                                         │
└─────────────────────────────────────────────────────────┘

 │
 │
 ▼

┌─────────────────────────────────────────────────────────┐
│                                                         │
│ Assign global outputPath variable ( custom or default ) │
│                                                         │
└─────────────────────────────────────────────────────────┘

 │
 │
 ▼

┌─────────────────────────────────────────────────────────┐
│                                                         │
│ Assign global conf variable ( custom or default ) / err │
│                                                         │
└─────────────────────────────────────────────────────────┘

 │                                    │             │                   │
 │                                    │             │                   │
 ▼                                    ▼             ▼                   ▼

┌─────────────────────────────────┐ ┌────────────┐ ┌─────────────────┐ ┌────────────┐
│                                 │ │            │ │                 │ │            │
│ Balance                         │ │ ENS domain │ │ METADATA        │ │ IF EOA wlt │
│                                 │ │            │ │                 │ │            │
│ ┌──────┐ ┌────────┐ ┌─────────┐ │ │ ┌────────┐ │ │ ┌─────────────┐ │ │ ┌────────┐ │
│ │      │ │        │ │         │ │ │ │        │ │ │ │             │ │ │ │        │ │
│ │ ETH  │ │ ERC20? │ │ ERC721? │ │ │ │ x.ens  │ │ │ │ foo;bar;..  │ │ │ │ true/f │ │
│ │      │ │        │ │         │ │ │ │        │ │ │ │             │ │ │ │        │ │
│ └──────┘ └────────┘ └─────────┘ │ │ └────────┘ │ │ └─────────────┘ │ │ └────────┘ │
│                                 │ │            │ │                 │ │            │
│ EtherScan ChainBase  Alchemy    │ │ Alchemy    │ │ ChainBase       │ │ Infura     │
│                                 │ │            │ │                 │ │            │
└─────────────────────────────────┘ └────────────┘ └─────────────────┘ └────────────┘
```

---

## Testing

Test with a famous address like the address that controls the gemini DOT ens domain

E.g: **[etherscan.io/address/0x4c2F150Fc90fed3d8281114c2349f1906cdE5346](https://etherscan.io/address/0x4c2F150Fc90fed3d8281114c2349f1906cdE5346)**

```sh
addrchecker -c .env -o out.csv 0x4c2F150Fc90fed3d8281114c2349f1906cdE5346
```

This should output something like:

```csv
Balance(Ether),BalanceFirst3tkns(ERC20s),BalanceNFTs(count),ENSdomainName(.ens),MetaDataTags(list),IsExternallyOwnOrContract(bool)
0.2ETH,CHI:2.0;GHO:0.38575864020335129;DOG:6.0,4NFTs,N/A,CATEG_SOCIAL:TAGS_multicall3.eth,false
```

---
