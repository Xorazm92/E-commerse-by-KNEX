# NBT Shop - E-commerce Platform

## Loyiha haqida
NBT Shop - zamonaviy e-commerce platformasi bo'lib, mahsulotlarni sotib olish va sotish imkoniyatini beradi.

## Asosiy xususiyatlari
- Foydalanuvchilar ro'yxatdan o'tishi va tizimga kirishi
- Mahsulotlarni qo'shish, o'zgartirish va o'chirish
- Mahsulotlarni qidirish va filtrlash
- Savat tizimi
- To'lov tizimi (Stripe orqali)
- Email xabarnomalar
- Responsive dizayn

## Texnologiyalar
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Payment: Stripe
- Email: Nodemailer

## O'rnatish

### 1. Kerakli dasturlarni o'rnatish
```bash
# Node.js o'rnatish (v14 yoki yuqori versiya)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL o'rnatish
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### 2. PostgreSQL sozlash
```bash
# PostgreSQL serverni ishga tushirish
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Database yaratish
sudo -u postgres psql -c "CREATE DATABASE nbtshop;"
sudo -u postgres psql -c "CREATE USER postgres WITH PASSWORD 'postgres';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE nbtshop TO postgres;"
```

### 3. Loyihani yuklab olish
```bash
git clone <repository-url>
cd ECOMMERS
```

### 4. Backend sozlash
```bash
cd Backend

# Dependencylarni o'rnatish
npm install

# .env faylini sozlash
cp .env.example .env
# .env fayliga kerakli ma'lumotlarni kiriting

# Databaseni migrate qilish
npm run migrate

# Serverni ishga tushirish
npm run dev
```

### 5. Frontend sozlash
```bash
cd Frontend

# index.html faylini brauzerda ochish
# Linux uchun:
xdg-open index.html
# yoki
firefox index.html
```

## Ishlatish

### 1. Admin panel
- URL: http://localhost:3000/admin
- Login: admin@nbtshop.uz
- Parol: admin123

### 2. User panel
- URL: http://localhost:3000
- Ro'yxatdan o'tish uchun "Sign Up" tugmasini bosing
- Tizimga kirish uchun "Login" tugmasini bosing

### 3. Asosiy funksiyalar
1. **Mahsulotlarni ko'rish**
   - Bosh sahifada barcha mahsulotlar ro'yxati
   - Kategoriyalar bo'yicha filtrlash
   - Qidiruv funksiyasi

2. **Savat bilan ishlash**
   - Mahsulotni savatga qo'shish
   - Miqdorni o'zgartirish
   - Savatdan o'chirish

3. **Buyurtma berish**
   - Yetkazib berish manzilini kiritish
   - To'lov usulini tanlash
   - Buyurtmani tasdiqlash

4. **Admin panel**
   - Mahsulotlarni boshqarish
   - Buyurtmalarni ko'rish va statusini o'zgartirish
   - Foydalanuvchilarni boshqarish
   - Statistikani ko'rish

## Xatolarni bartaraf etish

### Database xatolari
1. "Connection refused" xatosi:
   ```bash
   sudo systemctl restart postgresql
   ```

2. "Authentication failed" xatosi:
   ```bash
   # pg_hba.conf faylini tahrirlash
   sudo nano /etc/postgresql/14/main/pg_hba.conf
   # "peer" ni "md5" ga o'zgartiring
   sudo systemctl restart postgresql
   ```

### Backend xatolari
1. "Port already in use" xatosi:
   ```bash
   # Portni band qilgan processni topish
   sudo lsof -i :3000
   # Processni to'xtatish
   sudo kill -9 <PID>
   ```

2. "Module not found" xatosi:
   ```bash
   # Node modullarini qayta o'rnatish
   rm -rf node_modules
   npm install
   ```

## Yordam va qo'llab-quvvatlash
Muammo yoki savollar bo'lsa, quyidagi manzillarga murojaat qiling:
- Email: support@nbtshop.uz
- Telegram: @nbtshop_support
- Tel: +998 90 123 45 67

## Yangilanishlar
- v1.0.0 - Dastlabki versiya
- v1.1.0 - Stripe to'lov tizimi qo'shildi
- v1.2.0 - Email xabarnomalar qo'shildi
