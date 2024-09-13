import request from 'supertest';
import { app } from '../../server'; // Ajuste o caminho se necessário

describe('DELETE /delete_todos', () => {
  let token: string;
  let todoId: string;

  beforeAll(async () => {
    // Autenticar e obter token válido
    const res = await request(app).post('/login').send({
      email: 'yjf2lhb@example.com', // Substitua por um usuário válido do seu sistema
      password: 'Qu89tlh',
    });

    token = `Bearer ${res.body.token}`;

    // Criar um TODO de teste para deletar posteriormente
    const createRes = await request(app)
      .post('/create_todos')
      .set('Authorization', token)
      .send({
        title: 'carregar a máquina',
        description: 'Comprar frutas e verduras',
      });

    todoId = createRes.body.todo.id; // Armazenar o ID do TODO criado
  });

  it('should delete a TODO successfully', async () => {
    const res = await request(app)
      .delete(`/delete_todos/${todoId}`)
      .set('Authorization', token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Todo deleted successfully');
  });

  it('should return an error if the user is not authenticated', async () => {
    const res = await request(app).delete(`/delete_todos/${todoId}`);

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty(
      'message',
      'Authorization token missing or invalid'
    );
  });

  it('should return an error if the user is not authorized', async () => {
    const res = await request(app)
      .delete(`/delete_todos/${todoId}`)
      .set('Authorization', 'Bearer invalidToken');

    expect(res.statusCode).toEqual(401); // Espera que retorne 401 Unauthorized
    expect(res.body).toHaveProperty('message', 'Invalid or expired token');
  });
});
