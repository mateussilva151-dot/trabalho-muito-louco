import pool from '../database/conexao.js';

export async function criarMedico(medico) {
    const query = 'INSERT INTO medico (nome, crm, especialidade) VALUES (?, ?, ?)';
    const [result] = await pool.execute(query, [medico.nome, medico.crm, medico.especialidade]);
    return result.insertId;
}

export async function listarMedicos() {
    const query = 'SELECT * FROM medico';
    const [rows] = await pool.execute(query);
    return rows;
}

export async function buscarMedicoPorId(id) {
    const query = 'SELECT * FROM medico WHERE id_medico = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
}

export async function buscarMedicoPorCrm(crm) {
    const query = 'SELECT * FROM medico WHERE crm = ?';
    const [rows] = await pool.execute(query, [crm]);
    return rows[0] || null;
}

export async function atualizarMedico(id, campos) {
    const chaves = Object.keys(campos);
    if (chaves.length === 0) return false;
    const sets = chaves.map(campo => `${campo} = ?`).join(', ');
    const valores = Object.values(campos);
    const query = `UPDATE medico SET ${sets} WHERE id_medico = ?`;
    const [result] = await pool.execute(query, [...valores, id]);
    return result.affectedRows > 0;
}

export async function excluirMedico(id) {
    const query = 'DELETE FROM medico WHERE id_medico = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
}
