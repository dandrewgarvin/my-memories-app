INSERT INTO relationships (user_one_id, user_two_id, relationship_status, action_user_id, relationship_type)
VALUES ($1, $2, 0, $3, NULL)
RETURNING *;