import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import { X } from "lucide-react";

function DeleteModal({ open, onOpenChange, handleSubmit, message, title }) {
    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content aria-describedby="form" align="start">
                <Flex justify="between" align="start" style={{ paddingBottom: "20px" }}>
                    <AlertDialog.Title>Deletar {title}</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: 'pointer' }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <Text>{message}</Text>
                <Flex justify="end">
                    <AlertDialog.Action>
                        <Button variant="soft" style={{ background: "#F3123C", color: "white", cursor: "pointer" }} onClick={handleSubmit}>Deletar</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteModal;