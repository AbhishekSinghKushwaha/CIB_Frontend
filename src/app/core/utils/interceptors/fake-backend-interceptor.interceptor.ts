import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import ShareUtils from '../shared.util';
import urlList from '../../services/service-list.json';

const users: any[] = [
  {
    id: 1,
    name: 'Oluwatosin Iyiola',
    username: 'olu.iyiola1@gmail.com',
    password: 'Temmanuel2',
    transactionType: 'Login',
    smsToken: '666666',
    securityQuestions: [
      { question: 'What village were you born in?', answer: 'aaa' },
      { question: 'What was the last city you visited?', answer: 'bbb' },
      { question: 'At what age did you start working', answer: 'ccc' }
    ]
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith(urlList.login.loginUser) && method === 'POST':
          return authenticateLogin();
        case url.endsWith(urlList.login.verifyOtp) && method === 'POST':
          return authenticateOTP();
        case url.endsWith(urlList.login.resendOtp) && method === 'POST':
          return authenticateResendOTP();
        case url.endsWith(urlList.login.securityQuestions) && method === 'POST':
          return getSecurityQuestions();
        case url.endsWith(urlList.login.securityAnswers) && method === 'POST':
          return verifyAnswers();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticateLogin() {
      const { username, password } = body;
      console.log({ body })
      const user = users.find((x: any) => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok(user);
    }

    function getSecurityQuestions() {
      const { id } = body;
      const user = users.find((x: any) => x.id === id);
      if (!user) return error('Cannot find security questions');
      return ok(user.securityQuestions.map((x: any) => x.question));
    }

    function verifyAnswers() {
      const { id, answers } = body;
      const user = users.find((x: any) => x.id === id);
      if (!user) return error('Cannot find security questions');
      const result = user.securityQuestions.map((x: any, index: number) => answers[index] === x.answer)
      return ok(result.indexOf(true) > -1);
    }

    function authenticateOTP() {
      const { id, smsToken } = body;
      console.log({ body })
      const user = users.find((x: any) => x.id === id && x.smsToken === smsToken);
      if (!user) return error('Invalid OTP');
      return ok(user)
    }

    function authenticateResendOTP() {
      const { id } = body;
      const user = users.find((x: any) => x.id === id);
      if (!user) return error('Invalid OTP');
      return ok(user)
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function getUserById() {
      if (!isLoggedIn()) return unauthorized();

      const user = users.find(x => x.id === idFromUrl());
      return ok(user);
    }


    // helper functions

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message: any) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
