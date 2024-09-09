import request from 'supertest';
import { app } from '../../server'; // O arquivo principal do seu Express

describe('POST /todos', () => {
  let token: string;

  beforeAll(async () => {
    // Gere um token JWT válido ou use um token mockado
    token = 'Bearer <seu_token_de_teste>';
  });

  it('Deve criar um novo TODO com sucesso', async () => {
    const res = await request(app)
      .post('/todos')
      .set('Authorization', token)
      .send({
        title: 'Fazer compras',
        description: 'Comprar frutas e verduras',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Deve retornar erro ao tentar criar sem autenticação', async () => {
    const res = await request(app).post('/todos').send({
      title: 'Fazer compras',
      description: 'Comprar frutas e verduras',
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty(
      'message',
      'Authorization token missing or invalid'
    );
  });
});
