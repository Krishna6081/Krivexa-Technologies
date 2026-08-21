import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/mockData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { ArrowRight, ExternalLink } from 'lucide-react';

export const FeaturedProjectsSection = () => {
  const categories = ["All", "Web", "Mobile", "AI/ML", "Enterprise"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Engineering Portfolio"
          title="Featured Client Projects &"
          gradientText="Software Deliveries."
          subtitle="Explore our portfolio of scalable web applications, mobile platforms, enterprise software, and AI solutions."
        />

        {/* Filter Pills */}
        <div className="flex justify-center mb-12">
          <Tabs
            tabs={categories.map((c) => ({ id: c, label: c }))}
            activeTab={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-panel rounded-[24px] border border-[var(--border-subtle)] overflow-hidden hover:border-blue-500/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image with Scale & Dark Gradient Overlay */}
              <div className="relative h-64 overflow-hidden bg-[#08111F]">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08111F] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <Badge variant="indigo" size="sm">{project.category}</Badge>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl font-extrabold text-[var(--text-primary)] mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" size="sm">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-[var(--border-subtle)] mt-auto">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                  >
                    <span>View Project Architecture</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>

                  <Link
                    to={`/case-studies/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <span>Case Study</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
