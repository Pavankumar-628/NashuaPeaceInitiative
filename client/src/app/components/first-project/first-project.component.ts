import { Component, OnInit } from '@angular/core';

type InitiativeStatus =
  'Planned' | 'Active' | 'Monitoring' | 'Completed';

type RiskCategory =
  'Inclusion' | 'Safety' | 'Misinformation' | 'Resources' | 'Other';


interface PeaceInitiative {
  id: string;
  title: string;
  location: string;
  focus: string;
  status: InitiativeStatus;
  urgency: number;
  impact: number;
  feasibility: number;
  communitySupport: number;
}

interface StakeholderRecord {
  id: string;
  name: string;
  category: string;
  stage: string;
  note: string;
}

interface CommunityConcern {
  id: string;
  title: string;
  category: RiskCategory;
  likelihood: number;
  impact: number;
  exposure: number;
  mitigation: string;
}

interface DialogueTheme {
  label: string;
  keywords: string[];
  count: number;
}

@Component({
  selector: 'app-first-project',
  templateUrl: './first-project.component.html',
  styleUrls: ['./first-project.component.css']
})
export class FirstProjectComponent implements OnInit {
  readonly Math = Math;

  private readonly storageKey =
    'nashua-peace-planning-workspace-v1';

  initiatives: PeaceInitiative[] = [];
  stakeholders: StakeholderRecord[] = [];
  concerns: CommunityConcern[] = [];

  searchText = '';
  statusFilter: 'All' | InitiativeStatus = 'All';
  workspaceMessage = '';
  dialogueNotes = '';
  totalBudget = 10000;

  budgetAllocations = {
    dialogue: 30,
    outreach: 25,
    research: 30,
    administration: 15
  };

  initiativeForm = {
    title: '',
    location: '',
    focus: '',
    status: 'Planned' as InitiativeStatus,
    urgency: 3,
    impact: 3,
    feasibility: 3,
    communitySupport: 3
  };

  stakeholderForm = {
    name: '',
    category: 'Community group',
    stage: 'To contact',
    note: ''
  };

  concernForm = {
    title: '',
    category: 'Inclusion' as RiskCategory,
    likelihood: 3,
    impact: 3,
    exposure: 3,
    mitigation: ''
  };

  themes: DialogueTheme[] = [
    {
      label: 'Cooperation',
      keywords: ['cooperation', 'collaboration', 'together'],
      count: 0
    },
    {
      label: 'Safety',
      keywords: ['safety', 'security', 'protection'],
      count: 0
    },
    {
      label: 'Displacement',
      keywords: ['displacement', 'displaced', 'refugee'],
      count: 0
    },
    {
      label: 'Mediation',
      keywords: ['mediation', 'dialogue', 'negotiation'],
      count: 0
    },
    {
      label: 'Education',
      keywords: ['education', 'school', 'learning'],
      count: 0
    }
  ];

  ngOnInit(): void {
    this.loadWorkspace();
  }

  get filteredInitiatives(): PeaceInitiative[] {
    const query = this.searchText.trim().toLowerCase();

    return this.initiatives.filter(item => {
      const matchesQuery =
        !query ||
        [item.title, item.location, item.focus].some(value =>
          value.toLowerCase().includes(query)
        );

      const matchesStatus =
        this.statusFilter === 'All' ||
        item.status === this.statusFilter;

      return matchesQuery && matchesStatus;
    });
  }

  get totalRiskScore(): number {
    return this.concerns.reduce(
      (sum, concern) => sum + this.riskScore(concern),
      0
    );
  }

  get allocationTotal(): number {
    return this.budgetAllocations.dialogue +
      this.budgetAllocations.outreach +
      this.budgetAllocations.research +
      this.budgetAllocations.administration;
  }

  get budgetIsValid(): boolean {
    return this.allocationTotal === 100;
  }

  get dialogueWordCount(): number {
    const trimmed = this.dialogueNotes.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }

  addInitiative(): void {
    const title = this.initiativeForm.title.trim();

    if (!title) {
      this.workspaceMessage =
        'Enter an initiative title before adding the record.';
      return;
    }

    const item: PeaceInitiative = {
      id: this.makeId(),
      ...this.initiativeForm,
      title,
      location: this.initiativeForm.location.trim(),
      focus: this.initiativeForm.focus.trim()
    };

    this.initiatives = [item, ...this.initiatives];

    this.initiativeForm = {
      title: '',
      location: '',
      focus: '',
      status: 'Planned',
      urgency: 3,
      impact: 3,
      feasibility: 3,
      communitySupport: 3
    };

    this.saveWorkspace();
    this.workspaceMessage = 'Initiative added.';
  }

  updateInitiativeStatus(
    id: string,
    status: InitiativeStatus
  ): void {
    this.initiatives = this.initiatives.map(item =>
      item.id === id ? { ...item, status } : item
    );

    this.saveWorkspace();
  }

  removeInitiative(id: string): void {
    this.initiatives = this.initiatives.filter(
      item => item.id !== id
    );

    this.saveWorkspace();
    this.workspaceMessage = 'Initiative removed.';
  }

  initiativePriority(item: PeaceInitiative): number {
    const score =
      item.urgency * 0.35 +
      item.impact * 0.30 +
      item.feasibility * 0.20 +
      item.communitySupport * 0.15;

    return Math.round(score * 10) / 10;
  }

  addStakeholder(): void {
    const name = this.stakeholderForm.name.trim();

    if (!name) {
      this.workspaceMessage =
        'Enter a stakeholder label before adding the record.';
      return;
    }

    const record: StakeholderRecord = {
      id: this.makeId(),
      name,
      category: this.stakeholderForm.category,
      stage: this.stakeholderForm.stage,
      note: this.stakeholderForm.note.trim()
    };

    this.stakeholders = [record, ...this.stakeholders];

    this.stakeholderForm = {
      name: '',
      category: 'Community group',
      stage: 'To contact',
      note: ''
    };

    this.saveWorkspace();
    this.workspaceMessage =
      'Stakeholder planning record added.';
  }

  removeStakeholder(id: string): void {
    this.stakeholders = this.stakeholders.filter(
      item => item.id !== id
    );

    this.saveWorkspace();
  }

  addConcern(): void {
    const title = this.concernForm.title.trim();

    if (!title) {
      this.workspaceMessage =
        'Describe the concern before adding it.';
      return;
    }

    const concern: CommunityConcern = {
      id: this.makeId(),
      ...this.concernForm,
      title,
      mitigation: this.concernForm.mitigation.trim()
    };

    this.concerns = [concern, ...this.concerns];

    this.concernForm = {
      title: '',
      category: 'Inclusion',
      likelihood: 3,
      impact: 3,
      exposure: 3,
      mitigation: ''
    };

    this.saveWorkspace();
    this.workspaceMessage =
      'Concern added for planning review.';
  }

  removeConcern(id: string): void {
    this.concerns = this.concerns.filter(
      item => item.id !== id
    );

    this.saveWorkspace();
  }

  riskScore(concern: CommunityConcern): number {
    return concern.likelihood *
      concern.impact *
      concern.exposure;
  }

  budgetAmount(percent: number): number {
    return this.totalBudget * percent / 100;
  }

  analyzeDialogue(): void {
    const source = this.dialogueNotes.toLowerCase();

    this.themes = this.themes.map(theme => {
      const count = theme.keywords.reduce(
        (total, keyword) => {
          const escaped = keyword.replace(
            /[.*+?^${}()|[\]\\]/g,
            '\\$&'
          );

          const matches = source.match(
            new RegExp(`\\b${escaped}\\b`, 'g')
          );

          return total + (matches?.length ?? 0);
        },
        0
      );

      return { ...theme, count };
    });

    this.saveWorkspace();

    this.workspaceMessage =
      'Keyword review updated. Check the original notes for context.';
  }

  saveWorkspace(): void {
    const data = {
      initiatives: this.initiatives,
      stakeholders: this.stakeholders,
      concerns: this.concerns,
      dialogueNotes: this.dialogueNotes,
      totalBudget: this.totalBudget,
      budgetAllocations: this.budgetAllocations
    };

    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(data)
      );
    } catch {
      this.workspaceMessage =
        'Could not save in this browser. Export a backup instead.';
    }
  }

  exportWorkspace(): void {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      initiatives: this.initiatives,
      stakeholders: this.stakeholders,
      concerns: this.concerns,
      dialogueNotes: this.dialogueNotes,
      totalBudget: this.totalBudget,
      budgetAllocations: this.budgetAllocations
    };

    const blob = new Blob(
      [JSON.stringify(payload, null, 2)],
      { type: 'application/json' }
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = 'peace-planning-workspace.json';
    anchor.click();

    URL.revokeObjectURL(url);
    this.workspaceMessage = 'Workspace export created.';
  }

  async importWorkspace(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    try {
      const raw: unknown = JSON.parse(await file.text());

      if (!this.isWorkspaceData(raw)) {
        throw new Error(
          'The JSON file does not have the expected structure.'
        );
      }

      this.initiatives = raw.initiatives;
      this.stakeholders = raw.stakeholders;
      this.concerns = raw.concerns;
      this.dialogueNotes = raw.dialogueNotes;
      this.totalBudget = raw.totalBudget;
      this.budgetAllocations = raw.budgetAllocations;

      this.saveWorkspace();

      this.workspaceMessage =
        'Workspace imported. Review the imported records.';
    } catch {
      this.workspaceMessage =
        'Import failed. Choose a valid workspace JSON file.';
    } finally {
      input.value = '';
    }
  }

  clearWorkspace(): void {
    const confirmed = confirm(
      'Clear all initiative, stakeholder, and concern records?'
    );

    if (!confirmed) {
      return;
    }

    this.initiatives = [];
    this.stakeholders = [];
    this.concerns = [];
    this.dialogueNotes = '';

    this.saveWorkspace();
    this.workspaceMessage = 'Workspace cleared.';
  }

  private loadWorkspace(): void {
    try {
      const saved = localStorage.getItem(this.storageKey);

      if (!saved) {
        return;
      }

      const raw: unknown = JSON.parse(saved);

      if (!this.isWorkspaceData(raw)) {
        return;
      }

      this.initiatives = raw.initiatives;
      this.stakeholders = raw.stakeholders;
      this.concerns = raw.concerns;
      this.dialogueNotes = raw.dialogueNotes;
      this.totalBudget = raw.totalBudget;
      this.budgetAllocations = raw.budgetAllocations;
    } catch {
      this.workspaceMessage =
        'Saved data could not be loaded; a new workspace is available.';
    }
  }

  private isWorkspaceData(value: unknown): value is {
    initiatives: PeaceInitiative[];
    stakeholders: StakeholderRecord[];
    concerns: CommunityConcern[];
    dialogueNotes: string;
    totalBudget: number;
    budgetAllocations: {
      dialogue: number;
      outreach: number;
      research: number;
      administration: number;
    };
  } {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const data = value as Record<string, unknown>;
    const allocations = data['budgetAllocations'];

    return Array.isArray(data['initiatives']) &&
      Array.isArray(data['stakeholders']) &&
      Array.isArray(data['concerns']) &&
      typeof data['dialogueNotes'] === 'string' &&
      typeof data['totalBudget'] === 'number' &&
      !!allocations &&
      typeof allocations === 'object' &&
      [
        'dialogue',
        'outreach',
        'research',
        'administration'
      ].every(
        key =>
          typeof (allocations as Record<string, unknown>)[key]
          === 'number'
      );
  }

  private makeId(): string {
    return `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)}`;
  }
}
