import request from 'supertest';
import { app } from '../../server'; // O arquivo principal do seu Express

describe('POST /create_todos', () => {
  let token: string;

  beforeAll(async () => {
    // Gerar um token válido dinamicamente
    const res = await request(app).post('/login').send({
      email: 'yjf2lhb@example.com', // Substitua por um usuário válido do seu sistema
      password: 'Qu89tlh',
    });

    // Corrigindo a interpolação do token
    token = `Bearer ${res.body.token}`;

    console.log('Token:', token);
  });

  it('Deve criar um novo TODO com sucesso', async () => {
    const res = await request(app)
      .post('/create_todos')
      .set('Authorization', token) // Definindo o token de autorização
      .send({
        title: 'Fazer compras',
        description: 'Comprar frutas e verduras',
      });

    expect(res.statusCode).toEqual(201); // Espera que a resposta seja 201 Created
    expect(res.body.todo).toHaveProperty('id'); // Espera que o TODO tenha um ID
    expect(res.body.todo).toHaveProperty('title', 'Fazer compras');
    expect(res.body.todo).toHaveProperty(
      'description',
      'Comprar frutas e verduras'
    );

    // Apenas para depuração, pode ser removido
    console.log('response:', res.body);
  });

  it('Deve retornar erro ao tentar criar sem autenticação', async () => {
    const res = await request(app).post('/create_todos').send({
      title: 'Fazer compras',
      description: 'Comprar frutas e verduras',
    });

    expect(res.statusCode).toEqual(401); // Espera que a resposta seja 401 Unauthorized
    expect(res.body).toHaveProperty(
      'message',
      'Authorization token missing or invalid'
    );
  });
});
