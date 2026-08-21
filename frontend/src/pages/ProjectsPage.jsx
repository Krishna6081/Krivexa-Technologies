import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/mockData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { CTASection } from '../sections/CTASection';
import { ArrowRight, ArrowLeft, ExternalLink, Search } from 'lucide-react';
import { GithubIcon } from '../components/common/SocialIcons';

export const ProjectsPage = () => {
  const categories = ["All", "Web", "Mobile", "AI/ML", "Enterprise"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Engineering Portfolio"
          title="Featured Software & Digital"
          gradientText="Product Deliveries."
          subtitle="Filter through our client deliverables, mobile apps, SaaS platforms, and AI projects."
        />

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 max-w-4xl mx-auto">
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search projects by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <Tabs
            tabs={categories.map((c) => ({ id: c, label: c }))}
            activeTab={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} hoverable={true} className="flex flex-col justify-between overflow-hidden">
              <div className="relative h-60 overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="indigo" size="sm">{project.category}</Badge>
                </div>
              </div>

              <CardBody className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" size="sm">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-500 hover:text-sky-600"
                  >
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[var(--bg-elevated)] hover:text-sky-500 text-[var(--text-muted)]"><ExternalLink className="w-3.5 h-3.5" /></a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[var(--bg-elevated)] hover:text-sky-500 text-[var(--text-muted)]"><GithubIcon className="w-3.5 h-3.5" /></a>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <CTASection />
    </div>
  );
};

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = PROJECTS_DATA.find((p) => p.slug === slug) || PROJECTS_DATA[0];

  return (
    <div className="py-16 bg-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-bold text-sky-500 hover:text-sky-600 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        <div className="glass-panel p-8 rounded-3xl border border-[var(--border-subtle)] mb-8">
          <Badge variant="purple" size="sm" className="mb-4">{project.category}</Badge>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-4">{project.title}</h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t, idx) => (
              <Badge key={idx} variant="default" size="sm">{t}</Badge>
            ))}
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden mb-8 border border-[var(--border-subtle)]">
          <img src={project.image} alt={project.title} className="w-full h-80 object-cover" />
        </div>
      </div>
      <CTASection />
    </div>
  );
};
