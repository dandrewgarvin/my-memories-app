UPDATE users
SET first_name = $1, last_name = $2, email = $3, phone = $4, notification_preference = $5
WHERE id = $6
RETURNING *;