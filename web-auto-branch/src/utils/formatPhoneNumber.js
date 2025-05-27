export function formatPhoneNumber(phoneNumber) {
    if (phoneNumber == "") return;
    const numbers = phoneNumber.replace(/\D/g, '');

    if (numbers.length <= 2) return numbers;

    if (numbers.length <= 6) {
        return numbers.replace(/(\d{2})(\d{0,4})/, '($1) $2');
    }

    if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }

    return numbers.replace(/(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
};