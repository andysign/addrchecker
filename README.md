# AddrChecker

## Description

AddrChecker is a CLI tool that checks the metadata of an Ethereum address and saves the data in a CSV file. It fetches balance information ( not only the native balance of Ethereum ETH but also balance in tokens and non fungible tokens ) and also fetches information about various tags that the address might have, all using various 3rd party APIs.

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
