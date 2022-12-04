import { NextApiRequest, NextApiResponse } from "next";
import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
    api: {
        externalResolver: true,
        bodyParser: false,
    },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const proxyConfig = {
        logLevel: process.env.NODE_ENV === "production" ? "silent" : "warn",
        target: process.env.API_URL || "http://localhost:8000/api",
        changeOrigin: true,
        on: {
            // @ts-ignore
            error(err, req, res) {
                res.writeHead(302);
                res.end();
            },
        },
    };
    // @ts-ignore
    const apiProxy = createProxyMiddleware(proxyConfig);

    // @ts-ignore
    apiProxy(req, res, (result) => {
        if (result instanceof Error) {
            throw result;
        }
        throw new Error(`Request '${req.url}' is not proxied!`);
    });
};
