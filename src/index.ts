import { Command } from 'commander';
import { runInit } from './commands/init.js';
import { runGenerate } from './commands/generate.js';

const program = new Command();

program
  .name('asset-gen')
  .description('Generate TypeScript asset index files from image directories')
  .version('1.0.0');

program
  .command('init')
  .description('Create asset-gen.config.json in the current directory')
  .option('-f, --force', 'Overwrite existing config file')
  .action((opts) => {
    runInit({ force: opts.force });
  });

program
  .command('generate')
  .alias('gen')
  .description('Scan assets and generate the index file')
  .action(async () => {
    await runGenerate();
  });

program.parse();
