import React from 'react'
import { Dialog } from 'radix-ui'

interface DialogPopUpProps {
  isOpen: boolean;
  details: {
    title?: string;
    description?: string;
    content?: React.ReactNode;
  };
  onClose: () => void;
  closeText?:string
}

 const DialogPopUp = ({isOpen, details, onClose,closeText="Close"}: DialogPopUpProps) => {
  const {title, description, content} = details;
  return (
    <Dialog.Root open={isOpen}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 z-50 bg-white rounded-lg shadow-lg p-3 -translate-x-1/2 -translate-y-1/2 min-w-3/4 md:min-w-[320px] max-w-[700px] max-h-[80vh] overflow-y-auto">
        <Dialog.Title className="text-lg font-bold mb-2 text-center">{title}</Dialog.Title>
        <Dialog.Description className="mb-4 text-center">{description}</Dialog.Description>
        {content}
        <Dialog.Close asChild>
          <div className="flex justify-center items-center w-full">
          <button onClick={()=>onClose()} className="mt-2 px-4 py-2 bg-main-venice text-white rounded hover:bg-primary/80 outline-none">
            {closeText}
          </button>
          </div>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  )
}

export default DialogPopUp;