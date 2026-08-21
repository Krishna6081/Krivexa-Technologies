-- Krivexa Technologies Initial Database Seed Script

-- Hashed password for admin123 using bcrypt (cost 10)
INSERT INTO users (name, email, password_hash, role)
VALUES ('Krivexa Administrator', 'admin@krivexa.com', '$2a$10$E9s63O6p4N.B.2pB92p.ueD7L72x0oV2N5W/B78u3b.4Hh.uR9cKO', 'SUPER_ADMIN')
ON CONFLICT (email) DO NOTHING;

-- Seed Services
INSERT INTO services (slug, title, short_description, full_description, icon)
VALUES 
('software-development', 'Software Development', 'Custom enterprise software systems tailored to your exact operational workflows.', 'Krivexa Technologies delivers end-to-end custom software development services designed for performance, security, and long-term growth.', 'Code'),
('web-development', 'Web Development', 'Blazing fast, modern web applications built with React, Next.js, and cloud infrastructure.', 'We craft web applications that combine modern aesthetics, ultra-fast performance, and responsive layout across all device viewports.', 'Globe'),
('ai-machine-learning', 'AI & Machine Learning', 'Intelligent automation, predictive models, NLP, and generative AI integration.', 'Unlock competitive advantage through custom AI algorithms, predictive analytics, and automated decision-making workflows.', 'Cpu')
ON CONFLICT (slug) DO NOTHING;
