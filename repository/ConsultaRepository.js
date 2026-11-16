import conexao from '../database/conexao.js';

export async function cadastrarConsulta(consulta) {
    const sql = 'INSERT INTO consulta (data_hora, motivo, status_consulta, fk_id_medico, fk_id_paciente) VALUES (?, ?, ?, NULL, NULL)';
    const [result] = await conexao.execute(sql, [consulta.data_hora, consulta.motivo, consulta.status]);
    return result.insertId;
}

export async function listarConsultas() {
    const sql = 'SELECT * FROM consulta';
    const [linhasAfetadas] = await conexao.execute(sql);
    return linhasAfetadas;
}

export async function buscarConsultaPorIdCompleta(id) {
    const sql = `
        SELECT 
            c.id_consulta, c.data_hora, c.motivo, c.status_consulta,
            m.id_medico, m.nome AS medico_nome, m.crm AS medico_crm, m.especialidade AS medico_especialidade,
            p.id_paciente, p.nome AS paciente_nome, p.cpf AS paciente_cpf, p.data_nascimento AS paciente_data_nascimento
        FROM consulta c
        LEFT JOIN medico m ON c.fk_id_medico = m.id_medico
        LEFT JOIN paciente p ON c.fk_id_paciente = p.id_paciente
        WHERE c.id_consulta = ?
    `;
    
    const [linhasAfetadas] = await conexao.execute(sql, [id]);
    
    if (linhasAfetadas.length === 0) return null;
    const row = linhasAfetadas[0];

    return {
        id_consulta: row.id_consulta,
        data_hora: row.data_hora,
        motivo: row.motivo,
        status: row.status,
        medico: row.id_medico ? {
            id_medico: row.id_medico,
            nome: row.medico_nome,
            crm: row.medico_crm,
            especialidade: row.medico_especialidade
        } : null,
        paciente: row.id_paciente ? {
            id_paciente: row.id_paciente,
            nome: row.paciente_nome,
            cpf: row.paciente_cpf,
            data_nascimento: row.paciente_data_nascimento
        } : null
    };
}

export async function atualizarConsulta(id, campos) {
    const chaves = Object.keys(campos);
    if (chaves.length === 0) return false;
    const sets = chaves.map(campo => `${campo} = ?`).join(', ');
    const valores = Object.values(campos);
    const sql = `UPDATE consulta SET ${sets} WHERE id_consulta = ?`;
    const [result] = await conexao.execute(sql, [...valores, id]);
    return result.affectedlinhasAfetadas > 0;
}

export async function vincularMedico(idConsulta, idMedico) {
    const sql = 'UPDATE consulta SET fk_id_medico = ? WHERE id_consulta = ?';
    const [result] = await conexao.execute(sql, [idMedico, idConsulta]);
    return result.affectedlinhasAfetadas > 0;
}

export async function vincularPaciente(idConsulta, idPaciente) {
    const sql = 'UPDATE consulta SET fk_id_paciente = ? WHERE id_consulta = ?';
    const [result] = await conexao.execute(sql, [idPaciente, idConsulta]);
    return result.affectedlinhasAfetadas > 0;
}

export async function excluirConsulta(id) {
    const sql = 'DELETE FROM consulta WHERE id_consulta = ?';
    const [result] = await conexao.execute(sql, [id]);
    return result.affectedlinhasAfetadas > 0;
}
