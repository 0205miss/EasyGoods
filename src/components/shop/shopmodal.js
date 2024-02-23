import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

export default function ShopModal({isOpen,onOpenChange,data}){
    return (
        <Modal isOpen={isOpen} placement="bottom-center" onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>{data.name}</ModalHeader>
                <ModalBody>
                    f
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}