-- up
ALTER TABLE "users"
	ADD "capabilities" TEXT[] DEFAULT ARRAY[]::TEXT[] NOT NULL;

---

-- down
ALTER TABLE "users"
	DROP "capabilities";
