export class Medico {
    constructor({ nome, crm, especialidade }) {
        this.nome = nome;
        this.crm = crm;
        this.especialidade = especialidade;
    }

    validar() {
        if (!this.nome || typeof this.nome !== 'string' || this.nome.trim().length < 3) {
            throw new Error('O nome deve conter pelo menos 3 caracteres.');
        }
        if (!this.crm || typeof this.crm !== 'string' || this.crm.trim().length === 0) {
            throw new Error('O CRM é obrigatório.');
        }
        if (!this.especialidade || typeof this.especialidade !== 'string' || this.especialidade.trim().length < 3) {
            throw new Error('A especialidade deve conter pelo menos 3 caracteres.');
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
