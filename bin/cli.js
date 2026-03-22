#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs-extra";
import { execa } from "execa";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = fs.readJsonSync(path.join(__dirname, "../package.json"));

const program = new Command();

program
  .name(packageJson.name)
  .description("Scaffold a complete React+Express+MongoDB application")
  .version(packageJson.version);

program
  .argument("[project-name]", "Name of the project")
  .option("--no-install", "Skip installing dependencies")
  .action(async (projectName, options) => {
    try {
      let name = projectName;

      if (name && !/^[a-zA-Z0-9-_]+$/.test(name)) {
        console.error(
          "Invalid project name. Use only letters, numbers, - or _",
        );
        process.exit(1);
      }

      const prompts = [];
      if (!name) {
        prompts.push({
          type: "input",
          name: "projectName",
          message: "What is your project name?",
          default: "myApp",
        });
      }
      prompts.push({
        type: "list",
        name: "stack",
        message: "Select your stack:",
        choices: ["react-express-mongo", "nextjs-mongo"],
      });
      prompts.push({
        type: "list",
        name: "styling",
        message: "Select your styling:",
        choices: ["basic", "tailwind"],
        when: (answers) => answers.stack === "react-express-mongo",
      });

      const answers = await inquirer.prompt(prompts);
      if (!name) {
        name = answers.projectName;
        if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
          console.error(
            "Invalid project name. Use only letters, numbers, - or _",
          );
          process.exit(1);
        }
      }

      const targetPath = path.join(process.cwd(), name);

      if (fs.existsSync(targetPath)) {
        console.error(`\nError: Directory ${name} already exists.\n`);
        process.exit(1);
      }

      console.log(`\nCreating full-stack project in ${targetPath}...\n`);

      let selectedTemplate = answers.stack;
      if (answers.stack === "react-express-mongo") {
        selectedTemplate = `react-express-mongo-${answers.styling}`;
      }

      // Path to the template
      const templatePath = path.join(__dirname, `../templates/${selectedTemplate}`);

      const pkgManager = process.env.npm_config_user_agent?.includes("yarn")
        ? "yarn"
        : process.env.npm_config_user_agent?.includes("pnpm")
        ? "pnpm"
        : "npm";

      // 1. Copy template folder into new project directory
      await fs.copy(templatePath, targetPath);

      // 2. Rename project in root package.json
      const rootPackageJsonPath = path.join(targetPath, "package.json");
      const rootPackageJson = await fs.readJson(rootPackageJsonPath);
      rootPackageJson.name = name;
      await fs.writeJson(rootPackageJsonPath, rootPackageJson, { spaces: 2 });

      // Rename .env.example to .env
      let envExamplePath = path.join(targetPath, "server", ".env.example");
      let envPath = path.join(targetPath, "server", ".env");
      if (!fs.existsSync(envExamplePath)) {
        envExamplePath = path.join(targetPath, ".env.example");
        envPath = path.join(targetPath, ".env");
      }
      
      if (fs.existsSync(envExamplePath)) {
        await fs.move(envExamplePath, envPath);
      }

      if (options.install) {
        console.log(`Installing root dependencies using ${pkgManager}...`);
        await execa(pkgManager, ["install"], { cwd: targetPath, stdio: "inherit" });

        const serverPath = path.join(targetPath, "server");
        if (fs.existsSync(serverPath)) {
          console.log(`\nInstalling server dependencies using ${pkgManager}...`);
          await execa(pkgManager, ["install"], {
            cwd: serverPath,
            stdio: "inherit",
          });
        }

        const clientPath = path.join(targetPath, "client");
        if (fs.existsSync(clientPath)) {
          console.log(`\nInstalling client dependencies using ${pkgManager}...`);
          await execa(pkgManager, ["install"], {
            cwd: clientPath,
            stdio: "inherit",
          });
        }
      } else {
        console.log("\nSkipping dependency installation (--no-install).");
        console.log(
          `Please run \`${pkgManager} install\` manually in the necessary directories.`,
        );
      }

      console.log(`\nSuccess! Created ${name} at ${targetPath}`);
      console.log("Inside that directory, you can run:\n");
      console.log("  npm run dev");
      console.log(
        "    Starts the frontend and backend development servers concurrently.\n",
      );
      console.log("We suggest that you begin by typing:\n");
      console.log(`  cd ${name}`);
      console.log("  npm run dev\n");
    } catch (error) {
      console.error("Failed to create project:", error);
      process.exit(1);
    }
  });

program.parse(process.argv);
