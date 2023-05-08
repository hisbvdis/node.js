#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const args = yargs(hideBin(process.argv)).argv;
const date = new Date();
const locale = "en";
const options = {};


const changeDate = (action) => {
  if (args.month || args.m) {
    const amount = args.month || args.m;
    action === "add"
      ? date.setMonth(date.getMonth() + amount)
      : date.setMonth(date.getMonth() - amount)
  }

  if (args.date || args.d) {
    const amount = args.date || args.d;
    action === "add"
      ? date.setDate(date.getDate() + amount)
      : date.setDate(date.getDate() - amount)
  }
}


const fragmentDate = () => {
  if (args.year || args.y) {
    options.year = "numeric";
  }

  if (args.month || args.m) {
    options.month = "long";
  }

  if (args.date || args.d) {
    options.day = "2-digit";
  }
}


if (args["_"].includes("add")) changeDate("add");
if (args["_"].includes("sub")) changeDate("sub");
if (args["_"].includes("current")) fragmentDate();

console.log( new Intl.DateTimeFormat(locale, options).format(date) );
