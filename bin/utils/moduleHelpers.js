import fs from "fs-extra";
import path from "path";

export async function mergePackageJson(targetPath, newDeps) {
  if (newDeps.client || newDeps.server || newDeps.root) {
    if (newDeps.client) await mergeToPath(path.join(targetPath, "client", "package.json"), newDeps.client);
    if (newDeps.server) await mergeToPath(path.join(targetPath, "server", "package.json"), newDeps.server);
    if (newDeps.root) await mergeToPath(path.join(targetPath, "package.json"), newDeps.root);
  } else {
    // Backward compatibility
    let targetPkgPath = path.join(targetPath, "client", "package.json");
    if (!fs.existsSync(targetPkgPath)) {
      targetPkgPath = path.join(targetPath, "package.json");
    }
    await mergeToPath(targetPkgPath, newDeps);
  }
}

async function mergeToPath(targetPkgPath, newDeps) {
  if (!fs.existsSync(targetPkgPath)) return;
  const pkg = await fs.readJson(targetPkgPath);

  if (newDeps.dependencies) {
    pkg.dependencies = { ...pkg.dependencies, ...newDeps.dependencies };
  }

  if (newDeps.devDependencies) {
    pkg.devDependencies = {
      ...pkg.devDependencies,
      ...newDeps.devDependencies,
    };
  }

  console.log(`Merging dependencies into ${targetPkgPath}...`);
  await fs.writeJson(targetPkgPath, pkg, { spaces: 2 });
}

// inject import statement into the entry file (main.jsx or index.js)
export async function injectImport(filePath, importLine) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found for injection: ${filePath}`);
    return;
  }

  const content = await fs.readFile(filePath, "utf-8");

  // Prevent duplicate imports
  if (content.includes(importLine)) {
    return;
  }

  console.log(`Injecting import into ${filePath}...`);
  // Insert import at the top
  const newContent = `${importLine}\n${content}`;
  await fs.writeFile(filePath, newContent, "utf-8");
}

export async function injectCode(filePath, codeLine) {
  if (!(await fs.pathExists(filePath))) {
    console.warn(`⚠️ File not found for code injection: ${filePath}`);
    return;
  }

  let content = await fs.readFile(filePath, "utf-8");

  if (content.includes(codeLine)) return;

  console.log(`🧩 Injecting code into ${filePath}`);

  // Try to inject before server.listen or end of file
  if (content.includes("app.listen") || content.includes("server.listen")) {
    content = content.replace(
      /(app\.listen|server\.listen)/,
      `${codeLine}\n$1`,
    );
  } else {
    content = content + "\n" + codeLine;
  }

  await fs.writeFile(filePath, content, "utf-8");
}

// resolve entry files
export async function resolveEntryFile(targetPath) {
  const possiblePaths = [
    path.join(targetPath, "client/src/main.jsx"),
    path.join(targetPath, "client/src/index.js"),
    path.join(targetPath, "src/main.jsx"),
    path.join(targetPath, "src/index.js"),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  throw new Error("Could not resolve React entry file.");
}

// Apply injections based on the module configuration
export async function applyInjections(targetPath, injections) {
  if (!injections || !Array.isArray(injections)) return;

  for (const injection of injections) {
    try {
      let filePath = path.join(targetPath, injection.file);

      // fallback if file not found
      if (!(await fs.pathExists(filePath))) {
        if (injection.type === "import") {
          filePath = await resolveEntryFile(targetPath);
        } else {
          console.warn(
            `⚠️ Skipping injection, file not found: ${injection.file}`,
          );
          continue;
        }
      }

      // Handle import injection
      if (injection.type === "import") {
        await injectImport(filePath, injection.value);
      }

      // Handle code injection
      else if (injection.type === "code") {
        await injectCode(filePath, injection.value);
      } else {
        console.warn(`⚠️ Unknown injection type: ${injection.type}`);
      }
    } catch (err) {
      console.error(`❌ Injection failed: ${err.message}`);
    }
  }
}

// Copy specified files from the module to the target project
export async function copyModuleFiles(modulePath, targetPath, files) {
  if (!files || !Array.isArray(files)) return;

  for (const file of files) {
    const srcPath = path.join(modulePath, file.from);
    const destPath = path.join(targetPath, file.to);

    console.log(`Copying file: ${file.from} -> ${file.to}`);
    await fs.ensureDir(path.dirname(destPath));
    await fs.copy(srcPath, destPath, { overwrite: true });
  }
}

// Append environment variables to .env.example
export async function applyEnv(targetPath, envVariables) {
  if (!envVariables || !Array.isArray(envVariables)) return;

  let envExamplePath = path.join(targetPath, "server", ".env.example");
  if (!(await fs.pathExists(envExamplePath))) {
    envExamplePath = path.join(targetPath, ".env.example");
  }

  if (!(await fs.pathExists(envExamplePath))) {
    console.warn(`⚠️ .env.example not found for environment variables injection`);
    return;
  }

  const envLines = envVariables.map(v => `${v.key}=${v.value}`).join("\n");
  
  console.log(`Injecting environment variables...`);
  await fs.appendFile(envExamplePath, `\n${envLines}\n`, "utf-8");
}
