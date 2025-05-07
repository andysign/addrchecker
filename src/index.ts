import figlet from "figlet";
import { Command } from "commander";

const program = new Command();

program
  .version("1.0.0", "-v, --version", "output the current version")
  .description(
    figlet.textSync("AddrChecker") + "\n" +
    "Checks the metadata of an 0x address and saves the data in a CSV"
  )
  .parse(process.argv);

const options = program.opts();

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
