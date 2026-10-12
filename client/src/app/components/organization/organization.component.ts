
import { Component } from '@angular/core';

interface GovernanceRole {
  id: string;
  title: string;
  category: string;
  icon: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
  expanded: boolean;
}

interface GovernanceFaq {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent {
  public searchText = '';
  public selectedCategory = 'All';
  public selectedRole: GovernanceRole | null = null;
  public activeStep = 0;

  public roles: GovernanceRole[] = [
    {
      id: 'executive',
      title: 'Executive Director',
      category: 'Leadership',
      icon: '🧭',
      summary: 'Coordinates the project vision, learning priorities, and overall planning.',
      responsibilities: [
        'Maintain the project mission and educational objectives.',
        'Coordinate proposed activities and review milestones.',
        'Encourage transparent planning and responsible communication.'
      ],
      skills: ['Strategic planning', 'Coordination', 'Accountability'],
      expanded: false
    },
    {
      id: 'europe',
      title: 'Director of European Affairs',
      category: 'Research',
      icon: '🌍',
      summary: 'Guides regional research and organizes learning materials about Europe and the Black Sea.',
      responsibilities: [
        'Review historical and regional learning resources.',
        'Identify reliable public sources for academic research.',
        'Prepare background notes for proposed student discussions.'
      ],
      skills: ['Regional research', 'Source evaluation', 'Cross-cultural learning'],
      expanded: false
    },
    {
      id: 'outreach',
      title: 'Director of Community Outreach',
      category: 'Community',
      icon: '🤝',
      summary: 'Plans ways to make educational activities accessible to the Nashua community.',
      responsibilities: [
        'Develop proposed outreach and educational activities.',
        'Prepare clear participation information.',
        'Collect and review feedback from project users.'
      ],
      skills: ['Communication', 'Accessibility', 'Community engagement'],
      expanded: false
    },
    {
      id: 'education',
      title: 'Education and Curriculum Lead',
      category: 'Education',
      icon: '📚',
      summary: 'Structures learning activities, discussion prompts, and educational resources.',
      responsibilities: [
        'Organize learning topics into understandable sections.',
        'Prepare discussion questions and learning objectives.',
        'Review content for clarity, balance, and accessibility.'
      ],
      skills: ['Curriculum planning', 'Writing', 'Learning design'],
      expanded: false
    },
    {
      id: 'digital',
      title: 'Digital Project Coordinator',
      category: 'Technology',
      icon: '💻',
      summary: 'Coordinates website usability, content organization, and proposed improvements.',
      responsibilities: [
        'Review website navigation and responsive presentation.',
        'Identify usability issues and document proposed fixes.',
        'Maintain clear distinctions between sample data and verified information.'
      ],
      skills: ['Web usability', 'Content organization', 'Testing'],
      expanded: false
    }
  ];

  public get filteredRoles(): GovernanceRole[] {
    const query = this.searchText.trim().toLowerCase();

    return this.roles.filter(role => {
      const matchesQuery =
        !query ||
        role.title.toLowerCase().includes(query) ||
        role.summary.toLowerCase().includes(query) ||
        role.responsibilities.some(item => item.toLowerCase().includes(query));

      const matchesCategory =
        this.selectedCategory === 'All' ||
        role.category === this.selectedCategory;

      return matchesQuery && matchesCategory;
    });
  }

  public get categories(): string[] {
    return ['All', ...new Set(this.roles.map(role => role.category))];
  }

  public selectRole(role: GovernanceRole): void {
    this.selectedRole = role;
    this.roles.forEach(item => item.expanded = item.id === role.id);
  }

  public toggleRole(role: GovernanceRole): void {
    role.expanded = !role.expanded;
    this.selectedRole = role.expanded ? role : null;
  }

  public updateSearch(value: string): void {
    this.searchText = value;
  }

  public updateCategory(value: string): void {
    this.selectedCategory = value;
  }

  public resetFilters(): void {
    this.searchText = '';
    this.selectedCategory = 'All';
    this.selectedRole = null;
    this.roles.forEach(role => role.expanded = false);
  }

  public workflowSteps = [
    {
      title: 'Define the purpose',
      description: 'Clarify the educational issue, intended audience, and desired learning outcomes.',
      output: 'A concise activity brief'
    },
    {
      title: 'Review the evidence',
      description: 'Collect credible sources, check publication dates, and distinguish facts from interpretation.',
      output: 'A source-reviewed information pack'
    },
    {
      title: 'Plan inclusive dialogue',
      description: 'Prepare respectful questions, participation guidelines, and balanced discussion materials.',
      output: 'A discussion plan'
    },
    {
      title: 'Review and improve',
      description: 'Gather feedback, record lessons learned, and identify improvements for future activities.',
      output: 'A short evaluation summary'
    }
  ];

  public selectWorkflowStep(index: number): void {
    if (index >= 0 && index < this.workflowSteps.length) {
      this.activeStep = index;
    }
  }

  public matrixRows = [
    { task: 'Project goals and priorities', owner: 'Executive Director', support: 'Education Lead' },
    { task: 'Regional source review', owner: 'European Affairs', support: 'Education Lead' },
    { task: 'Community learning activities', owner: 'Community Outreach', support: 'Executive Director' },
    { task: 'Website usability review', owner: 'Digital Coordinator', support: 'All project roles' }
  ];

  public faqs: GovernanceFaq[] = [
    {
      question: 'Is this the official board of a registered nonprofit?',
      answer: 'No. These are proposed roles for an academic website project. They do not establish a legally registered organization, appointed directors, or a real board.',
      open: true
    },
    {
      question: 'How should responsibilities be assigned?',
      answer: 'For a project exercise, define one primary owner for each task, identify supporting roles, and record the expected deliverable and review date.',
      open: false
    },
    {
      question: 'How can governance remain transparent?',
      answer: 'Document decisions, explain the purpose of activities, use reliable sources, and make clear which plans are hypothetical and which have been completed.',
      open: false
    }
  ];

  public toggleFaq(index: number): void {
    if (this.faqs[index]) {
      this.faqs[index].open = !this.faqs[index].open;
    }
  }
}
