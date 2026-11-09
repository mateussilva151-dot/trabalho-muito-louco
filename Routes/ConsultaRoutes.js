import { Router } from 'express';
import { 
    postConsulta, getConsultas, getConsultaId, patchConsulta, deleteConsulta,
    patchVincularMedico, patchRemoverMedico, patchVincularPaciente, patchRemoverPaciente
} from '../controller/ConsultaController.js';

const router = Router();

// CRUD Comum
router.post('/', postConsulta);
router.get('/', getConsultas);
router.get('/:id', getConsultaId);
router.patch('/:id', patchConsulta);
router.delete('/:id', deleteConsulta);

// Relacionamentos
router.patch('/:idConsulta/medico/:idMedico', patchVincularMedico);
router.patch('/:idConsulta/remover-medico', patchRemoverMedico);
router.patch('/:idConsulta/paciente/:idPaciente', patchVincularPaciente);
router.patch('/:idConsulta/remover-paciente', patchRemoverPaciente);

export default router;
