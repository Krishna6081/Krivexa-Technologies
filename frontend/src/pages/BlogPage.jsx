import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS_DATA } from '../data/mockData';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { CTASection } from '../sections/CTASection';
import { Search, ArrowRight, ArrowLeft, Calendar, User } from 'lucide-react';

export const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS_DATA.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-16 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Engineering Insights"
          title="Articles & Perspectives on"
          gradientText="Modern Technology."
          subtitle="Deep dives into AI, cloud architecture, web development, and software engineering practices."
        />

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredPosts.map((post) => (
            <Card key={post.id} hoverable={true}>
              <CardBody className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="indigo" size="sm">{post.category}</Badge>
                    <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.publishedAt}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </span>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-500 hover:text-sky-600"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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

export const BlogPostPage = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS_DATA.find((b) => b.slug === slug) || BLOG_POSTS_DATA[0];

  return (
    <div className="py-16 bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-sky-500 hover:text-sky-600 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        <Badge variant="indigo" size="sm" className="mb-4">{post.category}</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-6 mb-8">
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{post.author}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.publishedAt}</span>
        </div>

        <div className="prose dark:prose-invert text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
          <p className="text-base font-medium text-[var(--text-primary)]">{post.excerpt}</p>
          <p>{post.content}</p>
        </div>
      </div>
      <CTASection />
    </div>
  );
};
