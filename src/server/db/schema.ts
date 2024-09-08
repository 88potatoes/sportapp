// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `sportapp_${name}`);

export const players = createTable(
  "player",
  {
    id: serial("id").primaryKey(),
    first_name: varchar("first_name", { length: 128 }),
    last_name: varchar("last_name", { length: 128 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
    team_id: integer("team_id").notNull().references(() => teams.id)
  },
  (player) => ({
    team_index: index("name_idx").on(player.team_id),
  })
);

export const teams = createTable(
  "team",
  {
    id: serial("id").primaryKey(),
    team_name: varchar("first_name", { length: 128 }),
    last_name: varchar("last_name", { length: 128 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    )
  }
);

export const fixtures = createTable(
  "fixture",
  {
    id: serial("id").primaryKey(),
    player1_id: integer('player1_id').notNull().references(() => players.id),
    player2_id: integer('player1_id').notNull().references(() => players.id),
    location: varchar("location", { length: 128 }),
    datetime: timestamp("datetime", { withTimezone: true })
    .notNull(),
    player1_score: integer('player1_score').notNull().default(0),
    player2_score: integer('player2_score').notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);

