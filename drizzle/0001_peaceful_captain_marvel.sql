ALTER TABLE "sportapp_fixture" ADD COLUMN "player1_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "sportapp_fixture" ADD COLUMN "location" varchar(128);--> statement-breakpoint
ALTER TABLE "sportapp_fixture" ADD COLUMN "datetime" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "sportapp_fixture" ADD COLUMN "player1_score" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "sportapp_fixture" ADD COLUMN "player2_score" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sportapp_fixture" ADD CONSTRAINT "sportapp_fixture_player1_id_sportapp_player_id_fk" FOREIGN KEY ("player1_id") REFERENCES "public"."sportapp_player"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sportapp_player" ADD CONSTRAINT "sportapp_player_team_id_sportapp_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."sportapp_team"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "sportapp_fixture" DROP COLUMN IF EXISTS "first_name";--> statement-breakpoint
ALTER TABLE "sportapp_fixture" DROP COLUMN IF EXISTS "last_name";