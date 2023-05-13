import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'
import { IanalyseState } from './main/analyse/type'

interface IrooteState {
  allDepartmentList: any[]
  allRoleList: any[]
  allMenuList: any[]
  userPermissions: any[]
}
interface IModuleState {
  loginModule: ILoginState
  systemModule: ISystemState
  analyseModule: IanalyseState
}

//根模块和子模块的交叉类型
type IrootAndModuleState = IrooteState & IModuleState

export { IrooteState, IrootAndModuleState }
