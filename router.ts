type Method =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

type Handlers = Record<string, Deno.ServeHandler>;
type Routes = Record<Method, Handlers>;

export default class Router {
  routes: Routes = {
    "GET": {},
    "HEAD": {},
    "POST": {},
    "PUT": {},
    "DELETE": {},
    "CONNECT": {},
    "OPTIONS": {},
    "TRACE": {},
    "PATCH": {},
  };

  get(path: string, handler: Deno.ServeHandler) {
    this.routes["GET"][path] = handler;
  }

  head(path: string, handler: Deno.ServeHandler) {
    this.routes["HEAD"][path] = handler;
  }

  post(path: string, handler: Deno.ServeHandler) {
    this.routes["POST"][path] = handler;
  }

  put(path: string, handler: Deno.ServeHandler) {
    this.routes["PUT"][path] = handler;
  }

  delete(path: string, handler: Deno.ServeHandler) {
    this.routes["DELETE"][path] = handler;
  }

  connect(path: string, handler: Deno.ServeHandler) {
    this.routes["CONNECT"][path] = handler;
  }

  options(path: string, handler: Deno.ServeHandler) {
    this.routes["OPTIONS"][path] = handler;
  }

  trace(path: string, handler: Deno.ServeHandler) {
    this.routes["TRACE"][path] = handler;
  }

  get handler(): Deno.ServeHandler {
    return (req, info) => {
      const url = new URL(req.url);
      const handlers = this.routes[req.method as Method];
      if (handlers === undefined) {
        return new Response("Bad Request", { status: 400 });
      }
      for (const [path, handler] of Object.entries(handlers)) {
        const pattern = new URLPattern(path, url.origin);
        if (pattern.test(url)) {
          return handler(req, info);
        }
      }
      return new Response("Not Found", { status: 404 });
    };
  }
}
