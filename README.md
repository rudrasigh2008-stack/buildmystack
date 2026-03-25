<h1>
	<img src="https://res.cloudinary.com/dcauyzkfh/image/upload/v1774253255/buildmystack2_sarpqs.png" alt="buildmystack logo" width="50" height="50" style="vertical-align: middle;" />
	buildmystack
</h1>

![npm version](https://img.shields.io/npm/v/buildmystack?color=blue&label=npm)
![license](https://img.shields.io/npm/l/buildmystack)

<!-- <img src="https://res.cloudinary.com/dcauyzkfh/image/upload/v1774253254/Thumbnail_s1kohi.jpg" alt="thumbnail"/> -->

## Why buildmystack?

You open your system to start a new project.

First step? Setup

- Create frontend
- Setup backend
- Connect database
- Configure auth
- Fix folder structure
- Debug configs

> 1–2 hours gone… before writing a single feature.

Now multiply that across every project.

### buildmystack exists to eliminate that friction.

Instead of repeating the same setup again and again, you get a production-ready foundation in seconds — so you can focus on what actually matters: building your product.

## What buildmystack gives you

- Instant full-stack project setup via npx.
- Flexible stack selection (frontend, backend, database)
- Built-in authentication (ready to use)
- Clean, scalable architecture (no messy boilerplate)
- Smart dependency handling (npm / yarn / pnpm)
- Ready-to-run dev environment

## Usage

You don't even need to install it globally! You can seamlessly run:

```bash
npx buildmystack my-app
```

_(Optionally pass `--no-install` to skip the automatic dependency installation)_

### What happens next?

1. The CLI will ask you to select a stack.
2. It generates a perfectly structured project in the `my-app` directory.
3. It uses your preferred package manager to install everything under the hood.

Once completed, navigate into your new project and start the development servers:

```bash
cd my-app
npm run dev
```

Your development environment is ready to go.

## Generated Output Structure (Example)

```
my-app/
├── client/          # Vite React App (Pages, Components, Context, API Hook)
├── server/          # Express App (Controllers, Models, Middleware, DB Config)
├── .gitignore
├── package.json     # Root package.json running concurrently
```

## Changelog

Keep track of new features, bug fixes, and improvements in each version of `buildmystack`.

### 0.2.0-beta.0 (Latest)

- **Feature**: Completely modularized Database and Auth setups for React-Express and Next.js templates.
- **Feature**: Added PostgreSQL (Sequelize) database support alongside MongoDB.
- **Feature**: Added dynamic module dependency resolution (`requires` field) and advanced file injection system.
- **Bug Fix**: Fixed code injection parsing issues and improved dependency extraction paths.

## Contributing

Contributions, issues, and feature requests are highly welcomed! Please check out our [Contributing Guide](CONTRIBUTING.md) for details on how you can help.

## Support

If you find this project useful, consider giving it a ⭐ on GitHub!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
