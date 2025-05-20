import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { X } from "lucide-react";

function RegisterSuccessDialog({ open, onOpenChange }) {
    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content align="start">
                <Flex justify="between" align="start">
                    <AlertDialog.Title>Sucesso!</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: 'pointer' }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <AlertDialog.Description style={{ color: "#2E2D37", fontSize: '14px' }}>Funcionário cadastrado com sucesso. Agora ele(a) já pode fazer login.</AlertDialog.Description>
            </AlertDialog.Content>
        </AlertDialog.Root >
    );
}

export default RegisterSuccessDialog;