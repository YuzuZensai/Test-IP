import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";

describe("IP Test Server", () => {
    const getIP = (server: unknown, request: Request) => {
        const ip = (server as { requestIP?: (req: Request) => unknown })?.requestIP?.(request);
        if (!ip) return "unknown";
        return typeof ip === "object" ? (ip as { address: string }).address : String(ip);
    };

    const buildResponse = (ip: string, headers: Record<string, string>, accept: string) => {
        if (accept.includes("application/json")) {
            return Response.json({ ip, headers });
        }

        let data = `IP: ${ip}<br/>`;

        for (const [key, value] of Object.entries(headers)) {
            data += `${key}: ${value}<br/>`;
        }

        if (!accept || accept.includes("*/*") || accept.includes("text/html")) {
            return new Response(data, { headers: { "Content-Type": "text/html; charset=utf-8" } });
        }

        return data;
    };

    const app = new Elysia().get("/", ({ server, request }) => {
        const headers: Record<string, string> = {};
        request.headers.forEach((value, key) => {
            headers[key] = value;
        });
        const ip = getIP(server, request);
        const accept = headers.accept ?? "";
        return buildResponse(ip, headers, accept);
    });

    it("should return HTML for browser requests (*/*)", async () => {
        const response = await app.handle(
            new Request("http://localhost/", { headers: { Accept: "*/*" } }),
        );
        const text = await response.text();

        expect(text).toContain("IP:");
        expect(text).toContain("<br/>");
        expect(response.headers.get("content-type")).toContain("text/html");
    });

    it("should return HTML when Accept is text/html", async () => {
        const response = await app.handle(
            new Request("http://localhost/", { headers: { Accept: "text/html" } }),
        );
        const text = await response.text();

        expect(text).toContain("IP:");
        expect(text).toContain("<br/>");
        expect(response.headers.get("content-type")).toContain("text/html");
    });

    it("should return JSON when Accept is application/json", async () => {
        const response = await app.handle(
            new Request("http://localhost/", { headers: { Accept: "application/json" } }),
        );
        const json = await response.json();

        expect(json).toHaveProperty("ip");
        expect(json).toHaveProperty("headers");
    });
});
