const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// ==================== 1. DATABASE CONNECTION ====================
// ⚠️ เปลี่ยนลิงก์ด้านล่างนี้ให้เป็น Connection String ของคุณจาก MongoDB Atlas
// อย่าลืมเปลี่ยน <username> และ <password> เป็น Database User ของคุณ
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://s6807012660149_db_user:s6807012660149_db_user@cluster0.uttbozp.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(' Connected to MongoDB Atlas successfully!');
    seedInitialWines(); // เพิ่มข้อมูลตัวอย่างหากฐานข้อมูลยังว่าง
  })
  .catch((err) => console.error(' MongoDB Connection Error:', err));


// ==================== 2. MONGOOSE SCHEMAS & MODELS ====================

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Wine Schema
const wineSchema = new mongoose.Schema({
  winery: { type: String, default: 'Winery' },
  name: { type: String, required: true },
  type: { type: String },
  region: { type: String },
  country: { type: String },
  price: { type: Number },
  rating: { type: Number, default: 5.0 },
  ratings_count: { type: Number, default: 0 },
  image: { type: String }
}, { timestamps: true });

const Wine = mongoose.model('Wine', wineSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  order_details: { type: mongoose.Schema.Types.Mixed },
  total_price: { type: Number }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);


// ==================== 3. INITIAL SEED DATA ====================
async function seedInitialWines() {
  try {
    const count = await Wine.countDocuments();
    if (count === 0) {
      const sampleWines = [
        { winery: 'B Cellars', name: 'Premiere Napa Valley Cabernet Sauvignon 2006', type: 'Red', region: 'Napa Valley', country: 'USA', price: 1846, rating: 4.5, ratings_count: 461, image: 'https://cdn.ct-static.com/labels/2ca3f4be-63bc-4f08-b9ce-3de6d121fdac.jpg' },
        { winery: 'Bodegas Muga', name: 'Prado Enea Gran Reserva 1998', type: 'Red', region: 'Rioja', country: 'Spain', price: 1948, rating: 4.5, ratings_count: 170, image: 'https://assets.catawiki.nl/assets/2020/9/9/2/0/d/20d3ca86-3a3d-41a3-9cfe-4dcd91340bde.jpg' },
        { winery: 'Andrew Januik', name: 'Stone Cairn Cabernet Sauvignon 2013', type: 'Red', region: 'Red Mountain', country: 'USA', price: 2150, rating: 4.4, ratings_count: 852, image: 'https://assets.wine.com/winecom/image/upload/184401fbs.jpg' },
        { winery: 'Domaine Leflaive', name: 'Chevalier-Montrachet Grand Cru 2018', type: 'White', region: 'Burgundy', country: 'France', price: 4500, rating: 4.8, ratings_count: 85, image: 'https://tse2.mm.bing.net/th/id/OIP.wL6LTgXulWv1hXZKh9fIpwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
        { winery: 'Cloudy Bay', name: 'Sauvignon Blanc 2022', type: 'White', region: 'Marlborough', country: 'New Zealand', price: 1250, rating: 4.3, ratings_count: 1500, image: 'https://tse4.mm.bing.net/th/id/OIP.7iNXZ7FyCk6Qk-0cvfRUJgHaJ4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
        { winery: 'Dom Pérignon', name: 'Vintage Champagne Brut 2013', type: 'Sparkling', region: 'Champagne', country: 'France', price: 7900, rating: 4.7, ratings_count: 950, image: 'https://media.nicks.com.au/products/154ef6ae/2013-charles-heidsieck-vintage-brut-champagne.jpg' },
        { winery: 'Prosecco Superiore', name: 'Conegliano Valdobbiadene Extra Dry', type: 'Sparkling', region: 'Veneto', country: 'Italy', price: 950, rating: 4.1, ratings_count: 410, image: 'https://www.xtrawine.com/cdn/shop/files/astoria-conegliano-valdobbiadene-prosecco-superiore-anniversario-extra-dry-2025_60494_2.webp?v=1773811717&width=1946' },
        { winery: 'Château d Esclans', name: 'Whispering Angel Rosé 2022', type: 'Rosé', region: 'Provence', country: 'France', price: 1450, rating: 4.2, ratings_count: 620, image: 'https://tse1.mm.bing.net/th/id/OIP.deLrdaLrMFCseFqZnUM2KgHaJ4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
        { winery: 'Torres', name: 'De Casta Rosado 2021', type: 'Rosé', region: 'Catalonia', country: 'Spain', price: 750, rating: 3.9, ratings_count: 190, image: 'https://tse3.mm.bing.net/th/id/OIP.rroe0LTT55JKWbg_7NTtbgHaX3?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
        { winery: 'Château d Yquem', name: 'Sauternes Grand Premier Cru 2015', type: 'Dessert', region: 'Bordeaux', country: 'France', price: 9800, rating: 4.9, ratings_count: 340, image: 'https://tse1.mm.bing.net/th/id/OIP.7hkHXcsHbFJIzgXbWHPO-wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
        { winery: 'Royal Tokaji', name: 'Aszu 5 Puttonyos 2017', type: 'Dessert', region: 'Tokaj', country: 'Hungary', price: 3200, rating: 4.6, ratings_count: 210, image: 'https://tse3.mm.bing.net/th/id/OIP.PtjgBbDIDuAI9xAo2jSJFgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
        { winery: 'Taylor Fladgate', name: '20 Year Old Tawny Port', type: 'Fortified', region: 'Douro', country: 'Portugal', price: 2450, rating: 4.7, ratings_count: 530, image: 'https://img.thewhiskyexchange.com/900/port_gra9.jpg' },
        { winery: 'Sandeman', name: 'Fine Ruby Port', type: 'Fortified', region: 'Porto', country: 'Portugal', price: 990, rating: 4.0, ratings_count: 310, image: 'https://tse2.mm.bing.net/th/id/OIP.stYeLx3ELPCOXROSSllOFwHaLZ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' }
      ];
      await Wine.insertMany(sampleWines);
      console.log(' Sample wines seeded to MongoDB Atlas.');
    }
  } catch (err) {
    console.error('Error seeding initial wines:', err);
  }
}


// ==================== 4. HTML PAGE ROUTES ====================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'store.html'));
});

app.get('/wines', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'wines.html'));
});

app.get('/cellar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cellar.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});


// ==================== 5. AUTHENTICATION APIS ====================

// สมัครสมาชิก
app.post('/api/signup', async (req, res) => {
  const { fullName, email, password, dob } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  try {
    const newUser = new User({ fullName, email, password, dob });
    await newUser.save();
    res.json({ message: 'User registered successfully!', userId: newUser._id });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This email is already registered.' });
    }
    res.status(500).json({ error: err.message });
  }
});

// เข้าสู่ระบบ
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    res.json({
      message: 'Login successful!',
      user: { id: user._id, fullName: user.fullName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==================== 6. WINE APIS ====================

// ดึงรายการไวน์ทั้งหมด (พร้อมระบบ Search / Filter / Sort)
app.get('/api/wines', async (req, res) => {
  try {
    const { search, types, minRating, maxPrice, countries, sort } = req.query;
    let filter = {};

    // ค้นหาตามชื่อ, โรงผลิต, หรือภูมิภาค
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name: regex },
        { winery: regex },
        { region: regex }
      ];
    }

    // กรองประเภทไวน์
    if (types && types.trim() !== '') {
      const typeList = types.split(',');
      filter.type = { $in: typeList };
    }

    // กรอง Rating ขั้นต่ำ
    if (minRating && parseFloat(minRating) > 0) {
      filter.rating = { $gte: parseFloat(minRating) };
    }

    // กรองราคาสูงสุด
    if (maxPrice) {
      filter.price = { $lte: parseFloat(maxPrice) };
    }

    // กรองตามประเทศ
    if (countries && countries.trim() !== '') {
      const countryList = countries.split(',');
      filter.country = { $in: countryList };
    }

    // การเรียงลำดับข้อมูล
    let sortOption = { _id: -1 };
    if (sort === 'rating_desc') sortOption = { rating: -1 };
    else if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };

    const wines = await Wine.find(filter).sort(sortOption);

    // แปลง _id เป็น id ให้ตรงกับโครงสร้างเดิมที่ Frontend เรียกใช้งาน
    const mappedWines = wines.map(wine => {
      const w = wine.toObject();
      w.id = w._id.toString();
      return w;
    });

    res.json(mappedWines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// เพิ่มไวน์รายการใหม่
app.post('/api/wines', async (req, res) => {
  try {
    const { winery, name, type, region, country, price, rating, ratings_count, image } = req.body;

    const newWine = new Wine({
      winery: winery || 'Winery',
      name,
      type,
      region,
      country,
      price,
      rating: rating || 5.0,
      ratings_count: ratings_count || 1,
      image: image || 'https://images.vivino.com/thumbs/0068ba2p910000_300x600.png'
    });

    await newWine.save();
    res.json({ id: newWine._id, success: true, message: 'Wine added successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// อัปเดตข้อมูลไวน์
app.put('/api/wines/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { winery, name, type, region, country, price, rating, image } = req.body;

    const updatedWine = await Wine.findByIdAndUpdate(
      id,
      {
        winery: winery || 'Winery',
        name,
        type,
        region,
        country,
        price,
        rating: rating || 5.0,
        image: image || 'https://images.vivino.com/thumbs/0068ba2p910000_300x600.png'
      },
      { new: true }
    );

    if (!updatedWine) {
      return res.status(404).json({ error: 'Wine not found.' });
    }

    res.json({ success: true, message: 'Wine updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE API: ลบรายการไวน์ตาม ID
app.delete('/api/wines/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWine = await Wine.findByIdAndDelete(id);

    if (!deletedWine) {
      return res.status(404).json({ error: 'Wine not found.' });
    }

    res.json({ success: true, message: 'Wine deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==================== 7. CHECKOUT API ====================
app.post('/api/checkout', async (req, res) => {
  try {
    const { items, shippingInfo } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }

    let totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const newOrder = new Order({
      order_details: { items, shippingInfo },
      total_price: totalPrice
    });

    await newOrder.save();
    res.json({ success: true, orderId: newOrder._id, message: 'Payment successful!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==================== 8. START SERVER ====================
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});