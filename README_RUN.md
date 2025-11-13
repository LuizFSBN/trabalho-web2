1) Copie .env.example para .env e preencha DATABASE_URL com sua senha:
   DATABASE_URL="mongodb+srv://luizfsbn:YOUR_PASSWORD@unifesspa.myw7zod.mongodb.net/unibus?retryWrites=true&w=majority"

2) Instale dependências:
   npm install

3) Gere prisma client:
   npx prisma generate

4) Empurre schema para o MongoDB:
   npx prisma db push

5) Rode o seed (popular dados de exemplo):
   npm run prisma:seed

6) Inicie em dev:
   npm run dev

7) Acesse:
   - API base: http://localhost:4000/api/...
   - Swagger UI: http://localhost:4000/docs

Seed credenciais:
 - Aluno: aluno@exemplo.edu.br / student123
 - Motorista: motorista@exemplo.edu.br / driver123
