export function unformatCep(cep) {
    return cep.replace(/\D/g, '');
}