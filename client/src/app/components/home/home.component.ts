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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // --- 1. Strategic Flashpoint Radar State ---
  public flashpoints: FlashpointZone[] = [
    {
      id: 'constanta',
      name: 'Port of Constanța & Dobruja Corridor',
      littoralNation: 'Romania (EU / NATO)',
      coordinates: '44.1792° N, 28.6498° E',
      securityStatus: 'Academic Hub',
      statusColor: '#10b981',
      keyChallenge: 'Major grain export logjam and maritime corridor congestion during littoral conflict.',
      initiativeAction: 'Primary liaison anchor with FUMN Bucharest; youth dialogue sessions on commercial transit security.'
    },
    {
      id: 'bosporus',
      name: 'Turkish Straits (Bosporus & Dardanelles)',
      littoralNation: 'Turkey (Montreux Regime)',
      coordinates: '41.1167° N, 29.0667° E',
      securityStatus: 'Critical Transit',
      statusColor: '#0284c7',
      keyChallenge: 'Enforcement of Montreux Convention limiting naval warship tonnage into the Black Sea.',
      initiativeAction: 'Educational policy briefs explaining international maritime law and diplomatic balance.'
    },
    {
      id: 'snake-island',
      name: 'Zmiinyi (Snake Island) Maritime Perimeter',
      littoralNation: 'Northern Littoral (Ukraine / Romania EEZ)',
      coordinates: '45.2550° N, 30.2033° E',
      securityStatus: 'High Friction',
      statusColor: '#ef4444',
      keyChallenge: 'Exclusive Economic Zone disputes and proximity to Danube commercial shipping mouths.',
      initiativeAction: 'Track-two cartographic studies on historical boundary treaties (ICJ 2009 Maritime Delimitation).'
    },
    {
      id: 'batumi',
      name: 'Batumi & South Caucasus Gateway',
      littoralNation: 'Georgia',
      coordinates: '41.6434° N, 41.6399° E',
      securityStatus: 'Monitoring',
      statusColor: '#f59e0b',
      keyChallenge: 'Vulnerability to regional pressure and energy transit route interruptions.',
      initiativeAction: 'Civic workshops on cross-Caucasus cultural diplomacy and student dialogue exchanges.'
    }
  ];

  public selectedZone: FlashpointZone = this.flashpoints[0];

  // --- 2. Live Dynamic Budget & Grant Calculator ---
  public baseBudgetItems: BudgetItem[] = [
    { category: 'Curriculum & Maps Archiving', baseAmount: 3200, description: 'Bilingual historical cartography & educational digital packages', priority: 'High' },
    { category: 'Transatlantic Student Symposiums', baseAmount: 2800, description: 'Virtual roundtables linking Nashua youth with Romanian students', priority: 'High' },
    { category: 'FUMN Academic Advisory Honorariums', baseAmount: 2100, description: 'Guest scholars from Bucharest analyzing track-two frameworks', priority: 'Medium' },
    { category: 'Web Infrastructure & MySQL DB Hosting', baseAmount: 1400, description: 'Secure API runtime, database storage, and open-access portal', priority: 'Essential' }
  ];

  public budgetScaleMultiplier: number = 1.0;
  public totalSimulatedBudget: number = 9500;

  // --- 3. Interactive Peace Impact Estimator ---
  public estimatedVolunteers: number = 25;
  public plannedWorkshops: number = 6;
  public estimatedStudentsReached: number = 150;
  public engagementScore: number = 88;

  ngOnInit(): void {
    this.recalculateBudget();
    this.recalculateImpact();
  }

  // Flashpoint selection handler
  public selectZone(zone: FlashpointZone): void {
    this.selectedZone = zone;
  }

  // Dynamic budget calculation function
  public onBudgetSliderChange(event: any): void {
    this.budgetScaleMultiplier = parseFloat(event.target.value);
    this.recalculateBudget();
  }

  public recalculateBudget(): void {
    this.totalSimulatedBudget = Math.round(
      this.baseBudgetItems.reduce((acc, item) => acc + (item.baseAmount * this.budgetScaleMultiplier), 0)
    );
  }

  public getAdjustedAmount(baseAmount: number): number {
    return Math.round(baseAmount * this.budgetScaleMultiplier);
  }

  public getCategoryPercentage(baseAmount: number): number {
    if (this.totalSimulatedBudget === 0) return 0;
    const adjusted = this.getAdjustedAmount(baseAmount);
    return Math.round((adjusted / this.totalSimulatedBudget) * 100);
  }

  // Dynamic impact score calculation
  public updateImpactControls(volunteers: number, workshops: number): void {
    this.estimatedVolunteers = volunteers;
    this.plannedWorkshops = workshops;
    this.recalculateImpact();
  }

  public recalculateImpact(): void {
    // TypeScript logic: computes dynamic metrics based on user adjustments
    this.estimatedStudentsReached = (this.plannedWorkshops * 28) + (this.estimatedVolunteers * 4);
    this.engagementScore = Math.min(99, Math.round(45 + (this.plannedWorkshops * 5.5) + (this.estimatedVolunteers * 0.8)));
  }
}
