import { Component, signal, inject } from '@angular/core';
import { FormField, form, required, email, submit } from '@angular/forms/signals';
import { NgmMotionDirective } from '@scripttype/ng-motion';
import { PortfolioService } from '../../core/services/portfolio.service';

interface ContactData {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormField, NgmMotionDirective],
  template: `
    <section id="contact" class="py-24 relative overflow-hidden bg-primary">
      <div class="max-w-6xl mx-auto px-6">
        
        <!-- Section Header -->
        <div 
          ngmMotion
          [initial]="{ opacity: 0, y: 20 }"
          [whileInView]="{ opacity: 1, y: 0 }"
          [viewport]="{ once: true }"
          [transition]="{ duration: 0.6 }"
          class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight font-display">
            Contact <span class="text-accent-blue">Me</span>
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto mt-4 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <!-- Contact info side -->
          <div 
            ngmMotion
            [initial]="{ opacity: 0, x: -30 }"
            [whileInView]="{ opacity: 1, x: 0 }"
            [viewport]="{ once: true }"
            [transition]="{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }"
            class="lg:col-span-5 space-y-8">
            
            <div class="space-y-4">
              <h3 class="text-2xl font-bold font-display text-slate-100">Let's talk about your project</h3>
              <p class="text-slate-400 leading-relaxed">
                Feel free to reach out for collaborations, job opportunities, or just to say hi! I'll get back to you as soon as possible.
              </p>
            </div>

            <!-- Contact cards list -->
            <div class="space-y-4 pt-4">
              <!-- Email Card -->
              <a 
                [href]="'mailto:' + profile().email"
                class="glass-card p-5 rounded-2xl flex items-center gap-4 hover:border-accent-blue/30 transition-all block">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-accent-blue/10 text-accent-blue">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Email Me</span>
                  <span class="text-sm font-semibold text-slate-200">{{ profile().email }}</span>
                </div>
              </a>

              <!-- Location Card -->
              <div class="glass-card p-5 rounded-2xl flex items-center gap-4 border border-slate-800/80">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-accent-teal/10 text-accent-teal">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Location</span>
                  <span class="text-sm font-semibold text-slate-200">{{ profile().location }}</span>
                </div>
              </div>
            </div>

            <!-- Social handles icons -->
            <div class="flex items-center gap-4 pt-4">
              <a 
                [href]="profile().linkedin" 
                target="_blank" 
                ngmMotion
                [whileHover]="{ scale: 1.1, y: -2 }"
                [whileTap]="{ scale: 0.95 }"
                class="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-accent-blue border border-slate-800 hover:border-accent-blue/30 transition-all">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                [href]="profile().github" 
                target="_blank" 
                ngmMotion
                [whileHover]="{ scale: 1.1, y: -2 }"
                [whileTap]="{ scale: 0.95 }"
                class="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-accent-purple border border-slate-800 hover:border-accent-purple/30 transition-all">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

          </div>

          <!-- Form side -->
          <div 
            ngmMotion
            [initial]="{ opacity: 0, x: 30 }"
            [whileInView]="{ opacity: 1, x: 0 }"
            [viewport]="{ once: true }"
            [transition]="{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }"
            class="lg:col-span-7">
            
            <form (submit)="onSubmit(); $event.preventDefault()" class="glass-card p-6 md:p-8 rounded-3xl space-y-5 border border-slate-800/80">
              
              <!-- Name Input -->
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Full Name</label>
                <input 
                  [formField]="contactForm.name"
                  type="text" 
                  placeholder="John Doe" 
                  class="w-full px-4 py-3 bg-primary-light border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 transition-all">
                @if (contactForm.name().touched() && contactForm.name().invalid()) {
                  <span class="text-xs text-red-400 font-medium block">
                    @for (error of contactForm.name().errors(); track error.kind) {
                      {{ error.message }}
                    }
                  </span>
                }
              </div>

              <!-- Email Input -->
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Email Address</label>
                <input 
                  [formField]="contactForm.email"
                  type="email" 
                  placeholder="john@example.com" 
                  class="w-full px-4 py-3 bg-primary-light border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 transition-all">
                @if (contactForm.email().touched() && contactForm.email().invalid()) {
                  <span class="text-xs text-red-400 font-medium block">
                    @for (error of contactForm.email().errors(); track error.kind) {
                      {{ error.message }}
                    }
                  </span>
                }
              </div>

              <!-- Message Input -->
              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Message</label>
                <textarea 
                  [formField]="contactForm.message"
                  rows="5" 
                  placeholder="Hi Abhishek, let's connect..." 
                  class="w-full px-4 py-3 bg-primary-light border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 transition-all resize-none"></textarea>
                @if (contactForm.message().touched() && contactForm.message().invalid()) {
                  <span class="text-xs text-red-400 font-medium block">
                    @for (error of contactForm.message().errors(); track error.kind) {
                      {{ error.message }}
                    }
                  </span>
                }
              </div>

              <!-- Submit button -->
              <button 
                type="submit" 
                ngmMotion
                [whileHover]="{ scale: 1.02 }"
                [whileTap]="{ scale: 0.98 }"
                [disabled]="isSubmitting()"
                class="w-full py-4 rounded-xl font-bold tracking-wide bg-gradient-to-r from-accent-blue to-accent-purple text-slate-900 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,210,255,0.35)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                @if (isSubmitting()) {
                  <svg class="animate-spin h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                } @else {
                  Send Message
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                }
              </button>

              <!-- Success Alert Message -->
              @if (isSubmitted()) {
                <div 
                  ngmMotion
                  [initial]="{ opacity: 0, y: 10 }"
                  [animate]="{ opacity: 1, y: 0 }"
                  class="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-semibold text-center">
                  Thank you! Your message has been sent successfully. I'll get back to you soon.
                </div>
              }

            </form>
          </div>

        </div>

      </div>
    </section>
  `
})
export class Contact {
  private readonly portfolioService = inject(PortfolioService);
  protected readonly profile = this.portfolioService.profile;

  // State signals
  protected readonly isSubmitting = signal(false);
  protected readonly isSubmitted = signal(false);

  // Form model and configuration using Signal Forms
  protected readonly contactModel = signal<ContactData>({ name: '', email: '', message: '' });

  protected readonly contactForm = form(this.contactModel, (fields) => {
    required(fields.name, { message: 'Name is required' });
    required(fields.email, { message: 'Email address is required' });
    email(fields.email, { message: 'Please enter a valid email address' });
    required(fields.message, { message: 'Message is required' });
  });

  onSubmit() {
    submit(this.contactForm, async () => {
      this.isSubmitting.set(true);
      
      // Simulate API submit delay using promise
      await new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 1500);
      });
      
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
      
      // Reset form model signal values
      this.contactModel.set({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => this.isSubmitted.set(false), 5000);
    });
  }
}
