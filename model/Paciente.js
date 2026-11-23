export class Paciente {
    constructor({ nome, cpf, data_nascimento }) {
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
    }

    validar() {
        if (!this.nome || this.nome.trim().length < 3) {
            throw new Error(`O nome deve conter pelo menos 3 caracteres.`);
        };
        if (!this.cpf || this.cpf.trim().length !== 11) {
            throw new Error(`O cpf é obrigatório. O cpf deve conter 11 caracteres!`);
        };
        if (!this.data_nascimento) {
            throw new Error(`A especialidade deve conter pelo menos 3 caracteres.`);
        };
    }

    static validarId(id, nomeRecurso) {
        if (!Number.isInteger(id) <= 0) {
            throw new Error(`O ID ${nomeRecurso} informado deve ser um número inteiro positivo.`);
        }
        return id;
    }
}
