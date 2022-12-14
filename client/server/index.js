const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3030;

const server = express();

(async () => {
    try {
        await app.prepare();

        server.get("*", (req, res) => {
            return handle(req, res);
        });

        server.post("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
