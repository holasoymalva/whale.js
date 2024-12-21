#!/usr/bin/env node

const { program } = require('commander');
const { analyzeDependency } = require('../lib/analyzer');
const { generateReport, generateSummary } = require('../lib/reporter');
const { validatePackageJson } = require('../lib/utils');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

program
  .version('1.0.0')
  .description('Analyzes heavy dependencies in your Node.js project')
  .option('-p, --package <path>', 'Path to package.json', './package.json')
  .option('--json', 'Output in JSON format')
  .option('--no-color', 'Disable colors in output')
  .parse(process.argv);

async function main() {
  const options = program.opts();
  const packagePath = path.resolve(options.package);

  try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    validatePackageJson(packageJson);

    const dependencies = { 
      ...packageJson.dependencies, 
      ...packageJson.devDependencies 
    };
    
    console.log(chalk.blue('🐋 Analyzing dependencies...\n'));

    const results = await Promise.all(
      Object.entries(dependencies).map(([name, version]) => 
        analyzeDependency(name, version.replace(/[\^~]/, ''))
      )
    );

    const validResults = results.filter(Boolean);

    if (options.json) {
      console.log(JSON.stringify(validResults, null, 2));
    } else {
      console.log(generateReport(validResults));
      console.log(generateSummary(validResults));
    }
  } catch (error) {
    console.error(chalk.red(`\n❌ Error: ${error.message}`));
    process.exit(1);
  }
}

main();