import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { config } from "dotenv";
import http from "node:http";

config();
const key = process.env.ACCESS_KEY;

const rl = readline.createInterface({ input, output });
const cityName = await rl.question("Enter the city name: ");
rl.close();

const url = `http://api.weatherstack.com/current?access_key=${key}&query=${cityName}`;

http
.get(url, (res) => {
  if (res.statusCode !== 200) console.error(`StatusCode: ${res.statusCode}`);
  res.setEncoding("utf-8");
  let data = "";
  res.on("data", (chunk) => data += chunk);
  res.on("end", () => {
    const temp = JSON.parse(data).current.temperature;
    console.log( `Current temperature: ${temp}` );
  });
})
.on("error", (err) => console.log( `Error: ${err.message}` ));
