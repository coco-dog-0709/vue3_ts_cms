import { ref } from 'vue'
import PageContent from '@/components/page-content'
function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleQueryForm = (formData: any) => {
    pageContentRef.value?.getPageList(formData)
  }
  const handleResetForm = () => {
    pageContentRef.value?.getPageList()
  }
  return [pageContentRef, handleQueryForm, handleResetForm]
}

export default usePageSearch
