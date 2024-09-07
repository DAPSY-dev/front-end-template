import path from "path";
import nunjucks from "@vituum/vite-plugin-nunjucks";
import sassGlobImports from "vite-plugin-sass-glob-import";
import * as njkData from "./src/config/data.njk.json";

const root = path.resolve(__dirname, "src");
const outDir = path.resolve(__dirname, "dist");

const pages = {};
for (const page of njkData.pages) {
    const name = path.parse(page).name;
    pages[name] = path.resolve(root, page);
}

export default {
    base: "./",
    root: root,
    build: {
        outDir: outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: path.resolve(root, "index.html"),
                ...pages,
            },
            output: {
                entryFileNames: "assets/js/[name].js",
                chunkFileNames: "assets/js/[name].js",
                assetFileNames: "assets/[ext]/[name].[ext]",
            },
        },
    },
    plugins: [
        nunjucks({
            data: "./src/config/data.njk.json",
            filetypes: {
                html: /.(.html)$/,
                json: /.(json.njk.html)$/,
            },
        }),
        sassGlobImports(),
    ],
};
