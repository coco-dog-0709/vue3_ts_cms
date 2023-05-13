import { ref } from 'vue'
import PageModal from '@/components/page-modal'
type CallBackFn = (item?: any) => void

export default function (addCb: CallBackFn, editCb: CallBackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const modalData = ref({})
  const handleAddClick = () => {
    modalData.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    addCb && addCb()
  }

  const handleEditClick = (item: any) => {
    modalData.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }

  return [handleAddClick, handleEditClick, modalData, pageModalRef]
}
