# deno_router

Simple router for Deno.serve

Usage:
```
import { Router } from "https://deno.land/x/deno_router@v1.0.0/mod.ts"
const router = new Router();
router.get("/hello", req => new Response("hello world!"));
router.post("/foo/:id", req => new Response("bar"));
const server = Deno.serve(router.handler);
await server.finished
```
