import angular from 'angular'
import ngRoute from 'angular-route'
import ngAnimate from 'angular-animate'
import appRoutes from './app.route'

const app = angular.module('elasticDonut', [ngRoute, ngAnimate])

app.config(($routeProvider) => appRoutes($routeProvider))
