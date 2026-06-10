// formatadores 
export function getNumberFormat(number) {
    return Number(number).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// export function getPhoneFormat(number) {
//     const somenteNumeros = number.replace(/\D/g, ''); 
    
//     return somenteNumeros.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
// }

export function getPhoneFormat(value) {
    const telefone = value.replace(/\D/g, "").slice(0, 11);

    if (telefone.length <= 10) {
        return telefone.replace(
            /^(\d{0,2})(\d{0,4})(\d{0,4})$/,
            (_, ddd, parte1, parte2) =>
                `${ddd ? `(${ddd}` : ""}${ddd.length === 2 ? ") " : ""}${parte1}${parte2 ? "-" + parte2 : ""}`
        );
    }

    return telefone.replace(
        /^(\d{2})(\d{5})(\d{0,4})$/,
        "($1) $2-$3"
    );
}

// validadores
export function isTelefoneValido(value) {
    const telefone = value.replace(/\D/g, "");

    return telefone.length === 10 || telefone.length === 11;
}