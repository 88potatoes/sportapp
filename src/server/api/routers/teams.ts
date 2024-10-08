import { eq } from "drizzle-orm/sql/expressions/conditions";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { teams } from "~/server/db/schema";
import type { ApiResponse } from "./types";
import type { Team } from "~/server/db/types";

export const teamsRouter = createTRPCRouter({
  // TODO make everything a private route

  create: publicProcedure
    .input(
      z.object({
        team_name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db
        .insert(teams)
        .values({
          team_name: input.team_name,
        })
        .returning();

      if (team.length === 0) {
        return {
          success: false,
          error: "Could not create record.",
        } as ApiResponse;
      }
      return {
        success: true,
        data: team[0]!,
      } as ApiResponse<Team>;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db
        .delete(teams)
        .where(eq(teams.id, input.id))
        .returning();
      if (team.length === 0) {
        return {
          success: false,
          error: "Could not find record to delete.",
        } as ApiResponse;
      }
      return {
        success: true,
        data: team[0]!,
      } as ApiResponse<Team>;
    }),
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const team = await ctx.db
        .select()
        .from(teams)
        .where(eq(teams.id, input.id));

      if (team.length === 0) {
        return {
          success: false,
          error: "Could not find record.",
        } as ApiResponse;
      }
      return {
        success: true,
        data: team[0]!,
      } as ApiResponse<Team>;
    }),
});
