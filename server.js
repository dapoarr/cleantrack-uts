const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 1. KONEKSI DATABASE RDS
const db = mysql.createConnection({
    host: 'cleantrack-db.cctc6auqko0q.us-east-1.rds.amazonaws.com',
    user: 'adminuts',
    password: 'adminuts123',
    database: 'cleantrack_db'
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi RDS Gagal:', err);
    } else {
        console.log('✅ Terhubung ke RDS MySQL');
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS laporan_sampah (
                id INT AUTO_INCREMENT PRIMARY KEY,
                lokasi VARCHAR(255) NOT NULL,
                keterangan TEXT,
                foto_url VARCHAR(255)
            )
        `;
        db.query(createTableQuery, (err) => {
            if (err) console.error('Gagal membuat tabel:', err);
            else {
                db.query("ALTER TABLE laporan_sampah ADD COLUMN status VARCHAR(20) DEFAULT 'pending'", () => { });
                console.log('✅ Tabel siap digunakan');
            }
        });
    }
});

// 2. KONEKSI S3 
const s3 = new S3Client({ region: 'us-east-1' });
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'cleantrack-storage-uts',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) { cb(null, { fieldName: file.fieldname }); },
        key: function (req, file, cb) { cb(null, Date.now().toString() + '-' + file.originalname) }
    })
});

// 3. JALUR API (ENDPOINTS)
app.get('/lapor', (req, res) => {
    db.query('SELECT * FROM laporan_sampah ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

app.post('/lapor', upload.single('foto'), (req, res) => {
    const { lokasi, keterangan } = req.body;
    const foto_url = req.file ? req.file.location : null;
    const query = "INSERT INTO laporan_sampah (lokasi, keterangan, foto_url, status) VALUES (?, ?, ?, 'pending')";

    db.query(query, [lokasi, keterangan, foto_url], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Laporan berhasil!' });
    });
});

app.put('/lapor/:id/status', (req, res) => {
    const { id } = req.params;
    db.query("UPDATE laporan_sampah SET status = 'done' WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Status berhasil diubah menjadi Done!' });
    });
});

app.delete('/lapor/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM laporan_sampah WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Data dihapus permanen' });
    });
});

// 4. JALANKAN SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Backend aktif di port ${PORT}`);
});