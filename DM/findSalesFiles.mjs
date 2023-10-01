import { readdir } from "fs/promises";
import { join, extname } from "path";

export async function findSalesFiles(folderName) {
  let salesFiles = [];

  async function findFiles(folderName) {
    const items = await readdir(folderName, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        await findFiles(join(folderName, item.name));
      } else {
        if (extname(item.name) === ".json") {
          await salesFiles.push(join(folderName, item.name));
        }
      }
    }
  }

  await findFiles(folderName);

  return salesFiles;
}
