export function convertTextSituacaoOrdem(status) {
    switch (status) {
        case 'P':
            return 'PENDENTE';

        case 'A':
            return 'EM ANDAMENTO';

        case 'F':
            return 'FINALIZADA';

        case 'C':
            return 'CANCELADA';

        default:
            return 'OUTRA';
    }
}

export function convertSiglaSituacaoOrdem(status) {
    switch (status) {
        case 'PENDENTE':
            return 'P';

        case 'EM ANDAMENTO':
            return 'A';

        case 'FINALIZADA':
            return 'F';

        case 'CANCELADA':
            return 'C';

        default:
            return 'P';
    }
}

export function convertTextNovaSituacaoOrdem(status) {
    switch (status) {
        case 'P':
            return 'MARCAR PENDENTE';

        case 'A':
            return 'MARCAR EM ANDAMENTO';

        case 'F':
            return 'FINALIZAR';

        case 'C':
            return 'CANCELAR';

        default:
            return 'OUTRA';
    }
}

export function convertColorSituacaoOrdem(status) {
    switch (status) {
        case "P":
        case "PENDENTE":
            return "#7B3FE080";
        case "A":
        case "EM ANDAMENTO":
            return "#1d4ed8";
        case "F":
        case "FINALIZADA":
            return "#047857";
        case "C":
        case "CANCELADA":
            return "#ed3838";
        default:
            return "";
    }
}