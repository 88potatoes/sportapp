import { eq } from "drizzle-orm/sql/expressions/conditions";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fixtures } from "~/server/db/schema";
import type { ApiResponse } from "./types";
import type { Fixture } from "~/server/db/types";

export const playersRouter = createTRPCRouter({
  // TODO make everything a private route

  create: publicProcedure
    .input(
      z.object({
        player1_id: z.number().int(),
        player2_id: z.number().int(),
        location: z.string().min(1),
        matchtime: z.date(),
        player1_score: z.number().int(),
        player2_score: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const fixture = await ctx.db
        .insert(fixtures)
        .values({
          player1_id: input.player1_id,
          player2_id: input.player2_id,
          location: input.location,
          matchtime: input.matchtime,
          player1_score: input.player1_score,
          player2_score: input.player2_score,
        })
        .returning();

      if (fixture.length === 0) {
        return {
          success: false,
          error: "Could not create database record.",
        } as ApiResponse;
      }
      return {
        success: true,
        data: fixture[0]!,
      } as ApiResponse<Fixture>;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const fixture = await ctx.db
        .delete(fixtures)
        .where(eq(fixtures.id, input.id))
        .returning();

      if (fixture.length === 0) {
        return {
          success: false,
          error: "Could not find record to delete.",
        } as ApiResponse;
      }
      return {
        success: true,
        data: fixture[0]!,
      } as ApiResponse<Fixture>;
    }),
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const fixture = await ctx.db
        .select()
        .from(fixtures)
        .where(eq(fixtures.id, input.id));

      if (fixture.length === 0) {
        return {
          success: false,
          error: "Could not find record.",
        } as ApiResponse;
      }
      return {
        success: true,
        data: fixture[0]!,
      } as ApiResponse<Fixture>;
    }),
});
