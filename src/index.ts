import { Elysia } from "elysia";

new Elysia()
    .get("/", ({ server, request }) => {
        const ip = server?.requestIP(request);
        const ipStr = ip ? (typeof ip === "object" ? ip.address : ip) : "unknown";
        const headers: Record<string, string> = {};
        request.headers.forEach((value, key) => {
            headers[key] = value;
        });
        const accept = headers.accept ?? "";

        if (accept.includes("application/json")) {
            return Response.json({ ip: ipStr, headers });
        }

        let data = `IP: ${ipStr}<br/>`;

        for (const [key, value] of Object.entries(headers)) {
            data += `${key}: ${value}<br/>`;
        }

        if (!accept || accept.includes("*/*") || accept.includes("text/html")) {
            return new Response(data, { headers: { "Content-Type": "text/html; charset=utf-8" } });
        }

        return data;
    })
    .listen(3000);

console.log("Listening on port 3000");
