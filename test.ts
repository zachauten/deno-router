import { assertEquals } from "https://deno.land/std@0.193.0/testing/asserts.ts";
import { Router } from "./mod.ts";

Deno.test("GET request", async () => {
  const expected = "foo!";
  const router = new Router();
  router.get("foo", (_req) => new Response(expected));
  const controller = new AbortController();
  const server = Deno.serve({ signal: controller.signal }, router.handler);
  const res = await fetch("http://127.0.0.1:8000/foo");
  const actual = await res.text();
  controller.abort();
  assertEquals(actual, expected);
  await server.finished;
});

Deno.test("GET URLPattern", async () => {
  const expected = "123";
  const router = new Router();
  router.get("/bar/:id", (req) => {
    const url = new URL(req.url);
    const pattern = new URLPattern("/bar/:id", url.origin);
    const match = pattern.exec(url);
    if (match) {
      const id = match.pathname.groups.id;
      return new Response(id);
    }
    return new Response("Err");
  });
  const controller = new AbortController();
  const server = Deno.serve({ signal: controller.signal }, router.handler);
  const res = await fetch("http://127.0.0.1:8000/bar/" + expected);
  const actual = await res.text();
  controller.abort();
  assertEquals(actual, expected);
  await server.finished;
});
