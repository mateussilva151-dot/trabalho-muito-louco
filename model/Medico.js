export class Medico {
    constructor({ nome, crm, especialidade }) {
        this.nome = nome;
        this.crm = crm;
        this.especialidade = especialidade;
    }

    validar() {
        if (!this.nome || this.nome.trim().length < 3) {
            throw new Error(`O nome deve conter pelo menos 3 caracteres.`);
        }
        if (!this.crm) {
            throw new Error(`O CRM é obrigatório.`);
        }
        if (!this.especialidade || this.especialidade.trim().length < 3) {
            throw new Error(`A especialidade deve conter pelo menos 3 caracteres.`);
        }
    }

    static validarId(id, nomeRecurso) {
        if (!Number.isInteger(id) <= 0) {
            throw new Error(`O ID ${nomeRecurso} informado deve ser um número inteiro positivo.`);
        }
        return id;
    }
}