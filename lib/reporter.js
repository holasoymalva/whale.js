const Table = require("cli-table3");
const chalk = require("chalk");

function generateReport(dependencies) {
  const table = new Table({
    head: ["Package", "Version", "Size", "Dependencies", "Alternatives"],
    style: {
      head: ["cyan"],
    },
  });

  dependencies.forEach((dep) => {
    if (dep) {
      const alternativesText = dep.alternatives
        ? formatAlternatives(dep.alternatives)
        : chalk.gray("No suggested alternatives");

      table.push([
        dep.name,
        dep.version,
        dep.size,
        dep.dependencies,
        alternativesText,
      ]);
    }
  });

  return table.toString();
}

function formatAlternatives(alternatives) {
  return chalk.green(
    alternatives.alternatives.join(", ") + "\n" + alternatives.reason
  );
}

function generateSummary(dependencies) {
  const heavyDeps = dependencies.filter((dep) => dep && dep.hasAlternatives);
  if (heavyDeps.length === 0) return "";

  return (
    chalk.yellow("\n⚠️  Dependencies that could be optimized:\n") +
    heavyDeps
      .map(
        (dep) =>
          `${chalk.bold(dep.name)}:\n${chalk.gray(dep.alternatives.reason)}`
      )
      .join("\n\n")
  );
}

module.exports = {
  generateReport,
  generateSummary,
  formatAlternatives,
};
