import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { players } from "~/server/db/schema";

export const playersRouter = createTRPCRouter({
  // TODO make everything a private route

  create: publicProcedure
    .input(
      z.object({ first_name: z.string().min(1), last_name: z.string().min(1),
      team_id: z.number().int()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(players).values({
        first_name: input.first_name,
        last_name: input.last_name,
        team_id: input.team_id,

      });
    })
});
