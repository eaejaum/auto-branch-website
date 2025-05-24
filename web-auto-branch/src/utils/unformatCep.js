export function unformatCep(cep) {
    if (!cep) return '';
    return cep.replace(/\D/g, '');
}