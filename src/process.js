import { Command } from "commander";

const program = new Command();

program
  .option("-d", "variable para debug", false)
  .option("-p <port>", "variable para puerto", 9090)
  .option("--mode <mode>", "variable para modo", "production")
  .requiredOption(
    "-u <user>",
    "variable para usuario",
    "no se ha declarado un usuario"
  )
  .option("-l, --letters [letters...]", "specify letters");
program.parse();

console.log("options: ", program.opts());
console.log("mode option: ", program.opts().mode);
console.log("remaining args: ", program.args);

process.on("exit", (code) => {
  console.log("exit code: ", code);
});
process.on("uncaughtException", (exception) => {
  console.log("uncaughtException: ", exception);
});
process.on("message", (message) => {
  console.log("message: ", message);
});

export default program;
