import { Medico } from '../model/Medico.js';
import { 
    cadastrarMedico, listarMedicos, buscarMedicoPorId, 
    buscarMedicoPorCrm, atualizarMedico, excluirMedico 
} from '../repository/MedicoRepository.js';

export async function criarMedico(req, res) {
    try {
        const {nome, crm, especialidade} = req.body;

        crm = await buscarMedicoPorCrm(crm);
        if (crm) {
            return res.status(409).json({ erro: 'CRM já cadastrado no sistema.' });
        }
        
        const medico = new Medico(nome, crm, especialidade);
        medico.validar();

        const id = await cadastrarMedico(medico);
        return res.status(201).json({ id_medico: id, ...medico });
    } catch (erro) {
            return res.status(400).json({ erro: erro.message });
        }
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
}

export async function listarTodosMedicos(req, res) {
    try {
        const medicos = await listarMedicos();
        return res.status(200).json(medicos);
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Não foi possivel listar os medicos' });
    }
}

export async function listarMedicoPorId(req, res) {
    try {
        const id = Medico.validarId(req.params.id);
        const medico = await buscarMedicoPorId(id);
        if (!medico) return res.status(404).json({ mensagem: 'Médico não encontrado.' });
        return res.status(200).json(medico);
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

export async function editarMedico(req, res) {
    try {
        const id = Medico.validarId(req.params.id);
        const { nome, crm, especialidade } = req.body;
        
        const camposParaAtualizar = {};
        if (nome !== undefined) camposParaAtualizar.nome = nome;
        if (crm !== undefined) camposParaAtualizar.crm = crm;
        if (especialidade !== undefined) camposParaAtualizar.especialidade = especialidade;

        const mockParaValidar = new Medico({
            nome: nome !== undefined ? nome : 'Valido',
            crm: crm !== undefined ? crm : 'Valido',
            especialidade: especialidade !== undefined ? especialidade : 'Valido'
        });
        mockParaValidar.validar();

        if (crm) {
            const crmExistente = await buscarMedicoPorCrm(crm);
            if (crmExistente && crmExistente.id_medico !== id) {
                return res.status(409).json({ mensagem: 'CRM já cadastrado por outro médico.' });
            }
        }

        const atualizado = await atualizarMedico(id, camposParaAtualizar);
        if (!atualizado) return res.status(404).json({ mensagem: 'Médico não encontrado.' });

        return res.status(200).json({ mensagem: 'Médico atualizado com sucesso.' });
    } catch (erro) {
        if (erro.message.includes('caracteres') || erro.message.includes('positivo')) {
            return res.status(400).json({ mensagem: erro.message });
        }
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

export async function deletarMedico(req, res) {
    try {
        const id = Medico.validarId(req.params.id);
        const medico = await excluirMedico(id);

        if (!medico) return res.status(404).json({ mensagem: 'Médico não encontrado.' });

        return res.status(200).json({ mensagem: 'Médico excluído com sucesso.' });
    } catch (erro) {
        if (erro.message.includes('positivo')) return res.status(400).json({ mensagem: erro.message });
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}
