import { eq } from "drizzle-orm/sql/expressions/conditions";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { teams } from "~/server/db/schema";

export const teamsRouter = createTRPCRouter({
  // TODO make everything a private route

  create: publicProcedure
    .input(
      z.object({
        team_name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(teams).values({
        team_name: input.team_name,
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db
        .delete(teams)
        .where(eq(teams.id, input.id))
        .returning();
      return team;
    }),
  get: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const team = await ctx.db
        .select()
        .from(teams)
        .where(eq(teams.id, input.id));

      return team;
    }),
});
