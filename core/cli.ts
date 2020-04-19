import yargs from "yargs";

import Controller from "./controlller";

const options = {
  "actual": {alias: "a", describe: "The actual address to request", demandOption: true},
  "previous": {alias: "p", describe: "The previous address to request", default: "snapshot"},
  "snapshot": {alias: "s", describe: "Take a snapshot from actual requests and save in database"},
  "database": {alias: "d", describe: "The database to use", default: "db.json"},
  "endpoints": {alias: "e", describe: "The endpoint list to use in hosts", demandOption: true},

  "ignore-values": {alias: "i", describe: "ignore values in JSON", default: true},
};

// Define CLI commands and usage message
yargs.usage("Usage: $0 -a [actual address] -p [previous address]");

// Define optional commands
yargs.options(options);

yargs.epilogue("For more information please visit: https://github.com/karlsmarx/d-if");

const main = async (): Promise<void> => {
  const args = yargs.argv;

  if (!args.actual) {
    console.log(args);
    process.exit(1);
  }

  const controller = new Controller();
  await controller.make(args.actual, args.previous, args.endpoints);
  console.log("Exiting CLI");

  process.exit(0);
};

main()
    .then(() => process.exit(0))
    .catch((err) => {
      console.log("An error occurs: \n\n");
      console.log(err);
      process.exit(1);
    });
