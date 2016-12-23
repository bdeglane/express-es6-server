'use strict';
import fs from 'fs';
import path from 'path';

export const getCurrentDirectoryBase = () => {
  return path.basename(process.cwd());
};

export const directoryExists = (filePath) => {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
};

export const resetConsole = () => {
  return process.stdout.write("\x1B[2J");
};