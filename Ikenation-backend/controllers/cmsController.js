import prisma from '../config/prisma.js';
import { cloudinary } from '../config/cloudinary.js';

// Recursive helper to find and upload base64 images in nested objects/arrays
const processDataImages = async (obj) => {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return await Promise.all(obj.map(item => processDataImages(item)));
  }

  const newObj = { ...obj };
  for (const key in newObj) {
    const value = newObj[key];

    if (typeof value === 'string' && value.startsWith('data:image/')) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(value, {
          folder: 'ikenation_cms',
        });
        newObj[key] = uploadResponse.secure_url;
      } catch (error) {
        console.error(`Cloudinary Upload Error for CMS key ${key}:`, error);
      }
    } else if (typeof value === 'object') {
      newObj[key] = await processDataImages(value);
    }
  }
  return newObj;
};

// @desc    Fetch CMS data by pageName
// @route   GET /api/cms/:pageName
// @access  Public
export const getCMSPage = async (req, res) => {
  try {
    const pageData = await prisma.cMSData.findUnique({
      where: { pageName: req.params.pageName }
    });

    if (pageData) {
      res.json(pageData.data);
    } else {
      res.status(404).json({ message: 'CMS page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching CMS data', error: error.message });
  }
};

// @desc    Update or Create CMS data for a page
// @route   PUT /api/cms/:pageName
// @access  Private/Admin
export const updateCMSPage = async (req, res) => {
  try {
    const { data } = req.body;

    // Process all images in the CMS data JSON
    const processedData = await processDataImages(data);

    // Prisma's upsert will create the page if it doesn't exist, or update it if it does
    const updatedPage = await prisma.cMSData.upsert({
      where: { pageName: req.params.pageName },
      update: {
        data: processedData
      },
      create: {
        pageName: req.params.pageName,
        data: processedData
      }
    });

    res.json(updatedPage);
  } catch (error) {
    console.error('Update CMS Page Error:', error);
    res.status(400).json({ message: 'Error updating CMS page', error: error.message });
  }
};
