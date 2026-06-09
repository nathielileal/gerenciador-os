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