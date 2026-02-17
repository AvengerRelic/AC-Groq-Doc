
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, Zap, Layout, ArrowRight, Github } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden relative selection:bg-primary/30">

      {/* Background Gradients */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse delay-1000" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">NexDash</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 container mx-auto px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          v1.0 Public Beta is now live
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
          The Future of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Data Visualization</span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-900 delay-100">
          Empower your team with AI-driven insights, role-based security, and stunning visualizations. Built with the latest tech stack for peak performance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <Link href="/signup">
            <Button size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-lg shadow-primary/25">
              Start Building Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="https://github.com" target="_blank">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/20 bg-white/5 hover:bg-white/10">
              <Github className="mr-2 h-5 w-5" />
              Star on GitHub
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-900/50 backdrop-blur-sm border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
            <p className="text-slate-400">Powerful features to turbocharge your workflow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 text-primary border border-primary/20">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle>Role-Based Security</CardTitle>
                <CardDescription className="text-slate-400">
                  Granular control over Admin and User roles with approval workflows built-in.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4 text-secondary border border-secondary/20">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle>AI Powered</CardTitle>
                <CardDescription className="text-slate-400">
                  Instant video summarization and study notes generation using advanced AI models.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 text-accent border border-accent/20">
                  <Layout className="h-6 w-6" />
                </div>
                <CardTitle>Modern UI/UX</CardTitle>
                <CardDescription className="text-slate-400">
                  Stunning glassmorphism design with responsive layouts and smooth animations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 bg-[#0a0f1e]">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-white">NexDash</span>
            </div>
            <p className="text-slate-400 text-sm">
              Empowering teams with data-driven insights and AI tools for the future of work.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Status</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <p className="text-white font-medium mb-1">Email</p>
                <a href="mailto:support@nexdash.com" className="hover:text-primary transition-colors">support@nexdash.com</a>
              </li>
              <li>
                <p className="text-white font-medium mb-1">Address</p>
                <p>1234 Innovation Dr,<br />Tech City, CA 94000</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; 2026 NexDash Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
