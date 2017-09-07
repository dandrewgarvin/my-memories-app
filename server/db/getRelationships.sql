SELECT user_one_id, user_two_id, users.first_name, users.last_name FROM relationships
JOIN users
  ON users.id = relationships.user_two_id
WHERE user_one_id = $1 AND relationship_status = 1;