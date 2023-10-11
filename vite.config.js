import path from "path";
import nunjucks from "@vituum/vite-plugin-nunjucks";
import sassGlobImports from "vite-plugin-sass-glob-import";
// import { viteStaticCopy } from "vite-plugin-static-copy";
import * as njkData from "./src/config/data.njk.json";

const root = path.resolve(__dirname, "src");
const outDir = path.resolve(__dirname, "dist");

const pages = {};
for (const page of njkData.pages) {
    const name = path.parse(page).name;
    pages[name] = path.resolve(root, page);
}

export default {
    root: root,
    build: {
        outDir: outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: path.resolve(root, "index.html"),
                ...pages,
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
        // viteStaticCopy({
        //     targets: [
        //         {
        //             src: "./config/robots.txt",
        //             dest: "./",
        //         },
        //         {
        //             src: "./config/sitemap.xml",
        //             dest: "./",
        //         },
        //     ],
        // }),
    ],
};
