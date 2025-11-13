import { FastifyInstance } from "fastify";
import { createUniversity, listUniversities } from "../controllers/university.controller";

export default async function universityRoutes(app: FastifyInstance) {
  app.post("/university", createUniversity);
  app.get("/university", listUniversities);
}
