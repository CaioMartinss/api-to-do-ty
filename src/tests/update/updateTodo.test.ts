import request from 'supertest';
import { app } from '../../server'; // Ajuste o caminho conforme necessário

describe('PUT /update_todos/:id', () => {
  let token: string;
  let todoId: string;

  beforeAll(async () => {
    // Autenticar e obter token válido
    const res = await request(app).post('/login').send({
      email: 'yjf2lhb@example.com', // Substitua por um usuário válido do seu sistema
      password: 'Qu89tlh',
    });

    token = `Bearer ${res.body.token}`; // Corrigido: Adicionado espaço entre "Bearer" e o token

    // Criar um TODO de teste para atualizar posteriormente
    const createRes = await request(app)
      .post('/create_todos')
      .set('Authorization', token)
      .send({
        title: 'Lavar o carro',
        description: 'Lavar o carro no sábado',
      });

    console.log('Resposta de criação:', createRes.body); // Log para debug
    todoId = createRes.body.todo?.id; // Corrigido: uso seguro de "?" para prevenir erro se o todo não existir

    // Certificar que o todoId foi definido
    if (!todoId) {
      throw new Error('Erro ao criar TODO. Não foi possível obter todoId.');
    }
  });

  it('should update a TODO successfully', async () => {
    const updateRes = await request(app)
      .put(`/update_todos/${todoId}`)
      .set('Authorization', token)
      .send({
        title: 'Lavar o carro atualizado',
        description: 'Lavar o carro no domingo',
      });

    console.log('Resposta de atualização:', updateRes.body);

    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body).toHaveProperty(
      'message',
      'Todo updated successfully'
    ); // Verifica apenas a mensagem
  });

  it('should return an error if the TODO does not exist', async () => {
    const nonExistentId = '64b5a2bcf94b010012345678'; // Um ObjectID válido mas não existente
    const updateRes = await request(app)
      .put(`/update_todos/${nonExistentId}`) // Corrigido: Crase para interpolação de strings
      .set('Authorization', token)
      .send({
        title: 'Novo título',
        description: 'Nova descrição',
      });

    console.log('Resposta para TODO inexistente:', updateRes.body); // Log para debug

    expect(updateRes.statusCode).toEqual(404);
    expect(updateRes.body).toHaveProperty('message', 'Todo not found');
  });

  it('should return an error if the user is not authenticated', async () => {
    const updateRes = await request(app).put(`/update_todos/${todoId}`).send({
      title: 'Novo título',
      description: 'Nova descrição',
    });

    console.log('Resposta para usuário não autenticado:', updateRes.body); // Log para debug

    expect(updateRes.statusCode).toEqual(401);
    expect(updateRes.body).toHaveProperty(
      'message',
      'Authorization token missing or invalid'
    );
  });

  it('should return an error if the user is not authorized', async () => {
    const updateRes = await request(app)
      .put(`/update_todos/${todoId}`) // Corrigido: Crase para interpolação de strings
      .set('Authorization', 'Bearer invalidToken')
      .send({
        title: 'Novo título',
        description: 'Nova descrição',
      });

    console.log('Resposta para token inválido:', updateRes.body); // Log para debug

    expect(updateRes.statusCode).toEqual(401);
    expect(updateRes.body).toHaveProperty(
      'message',
      'Invalid or expired token'
    );
  });
});
