import { Component, signal, inject, OnInit } from '@angular/core';
import { CustomCursor } from '../../shared/components/custom-cursor';
import { LoadingScreen } from '../../shared/components/loading-screen';
import { Navbar } from '../../shared/components/navbar';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Skills } from '../skills/skills';
import { ExperienceTimeline } from '../experience/experience-timeline';
import { Projects } from '../projects/projects';
import { Contact } from '../contact/contact';
import { Footer } from '../../shared/components/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CustomCursor,
    LoadingScreen,
    Navbar,
    Hero,
    About,
    Skills,
    ExperienceTimeline,
    Projects,
    Contact,
    Footer
  ],
  template: `
    <!-- Custom Mouse Physics Cursor -->
    <app-custom-cursor></app-custom-cursor>

    <!-- Animated Entry Loading Screen -->
    @if (isLoading()) {
      <app-loading-screen></app-loading-screen>
    }

    <!-- Main Content Layout (Revealed after loading completes) -->
    <div 
      [style.opacity]="isLoading() ? 0 : 1"
      class="transition-opacity duration-700 min-h-screen flex flex-col justify-between">
      
      <!-- Sticky Navigation -->
      <app-navbar></app-navbar>

      <!-- Main Scrollable Sections -->
      <main class="flex-grow">
        <app-hero></app-hero>
        <app-about></app-about>
        <app-skills></app-skills>
        <app-experience-timeline></app-experience-timeline>
        <app-projects></app-projects>
        <app-contact></app-contact>
      </main>

      <!-- Footer layout -->
      <app-footer></app-footer>
    </div>
  `
})
export class Home implements OnInit {
  protected readonly isLoading = signal(true);

  ngOnInit() {
    // Keep loading screen for 1.8 seconds to display entering logo
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1800);
  }
}
