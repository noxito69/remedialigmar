import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
<<<<<<< HEAD

import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withInterceptors([tokenInterceptor])), HttpClient]
=======

import { errorInterceptor } from './interceptors/error.interceptor';
import { tokenInterceptor } from './interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([ tokenInterceptor, errorInterceptor]))]
>>>>>>> 46a645bc6d52cef8588e08d637e75df2a69a0693
};
