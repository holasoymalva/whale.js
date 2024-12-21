# 🐋 whale.js

A Node.js CLI tool that analyzes your project dependencies and suggests lighter alternatives to heavy packages.

[![NPM Version](https://img.shields.io/npm/v/whale-js.svg)](https://www.npmjs.com/package/whale-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 📦 Analyzes the size of each dependency in your project
- 🔍 Identifies heavy dependencies that might impact your bundle size
- 💡 Suggests lighter alternatives with explanations
- 📊 Generates detailed reports with package information
- 🎨 Beautiful CLI output with colors and tables

## Installation

```bash
npm install -g whale-js
```

## Usage

Basic usage:
```bash
whale -p ./package.json
```

The tool will analyze your dependencies and generate a report showing:
- Package size on disk
- Number of dependencies
- Available lighter alternatives
- Package versions

### Options

```bash
Options:
  -V, --version          output the version number
  -p, --package <path>   path to package.json (default: "./package.json")
  --json                 output in JSON format
  --no-color            disable colors in output
  -h, --help            display help for command
```

### Example Output

```
🐋 Analyzing dependencies...

┌──────────┬─────────┬──────────┬──────────────┬────────────────────┐
│ Package  │ Version │ Size     │ Dependencies │ Alternatives       │
├──────────┼─────────┼──────────┼──────────────┼────────────────────┤
│ moment   │ 2.29.4  │ 2.21 MB  │ 0           │ dayjs, date-fns    │
│ lodash   │ 4.17.21 │ 4.13 MB  │ 0           │ lodash-es, rambda  │
│ express  │ 4.18.2  │ 1.02 MB  │ 57          │ fastify, koa       │
└──────────┴─────────┴──────────┴──────────────┴────────────────────┘

⚠️  Dependencies that could be optimized:

moment:
Moment.js is heavy (~2MB). Day.js is lighter (~2KB) and date-fns is modular.

lodash:
Full Lodash is heavy (~4MB). Lodash-es enables tree-shaking and Rambda is lighter.
```

## Programmatic Usage

You can also use whale.js as a library in your Node.js applications:

```javascript
const whale = require('whale-js');

async function analyzePackages() {
  const result = await whale.analyzeDependency('lodash', '4.17.21');
  const report = whale.generateReport([result]);
  console.log(report);
}
```

## Currently Supported Alternatives

The tool currently provides alternatives for these common heavy packages:

- **moment** → dayjs, date-fns
- **lodash** → lodash-es, rambda
- **axios** → ky, got
- **express** → fastify, koa
- **mongoose** → prisma, @prisma/client

## Adding Custom Alternatives

You can programmatically add your own alternatives:

```javascript
const whale = require('whale-js');
const { addAlternative } = require('whale-js/src/alternatives');

addAlternative('heavy-package', {
  alternatives: ['light-package1', 'light-package2'],
  reason: 'Explanation of why these alternatives are better'
});
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/holasoymalva/whale-js.git

# Install dependencies
cd whale-js
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the need for lighter npm packages
- Thanks to all the developers creating lighter alternatives
- Built with Node.js and love for the community

## Roadmap

- [ ] Add more package alternatives
- [ ] Add bundle size analysis
- [ ] Support for monorepo analysis
- [ ] Custom rules for alternatives
- [ ] Integration with CI/CD pipelines

## Support

If you find any bugs or have feature requests, please create an issue in the GitHub repository.