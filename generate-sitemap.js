import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const sitemap = new SitemapStream({ hostname: 'https://fido-parfum-acs.netlify.app' });

sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
sitemap.write({ url: '/products', changefreq: 'weekly', priority: 1 });
sitemap.write({ url: '/about-us', changefreq: 'monthly', priority: 1 });
sitemap.write({ url: '/campaigns', changefreq: 'monthly', priority: 0.8 });
sitemap.write({ url: '/news', changefreq: 'monthly', priority: 0.8 });
sitemap.write({ url: '/cart', changefreq: 'monthly', priority: 0.7 });
sitemap.write({ url: '/wishlist', changefreq: 'monthly', priority: 0.7 });
sitemap.write({ url: '/faq', changefreq: 'monthly', priority: 0.5 });
sitemap.write({ url: '/delivery-billing', changefreq: 'monthly', priority: 0.3 });

sitemap.end();

(async () => {
  const data = await streamToPromise(sitemap);
  createWriteStream('./public/sitemap.xml').write(data);
})();
