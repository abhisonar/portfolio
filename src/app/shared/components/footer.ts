import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="py-12 bg-bg-darker border-t border-slate-900/60 relative z-10">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-purple to-accent-blue p-[1px]">
            <div class="w-full h-full rounded-[7px] bg-[#0a0a0f] flex items-center justify-center">
              <span class="font-display font-extrabold text-white text-sm">AS</span>
            </div>
          </div>
          <span class="font-display font-semibold text-slate-400 tracking-wide">
            Abhishek Sonar
          </span>
        </div>

        <!-- Links -->
        <div class="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-slate-500">
          <a href="#hero" class="hover:text-slate-300 transition-colors">Home</a>
          <a href="#about" class="hover:text-slate-300 transition-colors">About</a>
          <a href="#skills" class="hover:text-slate-300 transition-colors">Skills</a>
          <a href="#experience" class="hover:text-slate-300 transition-colors">Experience</a>
          <a href="#projects" class="hover:text-slate-300 transition-colors">Projects</a>
          <a href="#contact" class="hover:text-slate-300 transition-colors">Contact</a>
        </div>

        <!-- Copyright -->
        <p class="text-xs text-slate-600 text-center md:text-right">
          &copy; {{ currentYear }} Abhishek Sonar. All rights reserved.
        </p>

      </div>
    </footer>
  `
})
export class Footer {
  protected readonly currentYear = new Date().getFullYear();
}
