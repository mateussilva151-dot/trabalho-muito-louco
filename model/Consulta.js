export class Consulta {
    constructor({ data_hora, motivo, status }) {
        this.data_hora = data_hora;
        this.motivo = motivo;
        this.status = status;
    }

    validar() {
        if (!this.data_hora || isNaN(Date.parse(this.data_hora))) {
            throw new Error('A data e hora são obrigatórias e devem ser válidas.');
        }
        if (!this.motivo || typeof this.motivo !== 'string' || this.motivo.trim().length < 5) {
            throw new Error('O motivo deve conter pelo menos 5 caracteres.');
        }
        const statusPermitidos = ['rascunho', 'agendada', 'concluida', 'cancelada'];
        if (!this.status || !statusPermitidos.includes(this.status)) {
            throw new Error('O status deve ser rascunho, agendada, concluida ou cancelada.');
        }
    }

    static validarId(id) {
        const parsed = Number(id);
        if (!Number.isInteger(parsed) || parsed <= 0) {
            throw new Error('O ID informado deve ser um número inteiro positivo.');
        }
        return parsed;
    }
}
