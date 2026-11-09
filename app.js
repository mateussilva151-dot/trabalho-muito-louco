import express from 'express';
import medicoRoutes from './routes/MedicoRoutes.js';
import pacienteRoutes from './routes/PacienteRoutes.js';
import consultaRoutes from './routes/ConsultaRoutes.js';

const app = express();

// Middlewares obrigatórios
app.use(express.json());

// Registro de rotas estruturadas
app.use('/medico', medicoRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/consulta', consultaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});

export default app;
