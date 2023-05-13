import registerElementPlus from './register-element-plus'
import registerGlobalProperties from './register-global-properties'
import getUserRoutes, { getMenuIdByPath, mapBreadCrumbByPath } from './get-user-routes'
import registerGlobalComponents from './register-global-components'
import type { App } from 'vue'
export default function globalRegister(app: App): void {
  registerElementPlus(app)
  registerGlobalProperties(app)
  registerGlobalComponents(app)
}
export { getUserRoutes, getMenuIdByPath, mapBreadCrumbByPath }
