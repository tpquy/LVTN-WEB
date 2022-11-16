// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loadConfigFromUrl: false,
  configUrl: './assets/app.config.json',
  routerConfig: {
    enableTracing: false
  },
  config: {
    keycloakDebug: true,
    keycloakOptions: {
      config: {
        url: 'https://ssotest.vnptigate.vn/auth',
        realm: 'digo',
        clientId: 'web-iso',
      },
      initOptions: {
        onLoad: 'check-sso'
      },
    },
    clientCredentials: {
      clientId: 'mobile-citizens',
      clientSecret: '0cc7395e-7610-44fc-9359-2351257d65ed'
    },
    insufficientPermissionRouterLink: 'error/insufficient-permission',
    apiProviders: {
      digo: {
        rootUrl: 'https://apitest.vnptigate.vn',
        services: {
          basedata: { path: 'ba' },
          basecat: { path: 'bt' },
          fileman: { path: 'fi' },
          human: { path: 'hu' },
          postman: { path: 'po' },
          logman: { path: 'lo' },
          surfeed: { path: 'su' },
          messenger: { path: 'me' },
          padman: { path: 'pa' },
          basepad: { path: 'bd' },
          reporter: { path: 're' },
          bpm: { path: 'bpm' },
          baseiso: { path: 'baseiso' },
          isoman: { path: 'isoman' },
          rbiso: { path: 'rbiso' },
          rbo: { path: 'rbonegate' },
          modeling: { path: 'modeling-service' },
          adapter: {path: 'ad'},
          sysman: {path: 'sy'},
          reportiso: {path: 'reportiso'}
        }
      }
    },
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
