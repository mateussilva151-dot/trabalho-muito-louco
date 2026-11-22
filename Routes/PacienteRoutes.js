import { Router } from 'express';
import { 
    criarPaciente, listarTodosPacientes, listarPacientePorId, EditarPaciente, deletarPaciente 
} from '../controller/PacienteController.js';

const router = Router();

router.post('/', criarPaciente);
router.get('/', listarTodosPacientes);
router.get('/:id', listarPacientePorId);
router.patch('/:id', EditarPaciente);
router.delete('/:id', deletarPaciente);

export default router;
