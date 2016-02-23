'use strict'

import { Component, View } from 'angular2/core'
import { RouteParams } from 'angular2/router'

@Component({
  selector: 'destination'
})
@View({
  template: 'Destination {{destination}}'
})
export default class Destination {
  constructor (routeParams: RouteParams) {
    this.destination = routeParams.params.airport
  }
}
