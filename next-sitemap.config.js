/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sachinmanral.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly', 
  priority: 0.7,       
  // You can explicitly include pages if you want more control
  additionalPaths: async (config) => [
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/about', changefreq: 'weekly', priority: 0.8 },
    { loc: '/projects', changefreq: 'weekly', priority: 0.8 },
    { loc: '/contact', changefreq: 'weekly', priority: 0.7 },
    { loc: '/blog', changefreq: 'weekly', priority: 0.7 },
  ],
};
