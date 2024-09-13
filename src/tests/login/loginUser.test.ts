import request from 'supertest';
import { app } from '../../server'; // Ajuste o caminho se necessário

describe('POST /login', () => {
  it('Deve fazer login com sucesso e retornar um token', async () => {
    const response = await request(app).post('/login').send({
      email: 'yjf2lhb@example.com',
      password: 'Qu89tlh',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('message', 'Login successful');
  });

  it('Deve retornar erro ao tentar fazer login com email inexistente', async () => {
    const response = await request(app).post('/login').send({
      email: 'porra@example.com',
      password: 'Password123',
    });

    expect(response.status).toBe(401); // Ajustando para 401, que é o código esperado
    expect(response.body).toHaveProperty(
      'message',
      'Invalid email or password'
    );
  });

  it('Deve retornar erro ao tentar fazer login com senha incorreta', async () => {
    const response = await request(app).post('/login').send({
      email: 'john@example.com',
      password: 'WrongPassword',
    });

    expect(response.status).toBe(401); // Ajustando para 401, que é o código esperado
    expect(response.body).toHaveProperty(
      'message',
      'Invalid email or password'
    );
  });

  it('Deve retornar erro ao tentar fazer login sem senha', async () => {
    const response = await request(app).post('/login').send({
      email: 'john@example.com',
    });

    expect(response.status).toBe(400); // Valide o código de erro para campos faltantes
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Password is required' }),
      ])
    );
  });

  it('Deve retornar erro ao tentar fazer login sem email', async () => {
    const response = await request(app).post('/login').send({
      password: 'Password123',
    });

    expect(response.status).toBe(400); // Valide o código de erro para campos faltantes
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Email is required' }),
      ])
    );
  });
});
