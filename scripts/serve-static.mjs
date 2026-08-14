import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "docs");
const prefix = "/responsive-saas-proof";
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};

createServer((request, response) => {
  const url = new URL(request.url ?? "/", "http://127.0.0.1");
  if (!url.pathname.startsWith(prefix)) {
    response.writeHead(404).end("Not found");
    return;
  }

  const relative = normalize(decodeURIComponent(url.pathname.slice(prefix.length))).replace(/^(\.\.(\/|\\|$))+/, "");
  let file = join(root, relative);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file) || !statSync(file).isFile() || !file.startsWith(root)) {
    response.writeHead(404).end("Not found");
    return;
  }

  response.writeHead(200, { "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(response);
}).listen(4173, "127.0.0.1");
