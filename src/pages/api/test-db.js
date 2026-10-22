import { query } from '../../lib/db';

export default async function handler(req, res) {
  try {
    const result = await query('SELECT NOW() as current_time, count(*) as total_lands FROM lands');
    res.status(200).json({ 
      success: true, 
      message: 'PostgreSQL டேட்டாபேஸ் வெற்றிகரமாக இணைந்துவிட்டது!',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}