import { z } from 'zod';
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./VehicleModal.module.css";
import { useVehicleContext } from "../../../context/vehicleContext";
import { useBranchContext } from "../../../context/branchContext";
import { useAuthContext } from "../../../context/authContext";

export const vehicleSchema = z.object({
    brand: z.string().nonempty("Marca é obrigatório"),
    model: z.string().nonempty("Modelo é obrigatório"),
    version: z.string().nonempty("Versão é obrigatório"),
    year: z.string().nonempty("Ano é obrigatório"),
    gearbox: z.string().nonempty("Câmbio é obrigatório"),
    color: z.string().nonempty("Cor é obrigatório"),
    motorization: z.string().nonempty("Motorização é obrigatório"),
    plate: z.string().nonempty("Placa é obrigatório"),
    km: z.string().nonempty("Km é obrigatório"),
    value: z.string().nonempty("Valor é obrigatório"),
    branchId: z.string().nonempty("Concessionária é obrigatório"),
});

function VehicleModal({ open, onOpenChange, vehicle, refreshVehicle }) {
    const { user } = useAuthContext();
    const { createVehicle, editVehicle, error, success } = useVehicleContext();
    const { branches, getAllBranches } = useBranchContext();

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [version, setVersion] = useState('');
    const [year, setYear] = useState('');
    const [gearbox, setGearbox] = useState('');
    const [color, setColor] = useState('');
    const [motorization, setMotorization] = useState('');
    const [plate, setPlate] = useState('');
    const [km, setKm] = useState('');
    const [value, setValue] = useState('');
    const [branchId, setBranchId] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user.roleId == 1) {
            getAllBranches();
        }
        if (vehicle) {
            setBrand(vehicle.brand);
            setModel(vehicle.model);
            setVersion(vehicle.version);
            setYear(vehicle.year);
            setGearbox(vehicle.gearbox);
            setColor(vehicle.color);
            setMotorization(vehicle.motorization);
            setPlate(vehicle.plate);
            setKm(vehicle.km);
            setValue(vehicle.value);
            setBranchId(String(vehicle.branchId));
        }
    }, [vehicle]);

    function clearForm() {
        setBrand('');
        setModel('');
        setVersion('');
        setYear('');
        setGearbox('');
        setColor('');
        setMotorization('');
        setPlate('');
        setKm('');
        setValue('');
        setBranchId("");
    }

    function validateField(field, value) {
        const singleFieldSchema = vehicleSchema.pick({ [field]: true });
        const result = singleFieldSchema.safeParse({ [field]: value });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: result.success ? undefined : result.error.flatten().fieldErrors[field],
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            brand,
            model,
            version,
            year,
            gearbox,
            color,
            motorization,
            plate,
            km,
            value,
            branchId,
        };

        const result = vehicleSchema.safeParse(data);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors(fieldErrors);
            return;
        }

        try {
            if (!vehicle) {
                await createVehicle(brand, model, version, year, gearbox, color, motorization, plate, km, value, parseInt(branchId));
            } else {
                await editVehicle(parseInt(vehicle.id), brand, model, version, year, gearbox, color, motorization, plate, parseFloat(km), parseFloat(value), parseInt(branchId));
                refreshVehicle();
            }

            clearForm();
            setErrors({});
            onOpenChange(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content aria-describedby="form" align="start">
                <Flex justify="between" align="start" style={{ paddingBottom: "20px" }}>
                    <AlertDialog.Title>{vehicle ? "Editar" : "Cadastrar"} Veículo!</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: 'pointer' }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <form
                    id="vehicle-form"
                    onSubmit={handleSubmit}
                    className={styles.loginForm}
                >
                    <label className="inputLabel">Marca</label>
                    <input
                        id="vehicle-brand"
                        className="input"
                        value={brand}
                        onChange={(e) => {
                            setBrand(e.target.value);
                            validateField("brand", e.target.value);
                        }}
                        type="text"
                        placeholder="Digite a marca..."
                        style={{
                            border: errors.brand ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.brand && <span className="errorMessage">{errors.brand[0]}</span>}

                    <label className="inputLabel">Modelo</label>
                    <input
                        id="vehicle-model"
                        className="input"
                        value={model}
                        onChange={(e) => {
                            setModel(e.target.value);
                            validateField("model", e.target.value);
                        }}
                        type="text"
                        placeholder="Digite o modelo..."
                        style={{
                            border: errors.model ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.model && <span className="errorMessage">{errors.model[0]}</span>}

                    <label className="inputLabel">Versão</label>
                    <input
                        id="vehicle-version"
                        className="input"
                        value={version}
                        onChange={(e) => {
                            setVersion(e.target.value);
                            validateField("version", e.target.value);
                        }}
                        type="text"
                        placeholder="Digite a versão..."
                        style={{
                            border: errors.version ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.version && <span className="errorMessage">{errors.version[0]}</span>}

                    <label className="inputLabel">Ano</label>
                    <input
                        id="vehicle-year"
                        className="input"
                        value={year}
                        onChange={(e) => {
                            setYear(e.target.value);
                            validateField("year", e.target.value);
                        }}
                        type="text"
                        placeholder="Digite o ano..."
                        style={{
                            border: errors.year ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.year && <span className="errorMessage">{errors.year[0]}</span>}

                    <label className="inputLabel">Câmbio</label>
                    <select
                        id="vehicle-gearbox"
                        className="input"
                        value={gearbox}
                        onChange={(e) => {
                            setGearbox(e.target.value);
                            validateField("gearbox", e.target.value);
                        }}
                        style={{
                            border: errors.gearbox ? "1px solid red" : "1px solid #ccc",
                        }}
                    >
                        <option value="">Selecione o câmbio...</option>
                        <option value="Manual">Manual</option>
                        <option value="Automático">Automático</option>
                    </select>
                    {errors.gearbox && <span className="errorMessage">{errors.gearbox[0]}</span>}

                    <label className="inputLabel">Cor</label>
                    <input
                        id="vehicle-color"
                        className="input"
                        value={color}
                        onChange={(e) => {
                            setColor(e.target.value);
                            validateField("color", e.target.value);
                        }}
                        type="text"
                        placeholder="Digite a cor..."
                        style={{
                            border: errors.color ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.color && <span className="errorMessage">{errors.color[0]}</span>}

                    <label className="inputLabel">Motorização</label>
                    <input
                        id="vehicle-motorization"
                        className="input"
                        value={motorization}
                        onChange={(e) => {
                            setMotorization(e.target.value);
                            validateField("motorization", e.target.value);
                        }}
                        type="text"
                        placeholder="Digite a motorização..."
                        style={{
                            border: errors.motorization ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.motorization && <span className="errorMessage">{errors.motorization[0]}</span>}

                    <label className="inputLabel">Placa</label>
                    <input
                        id="vehicle-plate"
                        className="input"
                        value={plate}
                        onChange={(e) => {
                            setPlate(e.target.value);
                            validateField("plate", e.target.value);
                        }}
                        type="text"
                        placeholder="Digite a placa..."
                        style={{
                            border: errors.plate ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.plate && <span className="errorMessage">{errors.plate[0]}</span>}

                    <label className="inputLabel">Quilômetragem</label>
                    <input
                        id="vehicle-km"
                        className="input"
                        value={km}
                        onChange={(e) => {
                            setKm(e.target.value);
                            validateField("km", e.target.value);
                        }}
                        type="text"
                        placeholder="Digite o Km..."
                        style={{
                            border: errors.km ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.km && <span className="errorMessage">{errors.km[0]}</span>}

                    <label className="inputLabel">Valor</label>
                    <input
                        id="vehicle-value"
                        className="input"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            validateField("value", e.target.value);
                        }}
                        type="text"
                        placeholder="Digite o valor..."
                        style={{
                            border: errors.value ? "1px solid red" : "1px solid #ccc",
                        }}
                    />
                    {errors.value && <span className="errorMessage">{errors.value[0]}</span>}

                    {user.roleId === 1 && (
                        <>
                            <label className="inputLabel">Concessionária</label>
                            <select
                                id="vehicle-branch"
                                className="input"
                                value={branchId}
                                onChange={(e) => {
                                    setBranchId(e.target.value);
                                    validateField("branchId", e.target.value);
                                }}
                                style={{
                                    border: errors.branchId ? "1px solid red" : "1px solid #ccc",
                                }}
                            >
                                <option value="">Selecione a concessionária...</option>
                                {branches && branches.map((branch) => (
                                    <option key={branch.id} value={String(branch.id)}>{branch.name}</option>
                                ))}
                            </select>
                            {errors.branchId && <span className="errorMessage">{errors.branchId[0]}</span>}
                        </>
                    )}
                    {error && <span id="vehicle-error" className="errorMessage">{error}</span>}
                    {success && <span id="vehicle-success" className="successMessage">{success}</span>}
                    <Flex justify="end">
                        <Button id="vehicle-submit" type="submit" className={styles.saveButton}>Salvar</Button>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}

export default VehicleModal;