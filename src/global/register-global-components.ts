//注册全局组件
import { App } from 'vue'

import { GForm, GTable } from '@/base-ui'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

const globalComponents: any = [GForm, GTable, PageContent, PageSearch, PageModal]

export default function registerGlobalComponents(app: App): void {
  for (const comonent of globalComponents) {
    app.component(comonent.name, comonent)
  }
}
