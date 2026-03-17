import prisma from '../config/prisma.js';

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

    // Prisma's upsert will create the page if it doesn't exist, or update it if it does
    const updatedPage = await prisma.cMSData.upsert({
      where: { pageName: req.params.pageName },
      update: {
        data: data
      },
      create: {
        pageName: req.params.pageName,
        data: data
      }
    });

    res.json(updatedPage);
  } catch (error) {
    res.status(400).json({ message: 'Error updating CMS page', error: error.message });
  }
};
