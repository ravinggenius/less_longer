SELECT *
FROM slugs
WHERE "userId" = $<userId>
AND url = $<url>;
