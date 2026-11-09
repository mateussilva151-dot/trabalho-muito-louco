export class Paciente {
    constructor({ nome, cpf, data_nascimento }) {
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
    }

    validar() {
        if (!this.nome || typeof this.nome !== 'string' || this.nome.trim().length < 3) {
            throw new Error('O nome deve conter pelo menos 3 caracteres.');
        }
        if (!this.cpf || typeof this.cpf !== 'string' || !/^\d{11}$/.test(this.cpf)) {
            throw new Error('O CPF deve possuir exatamente 11 caracteres numéricos.');
        }
        if (!this.data_nascimento || isNaN(Date.parse(this.data_nascimento))) {
            throw new Error('A data de nascimento é obrigatória e deve ser uma data válida.');
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
