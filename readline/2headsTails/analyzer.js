import { open } from "node:fs/promises";

// Take name of log file from arguments
const logFile = process.argv.slice(2)[0];

// Read log file content
const fileHandle = await open(logFile, "r");
const data = await fileHandle.readFile("utf-8");

// Analyze logs
const dataArray = data.split("\n");
const gamesCount = dataArray.length;
const { winsCount, defeatsCount } = dataArray.reduce((accum, value) => {
  if (value === "true") {
    accum.winsCount += 1;
  } else if (value === "false") {
    accum.defeatsCount += 1;
  }
  return accum;
}, {winsCount: 0, defeatsCount: 0})
const winPercents = winsCount / (winsCount + defeatsCount) * 100;

// Give results
console.log( "Total games: ", gamesCount );
console.log( `Wins: ${winsCount}. Defeats: ${defeatsCount}` );
console.log( `Percents: ${winPercents}` );
