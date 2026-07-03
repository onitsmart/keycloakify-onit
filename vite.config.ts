import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import { buildEmailTheme } from "keycloakify-emails";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none",
            themeName: [ "onit", "onit-support", "onit-operations" ],
            postBuild: async (buildContext) => {
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
                    themeNames: buildContext.themeNames,
                    keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
                    locales: [ "en", "it" ],
                    cwd: import.meta.dirname,
                    environmentVariables: buildContext.environmentVariables,
                })
            }
        })
    ]
});
