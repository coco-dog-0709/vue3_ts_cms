import type { App } from 'vue'

import 'element-plus/lib/theme-chalk/base.css'
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElAlert,
  ElTabs,
  ElTabPane,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElSubmenu,
  ElAvatar,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElRow,
  ElCol,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElConfigProvider,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
} from 'element-plus'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElAlert,
  ElTabs,
  ElTabPane,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElAvatar,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElRow,
  ElCol,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElConfigProvider,
  ElImage,
  ElDialog,
  ElTree,
  ElCard
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
