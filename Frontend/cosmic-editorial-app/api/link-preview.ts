import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getLinkPreview } from 'link-preview-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const previewData = await getLinkPreview(url, {
      followRedirects: 'follow',
      timeout: 10000,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    return res.status(200).json(previewData);
  } catch (error) {
    console.error('Link preview error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch link preview',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
