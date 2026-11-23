export class Consulta {
    constructor({ data_hora, motivo, status }) {
        this.data_hora = data_hora;
        this.motivo = motivo;
        this.status = status;
    }

    validar() {
        if (!this.data_hora) {
            throw new Error('Data e hora deve estar preenchidos...')
        }
        if (!this.motivo || this.motivo.trim().length < 5) {
            throw new Error('O motivo deve conter pelo menos 5 caracteres.');
        }
        if (!['rascunho', 'agendada', 'concluida', 'cancelada'].includes(this.status)) {
            throw new Error('status invalido, deve conter ou rascunho ou agendada ou concluida ou cancelada...');
        }
    }

    static validarId(id, nomeRecurso) {
        if (!Number.isInteger(id) <= 0) {
            throw new Error(`O ID do ${nomeRecurso} informado deve ser um número inteiro positivo.`);
        }
        return id;
    }
}

