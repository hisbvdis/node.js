import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface(input, output);
const random = Math.floor(0 + Math.random() * (3 + 1 - 0));

console.log( "Try to guess number from 0 to 3" );

while (true) {
  const answer = await rl.question("Your guess: ");
  if (Number(answer) === random) {
    console.log( "Congratulations" )
    rl.close();
    break;
  } else {
    if (Number(answer) < random) {
      console.log( "Number is bigger" );
    } else {
      console.log( "Number is smaller" );
    }
  }
}
