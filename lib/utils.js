function formatSize(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

function validatePackageJson(packageJson) {
  if (!packageJson) {
    throw new Error("Could not find package.json file");
  }

  if (!packageJson.dependencies && !packageJson.devDependencies) {
    throw new Error("No dependencies found in package.json");
  }

  return true;
}

module.exports = {
  formatSize,
  validatePackageJson,
};
