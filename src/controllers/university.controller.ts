import { FastifyRequest, FastifyReply } from "fastify";
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL || "";
let client: MongoClient | null = null;

async function getDb() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db();
}

export async function createUniversity(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, domain } = request.body as any;

    if (!name || !domain) {
      return reply.status(400).send({ error: "Campos obrigatórios: name e domain" });
    }

    const db = await getDb();
    const universities = db.collection("University");

    const result = await universities.insertOne({
      name,
      domain,
      createdAt: new Date()
    });

    return reply.send({
      id: result.insertedId,
      name,
      domain
    });
  } catch (error: any) {
    request.log.error(error);
    return reply.status(500).send({
      error: "Erro ao criar universidade",
      details: error.message
    });
  }
}

export async function listUniversities(request: FastifyRequest, reply: FastifyReply) {
  try {
    const db = await getDb();
    const universities = db.collection("University");
    const list = await universities.find().toArray();
    return reply.send(list);
  } catch (error: any) {
    request.log.error(error);
    return reply.status(500).send({
      error: "Erro ao listar universidades",
      details: error.message
    });
  }
}
