# Gunakan base image Node.js versi 18 yang ringan
FROM node:18-alpine

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan install dependencies
COPY package.json ./
RUN npm install

# Salin seluruh kode program (termasuk server.js dan folder public)
COPY . .

# Beritahu Docker bahwa aplikasi berjalan di port 3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
