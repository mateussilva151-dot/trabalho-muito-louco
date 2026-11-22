import { Router } from 'express';
import { 
    criarMedico, listarTodosMedicos, listarMedicoPorId, editarMedico, deletarMedico 
} from '../controller/MedicoController.js';

const router = Router();

router.post('/', criarMedico);
router.get('/', listarTodosMedicos);
router.get('/:id', listarMedicoPorId);
router.patch('/:id', editarMedico);
router.delete('/:id', deletarMedico);

export default router;
