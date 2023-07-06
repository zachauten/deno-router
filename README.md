# deno_router

Simple router for Deno.serve

Usage:
```
const router = new Router();
router.get("/hello", req => new Response("hello world!"));
router.post("/foo/:id", req => new Response("bar"));
const server = Deno.serve(router.handler);
await server.finished
```
