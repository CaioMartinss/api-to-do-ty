import request from 'supertest';
import { app } from '../../server'; // Ajuste o caminho se necessário

// Função para gerar senha que atenda ao padrão
function generateValidPassword() {
  const upperCase = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Letra maiúscula
  const lowerCase = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Letra minúscula
  const number = String.fromCharCode(48 + Math.floor(Math.random() * 10)); // Número
  const randomChars = Math.random().toString(36).substring(2, 6); // Caracteres aleatórios

  return `${upperCase}${lowerCase}${number}${randomChars}`; // Senha composta com no mínimo 6 caracteres
}

describe('POST /register', () => {
  it('should register a new user and return a token', async () => {
    // Gerando valores aleatórios para evitar duplicações
    const aleatoryName = Math.random().toString(36).substring(7);
    const aleatoryEmail = `${Math.random()
      .toString(36)
      .substring(7)}@example.com`;
    const aleatoryPassword = generateValidPassword(); // Gera uma senha válida

    const newUser = {
      name: aleatoryName,
      email: aleatoryEmail,
      password: aleatoryPassword,
    };

    const response = await request(app).post('/register').send(newUser);

    // Exibir a resposta para ajudar na depuração, se necessário.
    console.log('Response body:', response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty(
      'message',
      'User registered successfully!'
    );

    // Exibir o usuário registrado para ajudar na depuração, se necessário.
    console.log('USER:', newUser);
  });

  it('should return an error if the username is missing', async () => {
    const newUser = {
      email: 'john@example.com',
      password: 'StrongPassword123',
    };

    const response = await request(app).post('/register').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Name is required' }),
      ])
    );
  });

  it('should return an error if the password is missing', async () => {
    const newUser = {
      name: 'JohnDoe',
      email: 'john@example.com',
    };

    const response = await request(app).post('/register').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Password is required' }),
      ])
    );
  });

  it('should return an error if the email is already in use', async () => {
    // Primeiro, registre um usuário
    await request(app).post('/register').send({
      name: 'JaneDoe',
      email: 'jane@example.com',
      password: 'AnotherPassword123',
    });

    // Agora tente registrar outro usuário com o mesmo email
    const response = await request(app).post('/register').send({
      name: 'JohnDoe',
      email: 'jane@example.com',
      password: 'NewPassword123',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Email already in use' }),
      ])
    );
  });
});
