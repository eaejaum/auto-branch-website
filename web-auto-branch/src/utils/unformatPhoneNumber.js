export function unformatPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/\D/g, '');
}