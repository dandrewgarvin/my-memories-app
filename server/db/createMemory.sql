INSERT INTO memories (sending_user_id, receiving_user_id, memory_title, memory_text, memory_date, img_url, submission_date, is_opened)
VALUES ($1, $2, $3, $4, $5, $6, $7, false)
RETURNING *;

SELECT * FROM users
WHERE id = $2;