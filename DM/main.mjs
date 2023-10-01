import { mkdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { calculateSalesTotal } from "./calculateSalesTotal.mjs";
import { findSalesFiles } from "./findSalesFiles.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const salesDir = join(__dirname, "stores");
  const salesTotalsDir = join(__dirname, "salesTotals");

  try {
    await mkdir(salesTotalsDir);
  } catch {
    console.log(`${salesTotalsDir} already exists.`);
  }

  const salesFiles = await findSalesFiles(salesDir);

  const salesTotal = await calculateSalesTotal(salesFiles);

  await writeFile(
    join(salesTotalsDir, "totals.txt"),
    `Total at ${new Date().toLocaleDateString()} : ${salesTotal}€\r\n`,
    { flag: "a" }
  );
  console.log(`Wrote sales totals to ${salesTotalsDir}`);
}

main();
