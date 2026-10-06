const Wine = require('../models/Wine');

// [READ] ดึงรายการไวน์ทั้งหมด
exports.getWines = async (req, res) => {
  try {
    const { search, types, minRating, maxPrice, countries, sort } = req.query;
    let filter = {};

    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [{ name: regex }, { winery: regex }, { region: regex }];
    }
    if (types && types.trim() !== '') {
      filter.type = { $in: types.split(',') };
    }
    if (minRating && parseFloat(minRating) > 0) {
      filter.rating = { $gte: parseFloat(minRating) };
    }
    if (maxPrice) {
      filter.price = { $lte: parseFloat(maxPrice) };
    }
    if (countries && countries.trim() !== '') {
      filter.country = { $in: countries.split(',') };
    }

    let sortOption = { _id: -1 };
    if (sort === 'rating_desc') sortOption = { rating: -1 };
    else if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };

    const wines = await Wine.find(filter).sort(sortOption);

    const mappedWines = wines.map(wine => {
      const w = wine.toObject();
      w.id = w._id.toString();
      return w;
    });

    res.json(mappedWines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [CREATE] เพิ่มไวน์ใหม่
exports.createWine = async (req, res) => {
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
};

// [UPDATE] แก้ไขไวน์
exports.updateWine = async (req, res) => {
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

    if (!updatedWine) return res.status(404).json({ error: 'Wine not found.' });
    res.json({ success: true, message: 'Wine updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [DELETE] ลบไวน์
exports.deleteWine = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWine = await Wine.findByIdAndDelete(id);

    if (!deletedWine) return res.status(404).json({ error: 'Wine not found.' });
    res.json({ success: true, message: 'Wine deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};