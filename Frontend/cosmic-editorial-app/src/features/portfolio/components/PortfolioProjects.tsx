import { LinkPreviewCard } from '@/shared/components/LinkPreviewCard';
import { useLinkPreview } from '@/shared/hooks/useLinkPreview';
import { Globe, Briefcase, Code2 } from 'lucide-react';

// Data project untuk UpWork portfolio
const projects = [
  {
    id: 1,
    url: 'https://cosmic-editorial.vercel.app/',
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'TailwindCSS'],
  },
];

interface ProjectCardProps {
  url: string;
  category: string;
  technologies: string[];
}

function ProjectCard({ url, category, technologies }: ProjectCardProps) {
  const { data: previewData, isLoading, error } = useLinkPreview(url);

  return (
    <div className="space-y-3">
      <LinkPreviewCard
        url={url}
        previewData={previewData}
        isLoading={isLoading}
        error={error?.message || null}
      />
      
      {/* Badge Technologies */}
      <div className="flex flex-wrap gap-2 px-1">
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-science/20 text-science text-xs rounded-full font-medium">
          <Briefcase className="w-3 h-3" />
          {category}
        </span>
        {technologies.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 text-text-secondary text-xs rounded-full"
          >
            <Code2 className="w-3 h-3" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PortfolioProjects() {
  return (
    <main className="pt-24 pb-32 md:pb-12 px-4 max-w-6xl mx-auto min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-science/10 border border-science/30 rounded-full mb-4">
          <Globe className="w-4 h-4 text-science" />
          <span className="text-sm font-medium text-science">Portfolio</span>
        </div>
        <h2 className="text-3xl font-bold text-text-primary mb-3 font-[Space_Grotesk,sans-serif]">
          Featured Projects
        </h2>
        <p className="text-text-secondary max-w-xl mx-auto">
          A showcase of my recent work. Each card displays a live preview
          with auto-fetched metadata from the project URL.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            url={project.url}
            category={project.category}
            technologies={project.technologies}
          />
        ))}
      </div>

      {/* Footer Note */}
      <p className="text-center text-sm text-text-dim mt-8">
        Live previews powered by link-preview-js
      </p>
    </main>
  );
}
