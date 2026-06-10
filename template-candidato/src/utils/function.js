// formatadores 
export function getNumberFormat(number) {
    return Number(number).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function getPhoneFormat(number) {
    const somenteNumeros = number.replace(/\D/g, ''); 
    
    return somenteNumeros.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
}