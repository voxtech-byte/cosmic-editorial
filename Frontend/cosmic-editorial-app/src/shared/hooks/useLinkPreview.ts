import { useQuery } from '@tanstack/react-query';

interface LinkPreviewData {
  url: string;
  title?: string;
  siteName?: string;
  description?: string;
  images?: string[];
  favicons?: string[];
  mediaType?: string;
  contentType?: string;
}

interface UseLinkPreviewOptions {
  enabled?: boolean;
  staleTime?: number;
}

const fetchLinkPreview = async (url: string): Promise<LinkPreviewData> => {
  const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch preview');
  }

  return response.json();
};

export function useLinkPreview(
  url: string | null,
  options: UseLinkPreviewOptions = {}
) {
  const { enabled = true, staleTime = 1000 * 60 * 60 } = options; // 1 hour default

  return useQuery<LinkPreviewData, Error>({
    queryKey: ['linkPreview', url],
    queryFn: () => fetchLinkPreview(url!),
    enabled: !!url && enabled,
    staleTime,
    retry: 1,
    meta: {
      errorMessage: 'Failed to load link preview'
    }
  });
}
