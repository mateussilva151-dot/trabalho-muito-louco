import { Router } from 'express';
import { 
    postPaciente, getPacientes, getPacienteId, patchPaciente, deletePaciente 
} from '../controller/PacienteController.js';

const router = Router();

router.post('/', postPaciente);
router.get('/', getPacientes);
router.get('/:id', getPacienteId);
router.patch('/:id', patchPaciente);
router.delete('/:id', deletePaciente);

export default router;
