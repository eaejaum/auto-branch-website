import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState } from "react";
import styles from "./CreateVehicleModal.module.css";
import { formatCurrency } from "../../../utils/formatCurrency";

function CreateVehicleModal({ open, onOpenChange }) {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [version, setVersion] = useState('');
    const [gearbox, setGearbox] = useState('');
    const [color, setColor] = useState('');
    const [motorization, setMotorization] = useState('');
    const [plate, setPlate] = useState('');
    const [value, setValue] = useState('');

    function clearForm() {

    }

    function handleChangeCurrency(e) {
        const input = e.target.value;
        const numbers = formatCurrency(input);

        setValue(numbers);
    }

    async function handleCreateVehicle(e) {
        e.preventDefault();
        try {
            console.log('foi');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content align="start">
                <Flex justify="between" align="start" style={{ paddingBottom: "20px" }}>
                    <AlertDialog.Title>Cadastrar Compra!</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: 'pointer' }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <form
                    onSubmit={handleCreateVehicle}
                    className={styles.loginForm}
                >
                    <label className="inputLabel">Marca</label>
                    <input
                        className="input"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        type="text"
                        placeholder="Digite a marca..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Modelo</label>
                    <input
                        className="input"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        type="text"
                        placeholder="Digite o modelo..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Versão</label>
                    <input
                        className="input"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        type="text"
                        placeholder="Digite a versão..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Câmbio</label>
                    <select
                        className="input"
                        value={gearbox}
                        onChange={(e) => setGearbox(e.target.value)}
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    >
                        <option value="">Selecione o câmbio...</option>
                        <option value="Manual">Manual</option>
                        <option value="Automático">Automático</option>
                    </select>

                    <label className="inputLabel">Cor</label>
                    <input
                        className="input"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        type="text"
                        placeholder="Digite a cor..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Motorização</label>
                    <input
                        className="input"
                        value={motorization}
                        onChange={(e) => setMotorization(e.target.value)}
                        type="text"
                        placeholder="Digite a motorização..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Placa</label>
                    <input
                        className="input"
                        value={plate}
                        onChange={(e) => setPlate(e.target.value)}
                        type="text"
                        placeholder="Digite a placa..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Valor</label>
                    <input
                        className="input"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                        placeholder="Digite o valor..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <Flex justify="end">
                        <AlertDialog.Action>
                            <Button type="submit" className={styles.saveButton}>Salvar</Button>
                        </AlertDialog.Action>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root >
    );
}

export default CreateVehicleModal;