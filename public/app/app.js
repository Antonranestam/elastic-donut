import { Component, View } from 'angular2/core'
import { RouteConfig, RouterOutlet } from 'angular2/router'
import { appRoutes } from './app.routes'

@Component({
  selector: 'elastic-donut'
})
@View({
  directives: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
@RouteConfig(appRoutes)
export default class ElasticDonut {

}
