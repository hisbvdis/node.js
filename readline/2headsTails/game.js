import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { open } from "node:fs/promises";

// Randomly choose 1 or 2
const random = Math.floor(1 + Math.random() * (2 + 1 - 1));

// Prompt user to input number
const readline = createInterface(stdin, stdout);
const answer = await readline.question("1 or 2: ");
readline.close();

// Compare numbers
const result = random === Number(answer);

// Write result in log-file
const fileHandle = await open("./log.txt", "a");
fileHandle.write(result + "\n");
fileHandle.close();
