import 'zone.js/lib/browser/zone-microtask'
import 'reflect-metadata'
import 'rxjs/add/operator/map'
import { provide } from 'angular2/core'
import { bootstrap } from 'angular2/platform/browser'
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router'
import { HTTP_PROVIDERS } from 'angular2/http'
import ElasticDonut from './app/app'
import envConfig from './app/app.env'

const ENV = require('./.donut_env.json').donut_env || 'production'

document.addEventListener('DOMContentLoaded', () => {
  // Run specific environment settings
  envConfig[ENV]()

  bootstrap(ElasticDonut, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ])
})
