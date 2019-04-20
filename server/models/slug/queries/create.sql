INSERT INTO slugs ("userId", code, url)
VALUES ($<userId>, $<code>, $<url>)
RETURNING id, code;
