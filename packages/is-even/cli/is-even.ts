import { Command } from "commander";
import { isEven } from "../src";

const program = new Command();

program.option("-n, --number <number>", "input number");

program.parse(process.argv);

const options = program.opts();

console.log("Is even?", isEven(Number(options.number)));
