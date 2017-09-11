SELECT * FROM relationships
WHERE user_two_id = $1 AND action_user_id != $1 AND relationship_status = 0;