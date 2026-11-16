import express from 'express';
import medicoRoutes from './routes/MedicoRoutes.js';
import pacienteRoutes from './routes/PacienteRoutes.js';
import consultaRoutes from './routes/ConsultaRoutes.js';
import conexao from './database/conexao.js';

const app = express();

// Middlewares obrigatórios
app.use(express.json());

// Registro de rotas estruturadas
app.use('/medico', medicoRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/consulta', consultaRoutes);

async function iniciarServidor() {
    try {
        await conexao.execute("SELECT 1");
        console.log("Banco de dados conectado");

        app.listen(process.env.PORT, () => {
            console.log(`API executando em HTTP://localhost:${process.env.PORT}`);
        });
    } catch (erro) {
        console.log("Não foi possivel conectar ao banco de dados");
    };
};

iniciarServidor();