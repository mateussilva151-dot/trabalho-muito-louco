import conexao from '../database/conexao.js';

export async function cadastrarMedico(medico) {
    const sql = 'INSERT INTO medico (nome, crm, especialidade) VALUES (?, ?, ?)';
    const [result] = await conexao.execute(sql, [medico.nome, medico.crm, medico.especialidade]);
    return result.insertId;
}

export async function listarMedicos() {
    const sql = 'SELECT * FROM medico';
    const [rows] = await conexao.execute(sql);
    return rows;
}

export async function buscarMedicoPorId(id) {
    const sql = 'SELECT * FROM medico WHERE id_medico = ?';
    const [rows] = await conexao.execute(sql, [id]);
    return rows[0] || null;
}

export async function buscarMedicoPorCrm(crm) {
    const sql = 'SELECT * FROM medico WHERE crm = ?';
    const [rows] = await conexao.execute(sql, [crm]);
    return rows[0] || null;
}

export async function atualizarMedico(id, campos) {
    const chaves = Object.keys(campos);
    if (chaves.length === 0) return false;
    const sets = chaves.map(campo => `${campo} = ?`).join(', ');
    const valores = Object.values(campos);
    const sql = `UPDATE medico SET ${sets} WHERE id_medico = ?`;
    const [result] = await conexao.execute(sql, [...valores, id]);
    return result.affectedRows > 0;
}

export async function excluirMedico(id) {
    const sql = 'DELETE FROM medico WHERE id_medico = ?';
    const [result] = await conexao.execute(sql, [id]);
    return result.affectedRows > 0;
}
