INSERT INTO users (username, hashword)
VALUES ($<username>, $<hashword>)
RETURNING id;
