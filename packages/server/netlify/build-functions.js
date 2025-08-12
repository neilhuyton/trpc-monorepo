import { build } from "esbuild";
import { glob } from "glob";
import { readdirSync, existsSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create require function for ESM
const require = createRequire(import.meta.url);

async function bundleFunctions() {
  try {
    // Use absolute path for functions directory
    const functionsDir = resolve(__dirname, "functions");
    console.log("Resolved functions directory:", functionsDir);

    // Debug: Check if functions directory exists
    if (!existsSync(functionsDir)) {
      throw new Error(`Functions directory not found: ${functionsDir}`);
    }
    console.log("Functions directory exists:", functionsDir);

    // Debug: List files in functions directory
    const dirFiles = readdirSync(functionsDir);
    console.log("Files in functions directory:", dirFiles);

    // Use absolute path for glob pattern
    const functionFiles = await glob(`${functionsDir}/*.ts`);
    if (functionFiles.length === 0) {
      throw new Error(`No function files found in ${functionsDir}`);
    }
    console.log("Found function files:", functionFiles);

    // Resolve Prisma Client path dynamically
    const prismaClientPath = dirname(
      require.resolve("@prisma/client/package.json")
    );
    if (!existsSync(prismaClientPath)) {
      throw new Error(
        `Prisma Client directory not found at ${prismaClientPath}`
      );
    }
    const prismaFiles = readdirSync(prismaClientPath);
    console.log("Prisma Client files:", prismaFiles);

    await build({
      entryPoints: functionFiles,
      bundle: true,
      outdir: resolve(__dirname, "../../../netlify/functions"),
      platform: "node",
      target: "node18",
      format: "esm",
      sourcemap: true,
      external: [], // Include all dependencies in the bundle
      alias: {
        "@prisma/client": prismaClientPath,
      },
      logLevel: "info",
      plugins: [
        {
          name: "prisma-engine",
          setup(build) {
            build.onResolve({ filter: /^@prisma\/client$/ }, () => {
              console.log("Resolving @prisma/client to:", prismaClientPath);
              return { path: join(prismaClientPath, "index.js") };
            });
          },
        },
      ],
    });

    // Debug: List output files
    const outputFiles = readdirSync(
      resolve(__dirname, "../../../netlify/functions")
    );
    console.log("Output files in netlify/functions:", outputFiles);

    console.log("Functions bundled successfully!");
  } catch (error) {
    console.error("Function bundling failed:", error);
    process.exit(1);
  }
}

bundleFunctions();
