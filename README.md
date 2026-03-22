# buildmystack

A zero-config CLI to generate production-ready full-stack apps with frontend, backend, auth, and database setup in seconds.

## 🌟 Features

- ⚛️ **React + Vite**: Blazing fast frontend setup with React Router and Axios pre-configured.
- 🚂 **Express.js + MongoDB**: Custom-built REST API structure with MVC architecture (Models, Views, Controllers).
- 🔐 **JWT Authentication**: Secure login/register flow pre-built and protected middleware functionality straight out of the box.
- 📦 **Smart Detection**: Automatically installs dependencies with the correct package manager (`npm`, `yarn`, or `pnpm`).
- ⚡ **Concurrent Dev**: Run both frontend and backend development servers with a single command.

## 📦 Usage

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

Both the React frontend (usually port `5173`) and Express backend (port `5000`) will spin up concurrently!

## 📁 Generated Output Structure

```
my-app/
├── client/          # Vite React App (Pages, Components, Context, API Hook)
├── server/          # Express App (Controllers, Models, Middleware, DB Config)
├── .gitignore
├── package.json     # Root package.json running concurrently
```

## 🤝 Contributing

Contributions, issues, and feature requests are highly welcomed! Please check out our [Contributing Guide](CONTRIBUTING.md) for details on how you can help.

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
