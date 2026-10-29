import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/common/CustomCursor';
import { BuildProgressBar } from './components/common/BuildProgressBar';
import { EditorTabBarNav } from './components/navigation/EditorTabBarNav';
import { CommandPalette } from './components/navigation/CommandPalette';
import { InteractiveTerminal } from './components/terminal/InteractiveTerminal';
import { BootLoader } from './components/terminal/BootLoader';
import { ProjectModal } from './components/project/ProjectModal';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { ContactSection } from './sections/ContactSection';
import { FooterSection } from './sections/FooterSection';
import { ChatbotWidget } from './components/chat/ChatbotWidget';
import { Project } from './types/portfolio';
import { portfolioData } from './data/portfolio';

export function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  // State for modals
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleNavigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = portfolioData.projects.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex === -1) return;

    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % portfolioData.projects.length;
      setSelectedProject(portfolioData.projects[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + portfolioData.projects.length) % portfolioData.projects.length;
      setSelectedProject(portfolioData.projects[prevIndex]);
    }
  };

  const handleSelectProjectById = (projectId: string) => {
    const proj = portfolioData.projects.find((p) => p.id === projectId);
    if (proj) setSelectedProject(proj);
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* 1. Page Boot Sequence (Shown once per session, skippable) */}
      <BootLoader onComplete={() => {}} />

      {/* 2. Desktop Custom Glow Cursor */}
      <CustomCursor />

      {/* 3. Top Build Progress Bar */}
      <BuildProgressBar />

      {/* 4. Sticky IDE Tab Bar Header */}
      <EditorTabBarNav
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* 5. Main Content Sections */}
      <main className="flex-1">
        <HeroSection onOpenTerminal={() => setTerminalOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection onOpenProject={handleOpenProject} />
        <CertificationsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* 6. Footer & Easter Egg Terminal Shell */}
      <FooterSection
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* 7. Shared-element Project Expansion IDE Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigate={handleNavigateProject}
      />

      {/* 8. Fullscreen Developer CLI Shell */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onSelectProject={handleSelectProjectById}
      />

      {/* 9. Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectProject={handleSelectProjectById}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* 10. Floating Interactive Chatbot Assistant & Email Messenger */}
      <ChatbotWidget />
    </div>
  );
}

export default App;
