import { useState } from 'react';
import { ExternalLink, Globe, ImageOff } from 'lucide-react';

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

interface LinkPreviewCardProps {
  url: string;
  previewData?: LinkPreviewData;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export function LinkPreviewCard({ 
  url, 
  previewData, 
  isLoading = false, 
  error = null,
  className = '' 
}: LinkPreviewCardProps) {
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return (
      <div className={`bg-space-void/80 rounded-xl border border-white/10 overflow-hidden animate-pulse ${className}`}>
        <div className="h-48 bg-white/5" />
        <div className="p-4 space-y-3">
          <div className="h-5 bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (error) {
    const displayUrl = (() => {
      try {
        return new URL(url).hostname;
      } catch {
        return url;
      }
    })();

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block bg-space-void/80 rounded-xl border border-white/10 p-4 hover:border-science/30 transition-all ${className}`}
      >
        <div className="flex items-center gap-3 text-text-dim">
          <Globe className="w-5 h-5" />
          <span className="text-sm truncate">{displayUrl}</span>
          <ExternalLink className="w-4 h-4 ml-auto" />
        </div>
      </a>
    );
  }

  if (!previewData) return null;

  const imageUrl = previewData.images?.[0];
  const faviconUrl = previewData.favicons?.[0];
  const displayTitle = previewData.title || previewData.siteName || url;
  const displayDescription = previewData.description;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block bg-space-void/80 rounded-xl border border-white/10 overflow-hidden hover:border-science/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300 ${className}`}
    >
      {/* Image Section */}
      {imageUrl && !imageError ? (
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-science/10 to-purple-500/10 flex items-center justify-center">
          <div className="flex flex-col items-center text-text-dim">
            <ImageOff className="w-12 h-12 mb-2" />
            <span className="text-sm">No preview available</span>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {faviconUrl && (
            <img 
              src={faviconUrl} 
              alt="" 
              className="w-5 h-5 rounded-sm flex-shrink-0 mt-0.5"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary line-clamp-2 group-hover:text-science transition-colors">
              {displayTitle}
            </h3>
            {previewData.siteName && (
              <p className="text-sm text-text-dim mt-0.5">{previewData.siteName}</p>
            )}
          </div>
          <ExternalLink className="w-4 h-4 text-text-dim flex-shrink-0 mt-1 group-hover:text-science transition-colors" />
        </div>

        {displayDescription && (
          <p className="text-sm text-text-secondary mt-2 line-clamp-2">
            {displayDescription}
          </p>
        )}

        <p className="text-xs text-text-dim mt-3 truncate">
          {(() => {
            try {
              return new URL(url).hostname;
            } catch {
              return url;
            }
          })()}
        </p>
      </div>
    </a>
  );
}
