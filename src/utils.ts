import fs from 'node:fs';
import path from 'node:path';

export function mv(filepath: fs.PathLike, filename: string, output = __dirname): string {
  console.log(__dirname);

  if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
  }

  const destination = path.join(output, filename);

  fs.copyFile(filepath, destination, (err) => {
    if (err) throw err;

    fs.rm(filepath, (err) => {
      if (err) throw err;
    });
  });

  return destination;
}
