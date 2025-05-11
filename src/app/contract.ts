import { initContract } from "@ts-rest/core";
import { generateOpenApi } from "@ts-rest/open-api";
import { z } from "zod";

const c = initContract();

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
});

const PlayerSchema = z.object({
  ranking: z.number(),
  points: z.number(),
  name: z.string(),
  country: z.string(),
  age: z.number(),
});

export const contract = c.router({
  default: {
    createPost: {
      method: "POST",
      path: "/posts",
      responses: {
        201: PostSchema,
      },
      body: z.object({
        title: z.string(),
        body: z.string(),
      }),
      summary: "Create a post",
    },
    getPost: {
      method: "GET",
      path: `/posts/:id`,
      responses: {
        200: PostSchema.nullable(),
      },
      summary: "Get a post by id",
    },
  },
  ATP: {
    getATPRankingsSingle: {
      method: "GET",
      path: `/api/atp/rankings/single`,
      query: z.object({
        country: z.string().optional().default("all"),
        limit: z.number().optional().default(30),
      }),
      responses: {
        200: PlayerSchema.array(),
      },
      summary: "Get ATP rankings for singles",
    },
    getATPRankingsSingleRace: {
      method: "GET",
      path: `/api/atp/rankings/single-race`,
      query: z.object({
        country: z.string().optional(),
      }),
      responses: {
        200: PlayerSchema.array(),
      },
      summary: "Get ATP race to London rankings",
    },
    getATPRankingsNextGenRace: {
      method: "GET",
      path: `/api/atp/rankings/next-gen-race`,
      query: z.object({
        country: z.string().optional(),
      }),
      responses: {
        200: PlayerSchema.array(),
      },
      summary: "Get ATP Next Gen rankings",
    },
    getATPRankingsDoubles: {
      method: "GET",
      path: `/api/atp/rankings/doubles`,
      query: z.object({
        country: z.string().optional(),
      }),
      responses: {
        200: PlayerSchema.array(),
      },
      summary: "Get ATP rankings for doubles",
    },
    getATPRankingsRaceDoubles: {
      method: "GET",
      path: `/api/atp/rankings/doubles-race`,
      query: z.object({
        country: z.string().optional(),
      }),
      responses: {
        200: PlayerSchema.array(),
      },
      summary: "Get ATP rankings for race to London doubles",
    },
  },
  WTA: {
    getWTARankingsSingle: {
      method: "GET",
      path: `/api/wta/rankings/single`,
      query: z.object({
        country: z.string().optional(),
      }),
      responses: {
        200: PlayerSchema.array(),
      },
      summary: "Get WTA rankings for singles",
    },
  },
});

export const OpenAPIV1 = generateOpenApi(contract, {
  info: {
    title: "My API",
    description: "My API description",
    version: "1.0.0",
  },
});
