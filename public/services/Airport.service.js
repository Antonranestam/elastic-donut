'use strict'

import { Http } from 'angular2/http'

export class AirportService {
  constructor (http: Http) {
    this.http = http
  }

  search (term) {
    return this.http.get('/api/airport/search/' + term)
      .map(res => res.json())
  }
}
