
import { Component } from '@angular/core';

interface PeaceScenario {
  id: string;
  title: string;
  icon: string;
  description: string;
  challenge: string;
  approach: string;
  question: string;
}

interface PeaceFaq {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-peacebuilding',
  templateUrl: './peacebuilding.component.html',
  styleUrls: ['./peacebuilding.component.css']
})
export class PeacebuildingComponent {
  public activeFramework = 0;

  public frameworks = [
    {
      title: 'Listen before responding',
      icon: '👂',
      description: 'Give participants room to explain their perspectives without interruption.',
      action: 'Use open-ended questions and summarize what you heard before responding.'
    },
    {
      title: 'Separate facts from interpretation',
      icon: '🔎',
      description: 'Distinguish verified information, personal interpretation, and unresolved claims.',
      action: 'Record the source, publication date, evidence, and uncertainty for each important claim.'
    },
    {
      title: 'Explore shared concerns',
      icon: '🤝',
      description: 'Identify common needs without pretending that every disagreement can be removed.',
      action: 'Ask which practical concerns participants share and which issues remain disputed.'
    },
    {
      title: 'Reflect and learn',
      icon: '📝',
      description: 'Review what the discussion clarified and what needs more evidence or care.',
      action: 'Write a short reflection and identify one improvement for the next activity.'
    }
  ];

  public scenarios: PeaceScenario[] = [
    {
      id: 'misinformation',
      title: 'Conflicting reports',
      icon: '📰',
      description: 'Participants encounter different accounts of a regional event.',
      challenge: 'How can a group discuss disputed information without spreading unverified claims?',
      approach: 'Compare credible independent sources, record publication dates, identify uncertainty, and avoid presenting allegations as established facts.',
      question: 'Which parts of the report are verified, disputed, or still unknown?'
    },
    {
      id: 'cultural',
      title: 'Cultural misunderstanding',
      icon: '🌐',
      description: 'A comment is interpreted differently by participants from different backgrounds.',
      challenge: 'How can the discussion address the misunderstanding without stereotyping a community?',
      approach: 'Ask for clarification, focus on the specific statement, and allow participants to explain their own perspective.',
      question: 'What did the speaker mean, and how was the statement understood by others?'
    },
    {
      id: 'resource',
      title: 'Competing priorities',
      icon: '⚖️',
      description: 'A group disagrees about which educational topic deserves attention first.',
      challenge: 'How can the group make a fair decision when time and resources are limited?',
      approach: 'Agree on transparent criteria, compare options against those criteria, and document unresolved differences.',
      question: 'Which criteria should guide the decision, and why?'
    }
  ];

  public selectedScenario: PeaceScenario = this.scenarios[0];

  public selectScenario(scenario: PeaceScenario): void {
    this.selectedScenario = scenario;
  }

  public selectFramework(index: number): void {
    if (index >= 0 && index < this.frameworks.length) {
      this.activeFramework = index;
    }
  }

  public participantCount = 12;
  public sessionMinutes = 45;
  public activityType = 'Listening circle';

  public get sessionPlan(): string[] {
    const total = this.sessionMinutes;
    const opening = Math.round(total * 0.15);
    const dialogue = Math.round(total * 0.55);
    const reflection = total - opening - dialogue;

    return [
      `Opening and ground rules: ${opening} minutes`,
      `${this.activityType}: ${dialogue} minutes`,
      `Reflection and next steps: ${reflection} minutes`
    ];
  }

  public get activityGuidance(): string {
    if (this.activityType === 'Source review') {
      return 'Compare sources, dates, evidence, and uncertainty before reaching a conclusion.';
    }

    if (this.activityType === 'Small-group discussion') {
      return 'Invite each participant to contribute, summarize areas of agreement, and record open questions.';
    }

    return 'Give each person time to speak, listen without interruption, and paraphrase respectfully.';
  }

  public updateParticipantCount(value: string | number): void {
    this.participantCount = this.clamp(value, 2, 40, 12);
  }

  public updateSessionMinutes(value: string | number): void {
    this.sessionMinutes = this.clamp(value, 15, 120, 45);
  }

  public updateActivityType(value: string): void {
    const allowed = ['Listening circle', 'Source review', 'Small-group discussion'];

    if (allowed.includes(value)) {
      this.activityType = value;
    }
  }

  public checklist = [
    { label: 'Identify the original publisher', checked: false },
    { label: 'Check the publication date and context', checked: false },
    { label: 'Compare with an independent credible source', checked: false },
    { label: 'Separate facts from opinion or allegations', checked: false },
    { label: 'Record what remains uncertain', checked: false }
  ];

  public get checklistCompleted(): number {
    return this.checklist.filter(item => item.checked).length;
  }

  public get checklistPercentage(): number {
    return Math.round((this.checklistCompleted / this.checklist.length) * 100);
  }

  public resetChecklist(): void {
    this.checklist.forEach(item => item.checked = false);
  }

  public strategies = [
    {
      title: 'Respectful communication',
      icon: '💬',
      description: 'Use clear language, ask questions before making assumptions, and challenge ideas without attacking people.'
    },
    {
      title: 'Evidence-based learning',
      icon: '📚',
      description: 'Use credible references, include relevant context, and explain where information is incomplete.'
    },
    {
      title: 'Inclusive participation',
      icon: '🧩',
      description: 'Make room for different perspectives, accessible participation, and balanced speaking time.'
    },
    {
      title: 'Reflection and accountability',
      icon: '🌱',
      description: 'Record learning outcomes, invite feedback, and correct mistakes when stronger evidence emerges.'
    }
  ];

  public faqs: PeaceFaq[] = [
    {
      question: 'What does Track Two diplomacy mean?',
      answer: 'It generally refers to informal dialogue involving non-governmental participants, such as academics or civil society members. It can complement official diplomacy but does not replace formal negotiations.',
      open: true
    },
    {
      question: 'Does dialogue guarantee conflict resolution?',
      answer: 'No. Dialogue may support understanding and explore options, but outcomes depend on context, participation, trust, and many factors beyond a discussion session.',
      open: false
    },
    {
      question: 'Are these activities real events?',
      answer: 'No. The scenarios and session planner are educational examples for this academic project. They do not represent completed workshops or confirmed participants.',
      open: false
    }
  ];

  public toggleFaq(index: number): void {
    if (this.faqs[index]) {
      this.faqs[index].open = !this.faqs[index].open;
    }
  }

  public resetPlanner(): void {
    this.participantCount = 12;
    this.sessionMinutes = 45;
    this.activityType = 'Listening circle';
    this.resetChecklist();
    this.selectedScenario = this.scenarios[0];
    this.activeFramework = 0;
  }

  private clamp(
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
}
