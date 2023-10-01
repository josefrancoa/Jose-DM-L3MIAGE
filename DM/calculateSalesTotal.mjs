import { readFile } from "fs/promises";
export async function calculateSalesTotal(salesFiles) {
  let salesTotal = 0;

  for (const file of salesFiles) {
    const data = JSON.parse(await readFile(file));

    salesTotal += data.total;
  }
  return salesTotal;
}
