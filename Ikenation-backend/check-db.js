import prisma from './config/prisma.js';

async function main() {
  const p = await prisma.product.findUnique({
    where: { id: '8c50ccf0-4e81-4290-b673-40e16b07223c' }
  });
  console.log('Product Found:', p.name);
  console.log('Images Length:', p.images?.length);
  if (p.images && p.images.length > 0) {
    console.log('Image lengths (bytes):', p.images.map(img => img.length));
    console.log('First 50 chars of image 0:', p.images[0].substring(0, 50));
    console.log('First 50 chars of image 1:', p.images.length > 1 ? p.images[1].substring(0, 50) : 'N/A');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  });
