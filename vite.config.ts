import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import { buildEmailTheme } from "keycloakify-emails";
import path from "node:path";
import { readdir, rm } from "node:fs/promises";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none",
            themeName: [ "onit", "onit--providers-only", "ope-support", "ope" ],
            postBuild: async (buildContext) => {
                const emailThemeNames = buildContext.themeNames.filter((x) => !x.includes("--providers-only"));

                await buildEmailTheme({
                    assetsDirPath: path.join(
                        buildContext.themeSrcDirPath,
                        "email",
                        "templates",
                        "assets"
                    ),
                    i18nSourceFile: path.join(
                        buildContext.themeSrcDirPath,
                        "email",
                        "i18n.ts"
                    ),
                    templatesSrcDirPath: path.join(
                        buildContext.themeSrcDirPath,
                        "email",
                        "templates",
                    ),
                    themeNames: emailThemeNames,
                    keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
                    locales: [ "en", "it" ],
                    cwd: import.meta.dirname,
                    environmentVariables: buildContext.environmentVariables,
                });

                /**
                 * Cleanup: remove email theme directories that are not in the emailThemeNames list
                 * (added because the property "themeNames" seems to be ignored and email themes are built for all themes anyway)
                 * 
                 * Keycloakify runs this postBuild with cwd set to the temporary resourcesDirPath that is later packaged into the jars. 
                 * Prune there first, then fall back to known paths.
                 * 
                 * (It works correctly even if it seems to be throwing an error here in the code)
                 */
                const emailThemeNameSet = new Set(emailThemeNames);

                const candidateThemeRootDirPaths = [
                    path.join(process.cwd(), "theme"),
                    path.join(buildContext.keycloakifyBuildDirPath, "resources", "theme"),
                    path.join(buildContext.keycloakifyBuildDirPath, "theme")
                ];

                for (const themeRootDirPath of candidateThemeRootDirPaths) {
                    let dirents: Awaited<ReturnType<typeof readdir>>;

                    try {
                        dirents = await readdir(themeRootDirPath, { withFileTypes: true });
                    } catch {
                        continue;
                    }

                    for (const dirent of dirents) {
                        if (!dirent.isDirectory() || emailThemeNameSet.has(dirent.name)) {
                            continue;
                        }

                        await rm(path.join(themeRootDirPath, dirent.name, "email"), {
                            recursive: true,
                            force: true,
                        });
                    }
                }
            }
        })
    ]
});
