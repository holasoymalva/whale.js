const pacote = require("pacote");
const ora = require("ora");
const { formatSize } = require("./utils");
const { getAlternatives } = require("../src/alternatives");

async function analyzeDependency(packageName, version) {
  const spinner = ora(`Analyzing ${packageName}`).start();

  try {
    const manifest = await pacote.manifest(`${packageName}@${version}`);
    const packageSize = await getPackageSize(packageName, version);
    spinner.succeed();

    return {
      name: packageName,
      version: version,
      size: packageSize,
      dependencies: Object.keys(manifest.dependencies || {}).length,
      hasAlternatives: Boolean(getAlternatives(packageName)),
      alternatives: getAlternatives(packageName),
    };
  } catch (error) {
    spinner.fail(`Error analyzing ${packageName}: ${error.message}`);
    return null;
  }
}

async function getPackageSize(packageName, version) {
  try {
    const tarball = await pacote.tarball.stream(`${packageName}@${version}`);
    let size = 0;

    return new Promise((resolve, reject) => {
      tarball.on("data", (chunk) => (size += chunk.length));
      tarball.on("end", () => resolve(formatSize(size)));
      tarball.on("error", reject);
    });
  } catch (error) {
    return "N/A";
  }
}

module.exports = {
  analyzeDependency,
  getPackageSize,
};
