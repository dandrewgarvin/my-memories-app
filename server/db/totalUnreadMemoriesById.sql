SELECT count(*) FROM users
JOIN memories
  ON memories.receiving_user_id = users.id
WHERE receiving_user_id = $1 AND is_opened = false;
