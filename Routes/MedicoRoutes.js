import { Router } from 'express';
import { 
    postMedico, getMedicos, getMedicoId, patchMedico, deleteMedico 
} from '../controller/MedicoController.js';

const router = Router();

router.post('/', postMedico);
router.get('/', getMedicos);
router.get('/:id', getMedicoId);
router.patch('/:id', patchMedico);
router.delete('/:id', deleteMedico);

export default router;
