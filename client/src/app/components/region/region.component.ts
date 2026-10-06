import { Component } from '@angular/core';

interface LittoralState {
  name: string;
  capital: string;
  coastlineKm: number;
  significance: string;
  category: 'EU-NATO' | 'Candidate' | 'Eastern Littoral';
  statusColor: string;
}

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent {
  public activeFilter: string = 'ALL';
  public searchQuery: string = '';

  public states: LittoralState[] = [
    { name: 'Romania', capital: 'Bucharest', coastlineKm: 225, significance: 'Anchor of transatlantic defense; headquarters of FUMN partner academic think-tank.', category: 'EU-NATO', statusColor: '#10b981' },
    { name: 'Bulgaria', capital: 'Sofia', coastlineKm: 354, significance: 'Key southern maritime corridor linking BSEC trade routes and Aegean energy pipelines.', category: 'EU-NATO', statusColor: '#10b981' },
    { name: 'Ukraine', capital: 'Kyiv', coastlineKm: 2782, significance: 'Extensive northern shoreline, critical grain corridors, subject to high security conflict.', category: 'Candidate', statusColor: '#f59e0b' },
    { name: 'Georgia', capital: 'Tbilisi', coastlineKm: 310, significance: 'Crucial bridgehead between the South Caucasus, Central Asia, and Eastern Europe.', category: 'Candidate', statusColor: '#f59e0b' },
    { name: 'Turkey', capital: 'Ankara', coastlineKm: 1329, significance: 'Custodian of the Turkish Straits under the Montreux Convention of 1936.', category: 'EU-NATO', statusColor: '#0284c7' },
    { name: 'Russian Federation', capital: 'Moscow', coastlineKm: 800, significance: 'Major military and commercial littoral footprint driving regional security concerns.', category: 'Eastern Littoral', statusColor: '#ef4444' }
  ];

  public setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  public get filteredStates(): LittoralState[] {
    return this.states.filter(s => {
      const matchesCategory = this.activeFilter === 'ALL' || s.category === this.activeFilter;
      const matchesSearch = s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        s.significance.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
}
