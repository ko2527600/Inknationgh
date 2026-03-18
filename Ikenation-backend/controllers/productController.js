import prisma from '../config/prisma.js';
import { cloudinary } from '../config/cloudinary.js';

// Helper to upload base64 to Cloudinary
const uploadToCloudinary = async (base64) => {
  if (!base64 || typeof base64 !== 'string' || !base64.startsWith('data:image/')) {
    return base64; // Already a URL or not an image
  }
  try {
    const uploadResponse = await cloudinary.uploader.upload(base64, {
      folder: 'ikenation_products',
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return base64; // Fallback to original if upload fails
  }
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching products', error: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching product', error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin (Will lock down later)
export const createProduct = async (req, res) => {
  try {
    let { name, price, originalPrice, category, description, image, images, stock, badge, sizes, colors } = req.body;

    console.log(`[CREATE PRODUCT] Received request for: ${name}`);
    
    // Process images: Upload Base64 to Cloudinary
    if (image) {
      image = await uploadToCloudinary(image);
    }
    
    if (images && Array.isArray(images)) {
      images = await Promise.all(images.map(img => uploadToCloudinary(img)));
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        category,
        description,
        image: image || '',
        images: images || [],
        stock: parseInt(stock),
        badge,
        sizes: sizes || [],
        colors: colors || []
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    let { name, price, originalPrice, category, description, image, images, stock, badge, sizes, colors } = req.body;

    console.log(`[UPDATE PRODUCT] Received request for ID: ${req.params.id}`);

    // Process images: Upload Base64 to Cloudinary
    if (image) {
      image = await uploadToCloudinary(image);
    }
    
    if (images && Array.isArray(images)) {
      images = await Promise.all(images.map(img => uploadToCloudinary(img)));
    }

    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name,
        price: price ? parseFloat(price) : undefined,
        originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
        category,
        description,
        image,
        images: images || [],
        stock: stock ? parseInt(stock) : undefined,
        badge,
        sizes,
        colors
      }
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(404).json({ message: 'Product not found or update failed', error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Product not found or delete failed', error: error.message });
  }
};
