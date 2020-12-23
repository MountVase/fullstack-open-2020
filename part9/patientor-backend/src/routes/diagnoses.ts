import express from 'express';
import diagnoseService from '../services/diagnoseService';

import { Diagnose } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const result : Diagnose[] = diagnoseService.getAll();
    res.send(result);
});


export default router;