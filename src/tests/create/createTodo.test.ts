import request from 'supertest';
import { app } from '../../server'; // O arquivo principal do seu Express

describe('POST /create_todos', () => {
  let token: string;

  beforeAll(async () => {
    // Se você quiser gerar um token válido dinamicamente
    const res = await request(app).post('/login').send({
      email: 'caio@example.com', // Substitua por um usuário válido do seu sistema
      password: 'password123',
    });

    token = `Bearer ${res.body.token}`;
  });

  it('Deve criar um novo TODO com sucesso', async () => {
    const res = await request(app)
      .post('/create_todos')
      .set('Authorization', token)
      .send({
        title: 'Fazer compras',
        description: 'Comprar frutas e verduras',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Fazer compras');
    expect(res.body).toHaveProperty('description', 'Comprar frutas e verduras');
    expect(res.body).toHaveProperty('completed', false); // Verifique se o TODO foi criado com status "não completo"
  
      console.log('response:', res.body);  
  });

  it('Deve retornar erro ao tentar criar sem autenticação', async () => {
    const res = await request(app).post('/create_todos').send({
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
