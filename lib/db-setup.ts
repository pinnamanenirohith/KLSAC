import pool from './db';

export async function ensureSACTables() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS website_approvals (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      content_type  ENUM('activity','report','club','announcement') NOT NULL,
      content_id    VARCHAR(100) NOT NULL,
      status        ENUM('pending','approved','denied') DEFAULT 'pending',
      approved_by   VARCHAR(100),
      approved_at   TIMESTAMP NULL,
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      notes         TEXT,
      UNIQUE KEY unique_content (content_type, content_id)
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS sac_announcements (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      title       VARCHAR(255) NOT NULL,
      content     TEXT NOT NULL,
      type        ENUM('general','urgent','event') DEFAULT 'general',
      created_by  VARCHAR(100),
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expires_at  TIMESTAMP NULL,
      is_active   BOOLEAN DEFAULT TRUE
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS sac_admins (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      username      VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name          VARCHAR(255),
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
