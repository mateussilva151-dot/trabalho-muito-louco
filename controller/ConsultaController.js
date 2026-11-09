import { Consulta } from '../model/Consulta.js';
import { Medico } from '../model/Medico.js';
import { Paciente } from '../model/Paciente.js';
import { 
    criarConsulta, listarConsultas, buscarConsultaPorIdCompleta, 
    atualizarConsulta, vincularMedico, vincularPaciente, excluirConsulta 
} from '../repository/ConsultaRepository.js';
import { buscarMedicoPorId } from '../repository/MedicoRepository.js';
import { buscarPacientePorId } from '../repository/PacienteRepository.js';

export async function postConsulta(req, res) {
    try {
        // Ignora chaves estrangeiras enviadas diretamente no corpo
        const { data_hora, motivo, status } = req.body;
        const modelInstance = new Consulta({ data_hora, motivo, status });
        modelInstance.validar();

        const id = await criarConsulta(modelInstance);
        return res.status(201).json({ id_consulta: id, ...modelInstance, fk_id_medico: null, fk_id_paciente: null });
    } catch (err) {
        if (err.message.includes('obrigatórias') || err.message.includes('caracteres') || err.message.includes('status')) {
            return res.status(400).json({ erro: err.message });
        }
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function getConsultas(req, res) {
    try {
        const consultas = await listarConsultas();
        return res.status(200).json(consultas);
    } catch (err) {
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function getConsultaId(req, res) {
    try {
        const id = Consulta.validarId(req.params.id);
        const consulta = await buscarConsultaPorIdCompleta(id);
        if (!consulta) return res.status(404).json({ erro: 'Consulta não encontrada.' });
        return res.status(200).json(consulta);
    } catch (err) {
        if (err.message.includes('positivo')) return res.status(400).json({ erro: err.message });
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function patchConsulta(req, res) {
    try {
        const id = Consulta.validarId(req.params.id);
        const { data_hora, motivo, status } = req.body;

        const camposParaAtualizar = {};
        if (data_hora !== undefined) camposParaAtualizar.data_hora = data_hora;
        if (motivo !== undefined) camposParaAtualizar.motivo = motivo;
        if (status !== undefined) camposParaAtualizar.status = status;

        const mockParaValidar = new Consulta({
            data_hora: data_hora !== undefined ? data_hora : '2026-01-01 10:00:00',
            motivo: motivo !== undefined ? motivo : 'Valido',
            status: status !== undefined ? status : 'rascunho'
        });
        mockParaValidar.validar();

        const atualizado = await atualizarConsulta(id, camposParaAtualizar);
        if (!atualizado) return res.status(404).json({ erro: 'Consulta não encontrada.' });

        return res.status(200).json({ mensagem: 'Consulta atualizada com sucesso.' });
    } catch (err) {
        if (err.message.includes('caracteres') || err.message.includes('positivo') || err.message.includes('status')) {
            return res.status(400).json({ erro: err.message });
        }
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function patchVincularMedico(req, res) {
    try {
        const idConsulta = Consulta.validarId(req.params.idConsulta);
        const idMedico = Medico.validarId(req.params.idMedico);

        const consulta = await buscarConsultaPorIdCompleta(idConsulta);
        if (!consulta) return res.status(404).json({ erro: 'Consulta não encontrada.' });

        const medico = await buscarMedicoPorId(idMedico);
        if (!medico) return res.status(404).json({ erro: 'Médico não encontrado.' });

        await vincularMedico(idConsulta, idMedico);
        return res.status(200).json({ mensagem: 'Médico vinculado com sucesso à consulta.' });
    } catch (err) {
        if (err.message.includes('positivo')) return res.status(400).json({ erro: err.message });
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function patchRemoverMedico(req, res) {
    try {
        const idConsulta = Consulta.validarId(req.params.idConsulta);
        const consulta = await buscarConsultaPorIdCompleta(idConsulta);
        if (!consulta) return res.status(404).json({ erro: 'Consulta não encontrada.' });

        await vincularMedico(idConsulta, null);
        return res.status(200).json({ mensagem: 'Vínculo do médico removido com sucesso.' });
    } catch (err) {
        if (err.message.includes('positivo')) return res.status(400).json({ erro: err.message });
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function patchVincularPaciente(req, res) {
    try {
        const idConsulta = Consulta.validarId(req.params.idConsulta);
        const idPaciente = Paciente.validarId(req.params.idPaciente);

        const consulta = await buscarConsultaPorIdCompleta(idConsulta);
        if (!consulta) return res.status(404).json({ erro: 'Consulta não encontrada.' });

        const paciente = await buscarPacientePorId(idPaciente);
        if (!paciente) return res.status(404).json({ erro: 'Paciente não encontrado.' });

        await vincularPaciente(idConsulta, idPaciente);
        return res.status(200).json({ mensagem: 'Paciente vinculado com sucesso à consulta.' });
    } catch (err) {
        if (err.message.includes('positivo')) return res.status(400).json({ erro: err.message });
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function patchRemoverPaciente(req, res) {
    try {
        const idConsulta = Consulta.validarId(req.params.idConsulta);
        const consulta = await buscarConsultaPorIdCompleta(idConsulta);
        if (!consulta) return res.status(404).json({ erro: 'Consulta não encontrada.' });

        await vincularPaciente(idConsulta, null);
        return res.status(200).json({ mensagem: 'Vínculo do paciente removido com sucesso.' });
    } catch (err) {
        if (err.message.includes('positivo')) return res.status(400).json({ erro: err.message });
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

export async function deleteConsulta(req, res) {
    try {
        const id = Consulta.validarId(req.params.id);
        const excluido = await excluirConsulta(id);
        if (!excluido) return res.status(404).json({ erro: 'Consulta não encontrada.' });
        return res.status(200).json({ mensagem: 'Consulta excluída com sucesso.' });
    } catch (err) {
        if (err.message.includes('positivo')) return res.status(400).json({ erro: err.message });
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}
