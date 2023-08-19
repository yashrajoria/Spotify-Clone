"use client"

import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal'

const UploadModal = () => {
    const uploadModal = useUploadModal()
    const onChange = (open: boolean) => {
        if (!open) {
            uploadModal.onClose()
        }
    }
    return (
        <Modal title='Add a Song' description='Upload a MP3 file' isOpen={uploadModal.isOpen}
            onChange={onChange}>
            Form
        </Modal>
    )
}

export default UploadModal