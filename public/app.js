import angular from 'angular'
import ngRoute from 'angular-route'
import appRoutes from './app.route'

const app = angular.module('elasticDonut', [ngRoute])

app.config(($routeProvider) => appRoutes($routeProvider))
