import 'zone.js/lib/browser/zone-microtask'
import 'reflect-metadata'
import { provide } from 'angular2/core'
import { bootstrap } from 'angular2/platform/browser'
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router'
import ElasticDonut from './app/app'

document.addEventListener('DOMContentLoaded', () => {
  bootstrap(ElasticDonut, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ])
})
