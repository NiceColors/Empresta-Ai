import { setCookie as nookieSetCookie } from "nookies";

function setCookies(name: string, value: string) {
  nookieSetCookie(undefined, `nextauth.${name}`, value, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export { setCookies };