import fs from "fs-extra";
import path from "path";

// merge package.json dependencies and devDependencies
export async function mergePackageJson(targetPath, newDeps) {
  let targetPkgPath = path.join(targetPath, "client", "package.json");
  if (!fs.existsSync(targetPkgPath)) {
    targetPkgPath = path.join(targetPath, "package.json");
  }

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

  console.log("Merging dependencies...");
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

export async function resolveEntryFile(targetPath) {
  const possiblePaths = [
    path.join(targetPath, "client/src/main.jsx"),
    path.join(targetPath, "client/src/index.js"),
    path.join(targetPath, "src/main.jsx"),
    path.join(targetPath, "src/index.js")
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
    if (injection.type === "import") {
      let filePath = path.join(targetPath, injection.file);
      
      if (!fs.existsSync(filePath)) {
        try {
          filePath = await resolveEntryFile(targetPath);
        } catch (error) {
          console.error(error.message);
          continue;
        }
      }

      await injectImport(filePath, injection.value);
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
