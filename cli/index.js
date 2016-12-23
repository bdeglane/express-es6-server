'use strict';
// import program from 'commander';
import logger from 'winston';
import chalk from 'chalk';
import figlet from 'figlet';
import clui from 'clui';
import {directoryExists, getCurrentDirectoryBase, resetConsole} from './libs';
const Spinner = clui.Spinner;

// resetConsole();
console.log(
  chalk.magenta(
    figlet.textSync('Flamingo', {horizontalLayout: 'full'})
  )
);
console.log('Welcome on flamingo-cli');
console.log('available commands');
// let status = new Spinner('Authenticating you, please wait...');
// status.start();
// setTimeout(() => {
//   status.stop();
// }, 2000);