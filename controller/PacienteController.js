import { Paciente } from '../model/Paciente.js';
import { 
    criarPaciente, listarPacientes, buscarPacientePorId, 
    buscarPacientePorCpf, atualizarPaciente, excluirPaciente 
} from '../repository/PacienteRepository.js';

export async function postPaciente(req, res) {
    try {
        const modelInstance = new Paciente(req.body);
        modelInstance.validar();

        const cpfExistente = await buscarPacientePorCpf(modelInstance.cpf);
        if (cpfExistente) {
            return res.status(409).json({ erro: 'CPF já cadastrado no sistema.' });
        }

        const id = await criarPaciente(modelInstance);
        return res.status(201).json({ id_paciente: id, ...modelInstance });
    } catch (err) {
        if (err.message.includes('caracteres') || err.message.includes('obrigatória')) {
            return res.status(400).json({ erro: err.message });
        }
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function getPacientes(req, res) {
    try {
        const pacientes = await listarPacientes();
        return res.status(200).json(pacientes);
    } catch (err) {
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function getPacienteId(req, res) {
    try {
        const id = Paciente.validarId(req.params.id);
        const paciente = await buscarPacientePorId(id);
        if (!paciente) return res.status(404).json({ erro: 'Paciente não encontrado.' });
        return res.status(200).json(paciente);
    } catch (err) {
        if (err.message.includes('positivo')) return res.status(400).json({ erro: err.message });
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function patchPaciente(req, res) {
    try {
        const id = Paciente.validarId(req.params.id);
        const { nome, cpf, data_nascimento } = req.body;

        const camposParaAtualizar = {};
        if (nome !== undefined) camposParaAtualizar.nome = nome;
        if (cpf !== undefined) camposParaAtualizar.cpf = cpf;
        if (data_nascimento !== undefined) camposParaAtualizar.data_nascimento = data_nascimento;

        const mockParaValidar = new Paciente({
            nome: nome !== undefined ? nome : 'Valido',
            cpf: cpf !== undefined ? cpf : '11122233344',
            data_nascimento: data_nascimento !== undefined ? data_nascimento : '2000-01-01'
        });
        mockParaValidar.validar();

        if (cpf) {
            const cpfExistente = await buscarPacientePorCpf(cpf);
            if (cpfExistente && cpfExistente.id_paciente !== id) {
                return res.status(409).json({ erro: 'CPF já cadastrado por outro paciente.' });
            }
        }

        const atualizado = await atualizarPaciente(id, camposParaAtualizar);
        if (!atualizado) return res.status(404).json({ erro: 'Paciente não encontrado.' });

        return res.status(200).json({ mensagem: 'Paciente atualizado com sucesso.' });
    } catch (err) {
        if (err.message.includes('caracteres') || err.message.includes('positivo') || err.message.includes('obrigatória')) {
            return res.status(400).json({ erro: err.message });
        }
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function deletePaciente(req, res) {
    try {
        const id = Paciente.validarId(req.params.id);
        const excluido = await excluirPaciente(id);
        if (!excluido) return res.status(404).json({ erro: 'Paciente não encontrado.' });
        return res.status(200).json({ mensagem: 'Paciente excluído com sucesso.' });
    } catch (err) {
        if (err.message.includes('positivo')) return res.status(400).json({ erro: err.message });
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}
