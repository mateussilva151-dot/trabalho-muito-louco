import { Medico } from '../model/Medico.js';
import { 
    criarMedico, listarMedicos, buscarMedicoPorId, 
    buscarMedicoPorCrm, atualizarMedico, excluirMedico 
} from '../repository/MedicoRepository.js';

export async function postMedico(req, res) {
    try {
        const modelInstance = new Medico(req.body);
        modelInstance.validar();

        const crmExistente = await buscarMedicoPorCrm(modelInstance.crm);
        if (crmExistente) {
            return res.status(409).json({ erro: 'CRM já cadastrado no sistema.' });
        }

        const id = await criarMedico(modelInstance);
        return res.status(201).json({ id_medico: id, ...modelInstance });
    } catch (err) {
        if (err.message.includes('caracteres') || err.message.includes('obrigatório')) {
            return res.status(400).json({ erro: err.message });
        }
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function getMedicos(req, res) {
    try {
        const medicos = await listarMedicos();
        return res.status(200).json(medicos);
    } catch (err) {
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function getMedicoId(req, res) {
    try {
        const id = Medico.validarId(req.params.id);
        const medico = await buscarMedicoPorId(id);
        if (!medico) return res.status(404).json({ erro: 'Médico não encontrado.' });
        return res.status(200).json(medico);
    } catch (err) {
        if (err.message.includes('positivo')) return res.status(400).json({ erro: err.message });
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function patchMedico(req, res) {
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
                return res.status(409).json({ erro: 'CRM já cadastrado por outro médico.' });
            }
        }

        const atualizado = await atualizarMedico(id, camposParaAtualizar);
        if (!atualizado) return res.status(404).json({ erro: 'Médico não encontrado.' });

        return res.status(200).json({ mensagem: 'Médico atualizado com sucesso.' });
    } catch (err) {
        if (err.message.includes('caracteres') || err.message.includes('positivo')) {
            return res.status(400).json({ erro: err.message });
        }
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function deleteMedico(req, res) {
    try {
        const id = Medico.validarId(req.params.id);
        const excluido = await excluirMedico(id);
        if (!excluido) return res.status(404).json({ erro: 'Médico não encontrado.' });
        return res.status(200).json({ mensagem: 'Médico excluído com sucesso.' });
    } catch (err) {
        if (err.message.includes('positivo')) return res.status(400).json({ erro: err.message });
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}
