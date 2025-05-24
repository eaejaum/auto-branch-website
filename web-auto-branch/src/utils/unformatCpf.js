export function unformatCpf(cpf) {
    return cpf.replace(/\D/g, '');
};