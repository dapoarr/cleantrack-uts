Nama : M Dafa Ar Rasyid
Nrp : 152022249
Kelas : AA
Matakuliah : Cloud Computing/Komputasi Awan

# 🗑️ CleanTrack - Sistem Pelaporan Sampah (UTS Cloud Computing)

Aplikasi berbasis web untuk memudahkan masyarakat dalam melaporkan tumpukan sampah liar, serta membantu admin pemerintah/petugas kebersihan dalam melacak dan memonitor area yang perlu dibersihkan.

## 🎯 Target Pengguna
- **Masyarakat:** Dapat melaporkan lokasi tumpukan sampah beserta foto bukti.
- **Admin / Petugas Kebersihan:** Dapat melihat daftar laporan, memonitor status kebersihan (Pending/Done), dan menghapus data riwayat.

## 🚀 Fitur Utama
1. **Lapor Sampah:** Form input lokasi, keterangan, dan upload foto bukti.
2. **Dasbor Manajemen (CRUD):** Menampilkan daftar laporan warga secara *real-time*.
3. **Status Tracking:** Memisahkan laporan yang belum dibersihkan (*Pending*) dan yang sudah dibersihkan (*Done*).
4. **Cloud Storage:** Semua file foto bukti langsung diunggah dan disimpan ke dalam **AWS S3**.

## ☁️ Arsitektur Cloud (AWS)
Aplikasi ini dibangun menggunakan infrastruktur Amazon Web Services (AWS) dengan rincian:
- **VPC & Subnetting:** Menggunakan Public Subnet untuk web server dan Private Subnet untuk Database demi keamanan.
- **Amazon EC2:** Berfungsi sebagai server utama yang menjalankan aplikasi (Node.js & Frontend) di dalam **Docker Container**. (Dapat diakses via Public IP).
- **Amazon RDS (MySQL):** Ditempatkan di private subnet untuk menyimpan data laporan berupa teks (Lokasi, Keterangan, URL Foto, Status).
- **Amazon S3:** Digunakan sebagai media penyimpanan objek (*Object Storage*) untuk foto bukti laporan warga.
- **GitHub Actions (CI/CD):** Otomatisasi *build* dan *deployment* ke server EC2 (Tahap pengembangan).

## 🛠️ Prasyarat & Teknologi
- Node.js & Express.js (Backend)
- HTML, CSS, Vanilla JS (Frontend)
- Docker (Containerization)
- AWS SDK (Integrasi S3)
- MySQL2 (Integrasi RDS)

---
*Dibuat untuk memenuhi Ujian Tengah Semester Genap 2024/2025 - Mata Kuliah Cloud Computing.*

Urutan alur pengerjaan

1. Membuat S3 Bucket (Gudang Foto Sampah)
2. Membuat IAM Role (Izin Akses EC2 ke S3)
3. Membuat Private Subnet VPC UTS
4. Membuat Security Group untuk EC2 (Server)
5. Membuat Security Group untuk RDS (DB)
6. Membuat Private Subnet Ke-2 di PVC
7. Membuat Database RDS!
8. Membuat Server EC2
9. Masuk ke Server & Instal Docker
10. Membuat S3 Bucket

11. Ruangan di Server (EC2)/folder
12. Buat File package.json
13. Buat File server.js
14. Buat File Dockerfile
15. Eksekusi Docker

16. uplode github
17. uplode ci/cd flow
