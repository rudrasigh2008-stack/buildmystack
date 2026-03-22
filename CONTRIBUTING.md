# Contributing to buildmystack

Thank you for your interest in contributing to `buildmystack`! We welcome contributions to make scaffolding full-stack applications easier for everyone.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally.
3. **Install dependencies**:
   ```bash
   npm install
   ```

## Development Workflow

1. Create a descriptive branch for your feature or bug fix: `git checkout -b feature/my-new-feature`
2. Make your modifications. The CLI source code is in `bin/cli.js`. The template projects are stored within the `templates/` directory.
3. Test your changes locally by linking the package:
   ```bash
   npm link
   buildmystack test-project
   ```
4. Push your changes to your fork and submit a Pull Request.

## Requirements
- Please ensure that templates continue to use `concurrently` for root startup.
- Keep dependencies updated and ensure there are no breaking changes to the default flow.
- Ensure your code follows the existing style logic.

If you have major architectural changes, please open an issue first to discuss it!
