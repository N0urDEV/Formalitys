module.exports = {
  siteUrl: 'https://formalitys.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://formalitys.vercel.app/sitemap.xml',
    ],
  },
  exclude: ['/admin/*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/dossiers/company'),
    await config.transform(config, '/dossiers/tourism'),
    await config.transform(config, '/blog'),
  ],
  transform: async (config, path) => {
    // Custom transform for different page types
    const customMeta = {
      '/': {
        priority: 1.0,
        changefreq: 'daily',
      },
      '/dossiers/company': {
        priority: 0.9,
        changefreq: 'weekly',
      },
      '/dossiers/tourism': {
        priority: 0.9,
        changefreq: 'weekly',
      },
      '/blog': {
        priority: 0.8,
        changefreq: 'daily',
      },
    };

    return {
      loc: path,
      lastmod: new Date().toISOString(),
      priority: customMeta[path]?.priority || 0.7,
      changefreq: customMeta[path]?.changefreq || 'monthly',
    };
  },
};
