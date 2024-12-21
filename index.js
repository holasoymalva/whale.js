const { analyzeDependency } = require('./lib/analyzer');
const { generateReport } = require('./lib/reporter');

module.exports = {
  analyzeDependency,
  generateReport
};