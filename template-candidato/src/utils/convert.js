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
            return "#7B3FE080";
        case "A":
            return "#1d4ed8";
        case "F":
            return "#047857";
        case "C":
            return "#ed3838";
        default:
            return "";
    }
}