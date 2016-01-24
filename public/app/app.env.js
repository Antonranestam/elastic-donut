import { enableProdMode } from 'angular2/core'

const envConfig = {}

envConfig.development = function () {

}

envConfig.production = function () {
  enableProdMode()
}

export default envConfig
