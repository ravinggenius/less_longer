-- up
CREATE TABLE "users" (
	"id" UUID DEFAULT gen_random_uuid() UNIQUE PRIMARY KEY NOT NULL,
	"createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
	"updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
	"username" text UNIQUE NOT NULL,
	"hashword" text NOT NULL
);

CREATE TABLE "slugs" (
	"id" UUID DEFAULT gen_random_uuid() UNIQUE PRIMARY KEY NOT NULL,
	"createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
	"updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
	"userId" UUID NOT NULL REFERENCES users,
	"code" text UNIQUE NOT NULL,
	"url" text NOT NULL
);

---

-- down
DROP TABLE "slugs";
DROP TABLE "users";
