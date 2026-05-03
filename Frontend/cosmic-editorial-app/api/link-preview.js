module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  // Validate URL format
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    // Use microlink.io API (free tier, no API key needed for basic usage)
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'fail') {
      return res.status(400).json({
        error: 'Failed to fetch preview',
        message: data.message || 'Could not extract preview data'
      });
    }

    // Transform microlink response to match link-preview-js format
    const previewData = {
      url: data.data.url,
      title: data.data.title,
      description: data.data.description,
      siteName: data.data.publisher,
      images: data.data.image?.url ? [data.data.image.url] : [],
      favicons: data.data.logo?.url ? [data.data.logo.url] : [],
      mediaType: data.data.type || 'website',
    };

    return res.status(200).json(previewData);
  } catch (error) {
    console.error('Link preview error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch link preview',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
