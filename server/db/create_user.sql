INSERT INTO users 
(first_name, last_name, email, phone, user_can_text, 
notification_preference, user_auth_id, user_type)
VALUES ($1, $2, $3, null, false, 2, $4, 'member')
RETURNING *;