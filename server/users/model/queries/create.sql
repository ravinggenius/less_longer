INSERT INTO users (username, hashword, capabilities)
VALUES ($<username>, $<hashword>, $<capabilities>)
RETURNING id;
