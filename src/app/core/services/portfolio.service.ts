import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, query, orderBy } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, of } from 'rxjs';
import { Skill, Experience, Education, Project } from '../models/portfolio.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly firestore = inject(Firestore, { optional: true });

  // Fallback Mock Data
  private readonly mockProfile = {
    name: "Abhishek Sonar",
    title: "Senior Software Engineer & Frontend Architect",
    email: "abhisonar031@gmail.com",
    phone: "+91 8983764263",
    location: "Mumbai, Maharashtra",
    linkedin: "https://www.linkedin.com/in/abhisheksonar",
    github: "https://github.com/abhisonar",
    summary: "Lead-caliber Senior Software Engineer with 3+ years of expertise spanning Angular 14 to 22 and Micro-Frontend Architecture in high-traffic enterprise environments. Proven track record of scaling frontend operations, including increasing application efficiency by 40% and boosting team sprint velocity by 20% through standardized code quality gates and AI-assisted workflows. A hands-on mentor and Agile advocate dedicated to bridging complex business logic with modern, high-performance user experiences."
  };

  private readonly mockSkills: Skill[] = [
    { name: "Angular (14-22)", category: "Languages & Frameworks", iconClass: "devicon-angularjs-plain", proficiency: 98 },
    { name: "TypeScript", category: "Languages & Frameworks", iconClass: "devicon-typescript-plain", proficiency: 95 },
    { name: "JavaScript (ES6+)", category: "Languages & Frameworks", iconClass: "devicon-javascript-plain", proficiency: 92 },
    { name: "Node.js", category: "Languages & Frameworks", iconClass: "devicon-nodejs-plain", proficiency: 85 },
    { name: "HTML5 & CSS3/SASS", category: "Languages & Frameworks", iconClass: "devicon-html5-plain", proficiency: 95 },
    
    { name: "Anthropic Claude", category: "AI-Assisted Development", iconClass: "devicon-custom-claude", proficiency: 90 },
    { name: "OpenAI ChatGPT/Codex", category: "AI-Assisted Development", iconClass: "devicon-custom-openai", proficiency: 90 },
    { name: "Prompt Engineering", category: "AI-Assisted Development", iconClass: "devicon-custom-prompt", proficiency: 88 },
    
    { name: "RxJS", category: "Libraries & Tools", iconClass: "devicon-rxjs-plain", proficiency: 95 },
    { name: "NgRx / Redux", category: "Libraries & Tools", iconClass: "devicon-ngrx-plain", proficiency: 88 },
    { name: "Nx Workspace", category: "Libraries & Tools", iconClass: "devicon-custom-nx", proficiency: 90 },
    { name: "Angular Material", category: "Libraries & Tools", iconClass: "devicon-materialui-plain", proficiency: 92 },
    { name: "PrimeNG", category: "Libraries & Tools", iconClass: "devicon-custom-primeng", proficiency: 85 },
    { name: "Git", category: "Libraries & Tools", iconClass: "devicon-git-plain", proficiency: 90 },
    { name: "Docker", category: "Libraries & Tools", iconClass: "devicon-docker-plain", proficiency: 80 },
    
    { name: "Micro-Frontend", category: "Core Competencies", iconClass: "devicon-custom-mfe", proficiency: 92 },
    { name: "API Integration", category: "Core Competencies", iconClass: "devicon-custom-api", proficiency: 95 },
    { name: "Unit Testing", category: "Core Competencies", iconClass: "devicon-custom-test", proficiency: 88 },
    { name: "Agile / Scrum / Jira", category: "Core Competencies", iconClass: "devicon-jira-plain", proficiency: 90 },
    { name: "Code Review", category: "Core Competencies", iconClass: "devicon-custom-reviews", proficiency: 95 },
    
    { name: "AWS (EC2/S3)", category: "Cloud & DevOps", iconClass: "devicon-amazonwebservices-plain-wordmark", proficiency: 75 },
    { name: "CI/CD Pipelines", category: "Cloud & DevOps", iconClass: "devicon-custom-cicd", proficiency: 80 }
  ];

  private readonly mockExperience: Experience[] = [
    {
      company: "BosLeo Technology",
      role: "Senior Software Engineer",
      startDate: "Aug 2024",
      endDate: "Present",
      description: [
        "Leading development of enterprise-grade healthcare applications, overseeing end-to-end architecture, feature delivery, and system reliability for high-traffic environments.",
        "Empowered a 6+ member frontend team to achieve a 20% increase in sprint velocity by implementing standardized code reviews and automated quality gates.",
        "Integrated Nx Workspace to modularize development, reducing deployment dependencies and streamlining cross-team workflows.",
        "Slashed backend load by 30% by architecting advanced RxJS caching layers and optimizing API request strategies.",
        "Improved application performance by 40% through the implementation of lazy loading, code splitting, AOT compilation, and optimized state management.",
        "Integrated AI-Assisted Development Tools into the workflow, reducing feature turnaround time and improving overall development efficiency."
      ]
    },
    {
      company: "BosLeo Technology",
      role: "Junior Software Engineer",
      startDate: "Aug 2023",
      endDate: "Aug 2024",
      description: [
        "Engineered a high-availability healthcare portal using Angular, successfully reducing critical system downtime by 15% through robust state architecture.",
        "Slashed production bug reports by 40% by executing proactive debugging, deep logic optimization, and expanding unit test coverage.",
        "Utilized RxJS streams to manage asynchronous data feeds, directly enhancing real-time UI responsiveness for high-traffic clinical dashboards.",
        "Built complex, scalable healthcare registration workflows and dynamic user interfaces using Angular Reactive Forms with custom validation layers."
      ]
    },
    {
      company: "BosLeo Technology",
      role: "Software Engineer Trainee",
      startDate: "Jan 2023",
      endDate: "Aug 2023",
      description: [
        "Gained hands-on experience in Angular and its core methodologies, including component architecture, services, routing, and state management.",
        "Quickly transitioned from learning to contributing on a production-grade project for a cloud-based hospital integration system.",
        "Actively worked on the ongoing application version, successfully delivering key features for the next release, enhancing system functionality and user experience.",
        "Collaborated with senior developers to understand project workflows, best practices, and version control, laying a strong foundation in professional front-end development."
      ]
    }
  ];

  private readonly mockEducation: Education[] = [
    {
      institution: "Guru Gobind Singh College of Engg., Nashik",
      degree: "B.E. Computer Engineering",
      startDate: "2020",
      endDate: "2023",
      score: "CGPA: 8.7"
    },
    {
      institution: "Govt. Polytechnic, Nandurbar",
      degree: "Diploma in Computer Engineering",
      startDate: "2017",
      endDate: "2020",
      score: "88.97%"
    }
  ];

  private readonly mockProjects: Project[] = [
    {
      title: "Alex – Hospital Management System",
      description: "Led the technical design and execution of core clinical workflows, including Patient Registration, OPD/IPD, Laboratory/Imaging, Billing, and Inventory management modules.",
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      liveUrl: "",
      githubUrl: "",
      techStack: ["Angular", "RxJS", "Nx Workspace", "Micro-Frontends", "Module Federation", "OpenAI Codex", "Vitest"],
      longDescription: "A comprehensive hospital management platform deployed across multiple clinical branches. The project features a modular micro-frontend architecture using Nx and Module Federation to decouple complex business logic and enable independent team deployments. Integrated OpenAI Codex tools into the CI pipeline to accelerate unit test generation and feature delivery. Utilized custom RxJS caching layers to slash backend server load by 30%."
    },
    {
      title: "Alyssa – Hospital Information System",
      description: "Independently led the end-to-end development of Alyssa HIS v2, successfully transitioning the platform into a robust, cloud-native hospital management solution.",
      imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      liveUrl: "",
      githubUrl: "",
      techStack: ["Angular", "TypeScript", "EHR Systems", "National ID API Integration", "RxJS", "SCSS"],
      longDescription: "Alyssa HIS v2 is a cloud-native EHR and hospital information system. Designed and deployed EHR vital charts, medical certificate modules, and patient registration structures. Integrated National ID card reading hardware via automated APIs to speed up patient intake workflows. Managed all feature testing, pipelines, and releases single-handedly, achieving 100% on-time deployment with zero escalations."
    },
    {
      title: "Internship Management Portal",
      description: "Developed a role-based portal supporting customized workflows for administrators, HR professionals, and students.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      liveUrl: "",
      githubUrl: "https://github.com/abhisonar/internship-portal",
      techStack: ["Angular", "Node.js", "Express", "MongoDB", "JWT Auth", "Tailwind CSS"],
      longDescription: "A role-based portal providing customized dashboards for Students, HR managers, and Super Administrators. Key features include dynamic job/internship posting boards, real-time application tracking, an interactive PDF resume builder, and automated offer letter generators. Secured using robust JWT authentication, role-based route guards, and encrypted database pipelines."
    }
  ];

  // Signals exposed to the UI
  readonly profile = signal(this.mockProfile);
  readonly skills = signal<Skill[]>(this.mockSkills);
  readonly experience = signal<Experience[]>(this.mockExperience);
  readonly education = signal<Education[]>(this.mockEducation);
  readonly projects = signal<Project[]>(this.mockProjects);
  readonly loading = signal(false);

  constructor() {
    this.initializeRealtimeSync();
  }

  private initializeRealtimeSync() {
    // If Firebase credentials are still placeholders or Firestore is not provided, skip database connection
    if (!this.firestore || environment.firebase.apiKey === "YOUR_API_KEY_HERE") {
      console.log('Using local mock portfolio data (Firebase credentials not configured yet).');
      return;
    }

    try {
      this.loading.set(true);

      // Realtime Profile Sync
      const profileDocRef = doc(this.firestore, 'profile/default');
      const profile$ = (docData(profileDocRef) as Observable<any>).pipe(
        catchError(err => {
          console.error('Error fetching profile from Firestore:', err);
          return of(this.mockProfile);
        })
      );
      
      const firestoreProfile = toSignal(profile$);
      // Update local signal when firebase profile emits
      // We can use an effect or directly sync in subscribe, but with toSignal we can track
      profile$.subscribe(data => {
        if (data) this.profile.set(data);
      });

      // Realtime Skills Sync
      const skillsColRef = collection(this.firestore, 'skills');
      const skills$ = (collectionData(skillsColRef) as Observable<Skill[]>).pipe(
        catchError(err => {
          console.error('Error fetching skills from Firestore:', err);
          return of(this.mockSkills);
        })
      );
      skills$.subscribe(data => {
        if (data && data.length > 0) this.skills.set(data);
      });

      // Realtime Experience Sync
      const expColRef = collection(this.firestore, 'experience');
      const expQuery = query(expColRef, orderBy('sortIndex', 'asc'));
      const exp$ = (collectionData(expQuery) as Observable<Experience[]>).pipe(
        catchError(err => {
          console.error('Error fetching experience from Firestore:', err);
          return of(this.mockExperience);
        })
      );
      exp$.subscribe(data => {
        if (data && data.length > 0) this.experience.set(data);
      });

      // Realtime Education Sync
      const eduColRef = collection(this.firestore, 'education');
      const eduQuery = query(eduColRef, orderBy('sortIndex', 'asc'));
      const edu$ = (collectionData(eduQuery) as Observable<Education[]>).pipe(
        catchError(err => {
          console.error('Error fetching education from Firestore:', err);
          return of(this.mockEducation);
        })
      );
      edu$.subscribe(data => {
        if (data && data.length > 0) this.education.set(data);
      });

      // Realtime Projects Sync
      const projColRef = collection(this.firestore, 'projects');
      const projQuery = query(projColRef, orderBy('sortIndex', 'asc'));
      const proj$ = (collectionData(projQuery) as Observable<Project[]>).pipe(
        catchError(err => {
          console.error('Error fetching projects from Firestore:', err);
          return of(this.mockProjects);
        })
      );
      proj$.subscribe(data => {
        if (data && data.length > 0) {
          this.projects.set(data);
        }
        this.loading.set(false);
      });

    } catch (e) {
      console.error('Failed to initialize Firebase Firestore Sync:', e);
      this.loading.set(false);
    }
  }
}
