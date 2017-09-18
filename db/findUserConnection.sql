SELECT * FROM users
WHERE LOWER(first_name) LIKE LOWER($1) || '%' OR LOWER(last_name) LIKE LOWER($1) || '%';