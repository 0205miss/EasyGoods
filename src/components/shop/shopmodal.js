import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

export default function ShopModal({isOpen,onOpenChange,data}){
    return (
        <Modal isOpen={isOpen} placement="bottom-center" onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    <div className="block">
                        <div >
                            {data.name}
                        </div>
                        <div className={data.opening=='00:00~23:59' ? "!text-sm" : checkopen ? "!text-sm" : "!text-sm"}>
                            {data.opening=='00:00~23:59' ? '24hr' : checkopen ? 'opening': 'close'}
                        </div>
                    </div>
                    
                </ModalHeader>
                <ModalBody>
                    f
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}