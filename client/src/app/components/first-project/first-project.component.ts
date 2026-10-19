import { Component } from '@angular/core';

interface PilotProject {
  id: number;
  title: string;
  region: string;
  description: string;
  status: string;
  keywords: string[];
}

interface WordCount {
  word: string;
  count: number;
}

@Component({
  selector: 'app-first-project',
  templateUrl: './first-project.component.html',
  styleUrls: ['./first-project.component.css']
})
export class FirstProjectComponent {
  readonly author = 'Pavan Kumar Borra';

  readonly pilotProjects: PilotProject[] = [
    {
      id: 1, title: 'Black Sea Dialogue Lab', region: 'Black Sea',
      description: 'A sample learning activity for respectful cross-community dialogue.',
      status: 'Planning', keywords: ['dialogue', 'education', 'trust']
    },
    {
      id: 2, title: 'Regional Information Literacy', region: 'Romania',
      description: 'A learning module for checking sources and comparing public claims.',
      status: 'Draft', keywords: ['research', 'media literacy', 'verification']
    },
    {
      id: 3, title: 'Community Listening Workshop', region: 'Nashua',
      description: 'A proposed classroom exercise in listening and summarizing viewpoints.',
      status: 'Planning', keywords: ['listening', 'community', 'dialogue']
    },
    {
      id: 4, title: 'Conflict Timeline Exercise', region: 'Black Sea',
      description: 'A sample activity for organizing public historical information by date.',
      status: 'Draft', keywords: ['history', 'research', 'timeline']
    },
    {
      id: 5, title: 'Cooperation Ideas Board', region: 'International',
      description: 'A sample collection of educational cooperation ideas.',
      status: 'Concept', keywords: ['cooperation', 'education', 'community']
    }
  ];

  // Problem 1: Count characters, non-space characters, and words in user text.
  sentenceInput = '';
  sentenceResult = '';
  analyzeSentence(): void {
    const words = this.sentenceInput.trim().split(/\s+/).filter(Boolean);
    const wordCount = this.sentenceInput.trim() ? words.length : 0;
    const noSpaces = this.sentenceInput.replace(/\s/g, '').length;
    this.sentenceResult =
      `Characters: ${this.sentenceInput.length} | Without spaces: ${noSpaces} | Words: ${wordCount}`;
  }

  // Problem 2: Normalize a phrase and test whether it is a palindrome.
  palindromeInput = '';
  palindromeResult = '';
  checkPalindrome(): void {
    const cleaned = this.palindromeInput.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!cleaned) {
      this.palindromeResult = 'Please enter a word or phrase first.';
      return;
    }
    const reversed = cleaned.split('').reverse().join('');
    this.palindromeResult = cleaned === reversed
      ? `Yes! "${this.palindromeInput}" is a palindrome.`
      : `No — "${this.palindromeInput}" is not a palindrome.`;
  }

  // Problem 3: Count each word in a sentence and return alphabetical results.
  frequencyInput = '';
  frequencyResult: WordCount[] = [];
  countWordFrequency(): void {
    const words = this.frequencyInput.toLowerCase().match(/[a-z0-9']+/g) || [];
    const counts: { [key: string]: number } = {};
    words.forEach(word => counts[word] = (counts[word] || 0) + 1);
    this.frequencyResult = Object.keys(counts).sort()
      .map(word => ({ word, count: counts[word] }));
  }

  // Problem 4: Search project strings and keyword arrays with one query.
  projectSearch = '';
  searchResults: PilotProject[] = this.pilotProjects;
  searchProjects(): void {
    const query = this.projectSearch.trim().toLowerCase();
    this.searchResults = this.pilotProjects.filter(project => {
      const fields = [
        project.title, project.region, project.description, project.status,
        ...project.keywords
      ];
      return !query || fields.some(value => value.toLowerCase().includes(query));
    });
  }

  // Problem 5: Merge keywords, normalize them, remove duplicates, and sort.
  keywordFilter = '';
  readonly uniqueKeywords: string[] = this.buildUniqueKeywords();
  filteredKeywords: string[] = this.uniqueKeywords;

  private buildUniqueKeywords(): string[] {
    const allKeywords = this.pilotProjects.reduce(
      (all, project) => all.concat(project.keywords), [] as string[]
    );
    return Array.from(new Set(allKeywords.map(word => word.trim().toLowerCase())))
      .filter(Boolean).sort();
  }

  filterKeywords(): void {
    const query = this.keywordFilter.trim().toLowerCase();
    this.filteredKeywords = this.uniqueKeywords.filter(keyword => keyword.includes(query));
  }

  // Problem 6: Build an acronym while skipping common short connector words.
  acronymInput = '';
  acronymResult = '';
  makeAcronym(): void {
    const ignored = ['and', 'of', 'the', 'for', 'to', 'in', 'a', 'an'];
    const words = this.acronymInput.trim().split(/\s+/).filter(Boolean);
    const initials = words
      .filter(word => !ignored.includes(word.toLowerCase()))
      .map(word => word.replace(/^[^a-z0-9]+/i, '').charAt(0).toUpperCase())
      .filter(Boolean);
    this.acronymResult = initials.length
      ? `Acronym: ${initials.join('')}`
      : 'Enter a phrase with at least one meaningful word.';
  }

  // Problem 7: Reset action — clear user inputs and restore the initial view.
  resetAll(): void {
    this.sentenceInput = '';
    this.sentenceResult = '';
    this.palindromeInput = '';
    this.palindromeResult = '';
    this.frequencyInput = '';
    this.frequencyResult = [];
    this.projectSearch = '';
    this.searchResults = this.pilotProjects;
    this.keywordFilter = '';
    this.filteredKeywords = this.uniqueKeywords;
    this.acronymInput = '';
    this.acronymResult = '';
  }
}
