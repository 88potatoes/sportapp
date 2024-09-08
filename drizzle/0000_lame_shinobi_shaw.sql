CREATE TABLE IF NOT EXISTS "sportapp_fixture" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(128),
	"last_name" varchar(128),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"team_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sportapp_player" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(128),
	"last_name" varchar(128),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"team_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sportapp_team" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(128),
	"last_name" varchar(128),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "sportapp_player" USING btree ("team_id");