SELECT relationship_id, user_one_id, user_two_id, relationship_status, action_user_id, first_name, last_name FROM relationships
JOIN users
  ON users.id = relationships.action_user_id
WHERE (user_one_id = $1 OR user_two_id = $1) AND action_user_id != $1 AND relationship_status = 0;