export function formatCep(cep) {
    if (cep == "") return;
    const numbers = cep.replace(/\D/g, '').slice(0, 8);
    
    if (numbers.length <= 5) return numbers;
    
    return numbers.replace(/(\d{5})(\d{0,3})/, '$1-$2');
}