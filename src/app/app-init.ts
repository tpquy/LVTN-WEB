import { KeycloakService, KeycloakOptions } from 'keycloak-angular';
import { EnvService } from './core/service/env.service';

export function initializer(keycloakService: KeycloakService, envService: EnvService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise<any>(function (resolve, reject) {
      envService.loadConfig().then(function (config) {
        resolve(config);
        // return keycloakService.init(<KeycloakOptions> config.keycloakOptions).then(function () {
        //   console.log(config)
        //   resolve(config);
        // }).catch(function () {
        //   reject('Failed to initialize keycloak!');
        // });
      });
    });
  };
};
