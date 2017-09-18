SELECT users.first_name AS sending_user_first, users.last_name AS sending_user_last, memory_id, receiving_user_id, memory_title, memory_text, memory_date, img_url, submission_date FROM memories
JOIN users
  ON memories.sending_user_id = users.id
WHERE receiving_user_id = $1 AND is_opened = false
ORDER BY memory_id ASC;