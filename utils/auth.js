import cookie from 'js-cookie';
import Router from 'next/router';

export function handleLogin(token) {
  cookie.set('token', token);
  Router.push('/account');
}

export function redirectUser(ctx, location) {
  // check if we're on the server (not client)
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

export function handleLogout() {
  cookie.remove('token');
  Router.push('/login');
}
