# Use uma imagem base do Node.js
FROM node:18

# Crie um diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Instale o TypeScript globalmente
RUN npm install -g typescript

# Copie o restante do código da aplicação
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta que a API usa
EXPOSE 3000

# Comando para iniciar a API
CMD ["node", "dist/server.js"]
