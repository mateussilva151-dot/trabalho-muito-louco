import { Router } from 'express';
import { 
    criarConsulta, listarTodasConsultas, listarConsultaPorId, editarConsulta, deletarConsulta,
    adicionarVincularMedico, removerVinculoMedico, adicionarVinculoPaciente, removerVinculoPaciente
} from '../controller/ConsultaController.js';

const router = Router();

// CRUD Comum
router.post('/', criarConsulta);
router.get('/', listarTodasConsultas);
router.get('/:id', listarConsultaPorId);
router.patch('/:id', editarConsulta);
router.delete('/:id', deletarConsulta);

// Relacionamentos
router.patch('/:idConsulta/medico/:idMedico', adicionarVincularMedico);
router.patch('/:idConsulta/remover-medico', removerVinculoMedico);
router.patch('/:idConsulta/paciente/:idPaciente', adicionarVinculoPaciente);
router.patch('/:idConsulta/remover-paciente', removerVinculoPaciente);

export default router;
