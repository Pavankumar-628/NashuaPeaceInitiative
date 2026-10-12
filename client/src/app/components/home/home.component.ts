
import { Component, OnInit } from '@angular/core';

export interface FlashpointZone {
  id: string;
  name: string;
  littoralNation: string;
  coordinates: string;
  securityStatus: 'Critical Transit' | 'Monitoring' | 'High Friction' | 'Academic Hub';
  statusColor: string;
  keyChallenge: string;
  initiativeAction: string;
}

export interface BudgetItem {
  category: string;
  baseAmount: number;
  description: string;
  priority: 'High' | 'Medium' | 'Essential';
}

interface Initiative {
  title: string;
  category: string;
  description: string;
  icon: string;
  action: string;
}

interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // 1. Regional explorer
  public flashpoints: FlashpointZone[] = [
    {
      id: 'constanta',
      name: 'Port of Constanța & Dobruja Corridor',
      littoralNation: 'Romania',
      coordinates: '44.1792° N, 28.6498° E',
      securityStatus: 'Academic Hub',
      statusColor: '#059669',
      keyChallenge: 'Understanding maritime trade, grain exports, and commercial shipping disruption.',
      initiativeAction: 'Explore educational dialogue and academic exchange ideas connected to Romania.'
    },
    {
      id: 'bosporus',
      name: 'Turkish Straits',
      littoralNation: 'Turkey',
      coordinates: '41.1167° N, 29.0667° E',
      securityStatus: 'Critical Transit',
      statusColor: '#0284c7',
      keyChallenge: 'Understanding the strategic importance of the Bosporus and Dardanelles waterways.',
      initiativeAction: 'Study international maritime law, diplomacy, and the role of the Montreux Convention.'
    },
    {
      id: 'snake-island',
      name: 'Snake Island Maritime Region',
      littoralNation: 'Ukraine / Romania maritime region',
      coordinates: '45.2550° N, 30.2033° E',
      securityStatus: 'High Friction',
      statusColor: '#dc2626',
      keyChallenge: 'Learning about maritime boundaries, commercial routes, and regional security concerns.',
      initiativeAction: 'Review historical maps, maritime agreements, and peaceful dispute-resolution approaches.'
    },
    {
      id: 'batumi',
      name: 'Batumi & South Caucasus Gateway',
      littoralNation: 'Georgia',
      coordinates: '41.6434° N, 41.6399° E',
      securityStatus: 'Monitoring',
      statusColor: '#d97706',
      keyChallenge: 'Understanding regional connectivity, energy transit, and cultural diplomacy.',
      initiativeAction: 'Explore student dialogue, cultural exchange, and cross-regional educational activities.'
    }
  ];

  public selectedZone: FlashpointZone = this.flashpoints[0];
  public regionSearch = '';
  public selectedStatus = 'All';

  // 2. Search and filter regions
  public get filteredFlashpoints(): FlashpointZone[] {
    const search = this.regionSearch.trim().toLowerCase();

    return this.flashpoints.filter(zone => {
      const matchesSearch =
        !search ||
        zone.name.toLowerCase().includes(search) ||
        zone.littoralNation.toLowerCase().includes(search) ||
        zone.keyChallenge.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        zone.securityStatus === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  public selectZone(zone: FlashpointZone): void {
    this.selectedZone = zone;
  }

  public onRegionSearch(value: string): void {
    this.regionSearch = value;
  }

  public onStatusFilter(value: string): void {
    this.selectedStatus = value;
  }

  public resetRegionFilters(): void {
    this.regionSearch = '';
    this.selectedStatus = 'All';
  }

  // 3. Illustrative budget simulator
  public baseBudgetItems: BudgetItem[] = [
    {
      category: 'Learning Materials & Maps',
      baseAmount: 3200,
      description: 'Educational materials, historical maps, and digital learning resources.',
      priority: 'High'
    },
    {
      category: 'Student Dialogue Sessions',
      baseAmount: 2800,
      description: 'Proposed virtual roundtables and student discussion activities.',
      priority: 'High'
    },
    {
      category: 'Academic Consultation',
      baseAmount: 2100,
      description: 'Illustrative allocation for academic guidance and subject expertise.',
      priority: 'Medium'
    },
    {
      category: 'Website & Learning Resources',
      baseAmount: 1400,
      description: 'Illustrative allowance for website maintenance and learning resources.',
      priority: 'Essential'
    }
  ];

  public budgetScaleMultiplier = 1;
  public totalSimulatedBudget = 9500;

  public get budgetItems(): BudgetItem[] {
    return this.baseBudgetItems.map(item => ({
      ...item,
      baseAmount: this.getAdjustedAmount(item.baseAmount)
    }));
  }

  public onBudgetSliderChange(value: string | number): void {
    const parsed = Number(value);
    this.budgetScaleMultiplier = Number.isFinite(parsed)
      ? Math.max(0.5, Math.min(2, parsed))
      : 1;

    this.recalculateBudget();
  }

  public recalculateBudget(): void {
    this.totalSimulatedBudget = this.baseBudgetItems.reduce(
      (total, item) => total + this.getAdjustedAmount(item.baseAmount),
      0
    );
  }

  public getAdjustedAmount(baseAmount: number): number {
    return Math.round(baseAmount * this.budgetScaleMultiplier);
  }

  public getCategoryPercentage(baseAmount: number): number {
    if (!this.totalSimulatedBudget) {
      return 0;
    }

    return Math.round(
      (this.getAdjustedAmount(baseAmount) / this.totalSimulatedBudget) * 100
    );
  }

  public formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  }

  public resetBudget(): void {
    this.budgetScaleMultiplier = 1;
    this.recalculateBudget();
  }

  // 4. Peacebuilding impact estimator
  public estimatedVolunteers = 25;
  public plannedWorkshops = 6;

  public get estimatedStudentsReached(): number {
    return this.plannedWorkshops * 28 + this.estimatedVolunteers * 4;
  }

  public get engagementScore(): number {
    return Math.min(
      99,
      Math.round(45 + this.plannedWorkshops * 5.5 + this.estimatedVolunteers * 0.8)
    );
  }

  public onVolunteerChange(value: string | number): void {
    this.estimatedVolunteers = this.clampNumber(value, 0, 100, 25);
  }

  public onWorkshopChange(value: string | number): void {
    this.plannedWorkshops = this.clampNumber(value, 0, 20, 6);
  }

  public resetImpactEstimator(): void {
    this.estimatedVolunteers = 25;
    this.plannedWorkshops = 6;
  }

  private clampNumber(
    value: string | number,
    min: number,
    max: number,
    fallback: number
  ): number {
    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
      return fallback;
    }

    return Math.max(min, Math.min(max, Math.round(parsed)));
  }

  // 5. Illustrative project milestones
  public milestones = [
    {
      title: 'Project concept and goals',
      description: 'Define the educational purpose and intended audience.',
      progress: 100,
      status: 'Concept stage'
    },
    {
      title: 'Website structure',
      description: 'Organize the main pages and regional learning sections.',
      progress: 75,
      status: 'In development'
    },
    {
      title: 'Interactive learning tools',
      description: 'Add regional exploration, budget estimates, and impact calculations.',
      progress: 40,
      status: 'Planned / in progress'
    },
    {
      title: 'Review and usability testing',
      description: 'Check navigation, accessibility, responsive layout, and page content.',
      progress: 10,
      status: 'To be reviewed'
    }
  ];

  // 6. Educational initiative cards
  public initiatives: Initiative[] = [
    {
      title: 'Student Dialogue',
      category: 'Education',
      description: 'Plan structured conversations about peacebuilding and cross-cultural understanding.',
      icon: '💬',
      action: 'get-involved'
    },
    {
      title: 'Regional Learning',
      category: 'Research',
      description: 'Explore the geography, history, and diplomatic context of the Black Sea region.',
      icon: '🌍',
      action: 'region'
    },
    {
      title: 'Maps & Documents',
      category: 'Resources',
      description: 'Organize learning materials and references for further study.',
      icon: '📚',
      action: 'documents'
    }
  ];

  // 7. Initiative search and category filtering
  public initiativeSearch = '';
  public selectedInitiativeCategory = 'All';

  public get filteredInitiatives(): Initiative[] {
    const search = this.initiativeSearch.trim().toLowerCase();

    return this.initiatives.filter(item => {
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search);

      const matchesCategory =
        this.selectedInitiativeCategory === 'All' ||
        item.category === this.selectedInitiativeCategory;

      return matchesSearch && matchesCategory;
    });
  }

  public onInitiativeSearch(value: string): void {
    this.initiativeSearch = value;
  }

  public onInitiativeCategoryChange(value: string): void {
    this.selectedInitiativeCategory = value;
  }

  public resetInitiativeFilters(): void {
    this.initiativeSearch = '';
    this.selectedInitiativeCategory = 'All';
  }

  // 8. Expandable FAQ section
  public faqs: FaqItem[] = [
    {
      question: 'What is the purpose of this website?',
      answer: 'It is an educational project exploring peacebuilding, regional understanding, and dialogue related to the Black Sea region.',
      open: true
    },
    {
      question: 'Is this a registered nonprofit organization?',
      answer: 'The website is an academic project. It does not claim that a nonprofit has been legally registered or that formal partnerships have been established.',
      open: false
    },
    {
      question: 'Are the budget and impact figures real?',
      answer: 'No. The budget and impact calculator uses illustrative assumptions for learning and planning. It does not represent received funding or verified participation.',
      open: false
    },
    {
      question: 'Can I use the website on a phone?',
      answer: 'The page is designed to adapt to smaller screens. The layout should still be tested on different browsers and devices before publication.',
      open: false
    }
  ];

  public toggleFaq(index: number): void {
    if (index >= 0 && index < this.faqs.length) {
      this.faqs[index].open = !this.faqs[index].open;
    }
  }

  // 9. Navigation helpers
  public scrollToSection(sectionId: string): void {
    const allowedSections = [
      'home',
      'regions',
      'budget',
      'impact',
      'initiatives',
      'milestones',
      'faq'
    ];

    if (!allowedSections.includes(sectionId)) {
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  public goToInitiative(action: string): void {
    if (action === 'region') {
      this.scrollToSection('regions');
      return;
    }

    const allowedPages: Record<string, string> = {
      'get-involved': '/get-involved',
      documents: '/documents',
      feedback: '/feedback',
      about: '/about'
    };

    const destination = allowedPages[action];

    if (destination) {
      window.location.href = destination;
    }
  }

  // 10. Quick action feedback
  public copiedProjectUrl = false;

  public async copyProjectUrl(): Promise<void> {
    const projectUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(projectUrl);
      this.copiedProjectUrl = true;
    } catch {
      this.copiedProjectUrl = false;
    }
  }

  public ngOnInit(): void {
    this.recalculateBudget();
  }
}
