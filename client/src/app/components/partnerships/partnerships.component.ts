import { Component, OnInit } from '@angular/core';

interface PartnerOrg {
  id: string;
  name: string;
  country: string;
  focusArea: string;
  contactEmail: string;
  activeProjects: number;
}

interface StudentGradeRecord {
  name: string;
  grade: number;
}

@Component({
  selector: 'app-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.css']
})
export class PartnershipsComponent implements OnInit {
  readonly studentAuthor = 'Pavan Kumar Borra';
  readonly courseCode = 'COMP-699-B / CS Web Applications';

  // -------------------------------------------------------------
  // PROGRAM 1: 3-Dice Game Simulation (GameDice)
  // -------------------------------------------------------------
  diceValues: number[] = [1, 1, 1];
  diceUnicode: string[] = ['⚀', '⚀', '⚀'];
  diceSum: number = 3;
  diceMessage: string = 'Press "Roll 3 Dice" to simulate peace-grant tier allocations!';
  isRolling: boolean = false;

  private readonly diceGlyphs: { [key: number]: string } = {
    1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅'
  };

  rollDice(): void {
    this.isRolling = true;
    setTimeout(() => {
      this.diceValues = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ];
      this.diceUnicode = this.diceValues.map(v => this.diceGlyphs[v]);
      this.diceSum = this.diceValues.reduce((acc, curr) => acc + curr, 0);

      const [d1, d2, d3] = this.diceValues;
      if (d1 === d2 && d2 === d3) {
        this.diceMessage = `Triple! All dice show ${d1}. Sum: ${this.diceSum} — Major Peacebuilding Endowment Awarded!`;
      } else if (d1 === d2 || d2 === d3 || d1 === d3) {
        this.diceMessage = `Matching Pair! Sum: ${this.diceSum} — Sustained Regional Partnership Grant Unlocked!`;
      } else {
        this.diceMessage = `Standard Allocation. Sum: ${this.diceSum} — Grassroots Fieldwork Initiative Supported.`;
      }
      this.isRolling = false;
    }, 250);
  }

  // -------------------------------------------------------------
  // PROGRAM 2: Regional Peace Lotto (Guess 3 Numbers, Match >= 2)
  // -------------------------------------------------------------
  lottoGuess1: number = 7;
  lottoGuess2: number = 14;
  lottoGuess3: number = 21;
  drawnLottoNumbers: number[] = [];
  matchedNumbers: number[] = [];
  lottoResultStatus: 'idle' | 'win' | 'lose' | 'invalid' = 'idle';
  lottoMessage: string = '';

  playLotto(): void {
    const guesses = [Number(this.lottoGuess1), Number(this.lottoGuess2), Number(this.lottoGuess3)];

    // Validation: 1-49, distinct integers
    const validRange = guesses.every(n => Number.isInteger(n) && n >= 1 && n <= 49);
    const uniqueGuesses = new Set(guesses);

    if (!validRange || uniqueGuesses.size !== 3) {
      this.lottoResultStatus = 'invalid';
      this.lottoMessage = 'Invalid input: Please select 3 distinct integers between 1 and 49.';
      this.drawnLottoNumbers = [];
      this.matchedNumbers = [];
      return;
    }

    // Draw 6 random numbers without replacement
    const pool = Array.from({ length: 49 }, (_, i) => i + 1);
    const drawn: number[] = [];
    while (drawn.length < 6) {
      const idx = Math.floor(Math.random() * pool.length);
      drawn.push(pool.splice(idx, 1)[0]);
    }
    drawn.sort((a, b) => a - b);
    this.drawnLottoNumbers = drawn;

    // Check matches
    this.matchedNumbers = guesses.filter(g => drawn.includes(g));

    if (this.matchedNumbers.length >= 2) {
      this.lottoResultStatus = 'win';
      this.lottoMessage = `Congratulations! You matched ${this.matchedNumbers.length} numbers (${this.matchedNumbers.join(', ')}). You WIN the peace endowment ticket!`;
    } else {
      this.lottoResultStatus = 'lose';
      this.lottoMessage = `Matched ${this.matchedNumbers.length} number(s) (${this.matchedNumbers.length > 0 ? this.matchedNumbers.join(', ') : 'none'}). Better luck next draw! (Needs at least 2).`;
    }
  }

  // -------------------------------------------------------------
  // PROGRAM 3: Student Peace Corps Grades & Statistics (dic2.html)
  // -------------------------------------------------------------
  studentRoster: StudentGradeRecord[] = [
    { name: 'Elena Popescu', grade: 94 },
    { name: 'Mateo Rossi', grade: 82 },
    { name: 'Sophia Chen', grade: 88 },
    { name: 'Darius Vance', grade: 76 },
    { name: 'Amina Al-Mansoor', grade: 99 },
    { name: 'Lukas Meyer', grade: 68 },
    { name: 'Chiamaka Eze', grade: 91 }
  ];

  newStudentName: string = '';
  newStudentGrade: number | null = null;
  gradeStats = { count: 0, average: 0, highest: 0, lowest: 0, passingCount: 0 };

  addStudentGrade(): void {
    const cleanName = (this.newStudentName || '').trim();
    const numGrade = Number(this.newStudentGrade);

    if (!cleanName || isNaN(numGrade) || numGrade < 0 || numGrade > 100) {
      alert('Please enter a valid student name and a grade between 0 and 100.');
      return;
    }

    this.studentRoster.push({ name: cleanName, grade: Math.round(numGrade * 10) / 10 });
    this.newStudentName = '';
    this.newStudentGrade = null;
    this.computeGradeStats();
  }

  computeGradeStats(): void {
    if (this.studentRoster.length === 0) {
      this.gradeStats = { count: 0, average: 0, highest: 0, lowest: 0, passingCount: 0 };
      return;
    }
    const grades = this.studentRoster.map(s => s.grade);
    const sum = grades.reduce((acc, curr) => acc + curr, 0);
    this.gradeStats = {
      count: grades.length,
      average: Math.round((sum / grades.length) * 100) / 100,
      highest: Math.max(...grades),
      lowest: Math.min(...grades),
      passingCount: grades.filter(g => g >= 70).length
    };
  }

  removeStudent(index: number): void {
    this.studentRoster.splice(index, 1);
    this.computeGradeStats();
  }

  // -------------------------------------------------------------
  // PROGRAM 4: ASCII / Unicode Inspector & Dynamic Character Table
  // -------------------------------------------------------------
  inspectedCharInput: string = 'N';
  inspectResult = { char: '', ascii: 0, hex: '', bin: '', isPrintable: true };
  showAsciiTable: boolean = false;
  asciiTableRows: { code: number; char: string; hex: string; category: string }[] = [];

  inspectCharacter(): void {
    const raw = this.inspectedCharInput;
    if (!raw || raw.length === 0) {
      this.inspectResult = { char: '', ascii: 0, hex: '', bin: '', isPrintable: false };
      return;
    }
    const char = raw.charAt(0);
    const code = char.charCodeAt(0);
    this.inspectResult = {
      char: char,
      ascii: code,
      hex: '0x' + code.toString(16).toUpperCase().padStart(2, '0'),
      bin: code.toString(2).padStart(8, '0'),
      isPrintable: code >= 32 && code <= 126
    };
  }

  toggleAsciiTable(): void {
    this.showAsciiTable = !this.showAsciiTable;
    if (this.showAsciiTable && this.asciiTableRows.length === 0) {
      this.generateAsciiTable();
    }
  }

  private generateAsciiTable(): void {
    const rows = [];
    for (let c = 32; c <= 126; c++) {
      let cat = 'Punctuation/Symbol';
      if (c >= 48 && c <= 57) cat = 'Numeric Digit';
      else if (c >= 65 && c <= 90) cat = 'Uppercase Letter';
      else if (c >= 97 && c <= 122) cat = 'Lowercase Letter';

      rows.push({
        code: c,
        char: String.fromCharCode(c),
        hex: '0x' + c.toString(16).toUpperCase(),
        category: cat
      });
    }
    this.asciiTableRows = rows;
  }

  // -------------------------------------------------------------
  // PROGRAM 5: Key-Value Partner Glossary & Dictionary Lookup
  // -------------------------------------------------------------
  partnerDirectory: { [key: string]: PartnerOrg } = {
    UNIPAZ: { id: 'UNIPAZ', name: 'University for International Peace (UNIPAZ)', country: 'Brazil', focusArea: 'Restorative Mediation', contactEmail: 'relations@unipaz.org', activeProjects: 4 },
    USIP: { id: 'USIP', name: 'United States Institute of Peace', country: 'United States', focusArea: 'Track II Diplomatic Engagement', contactEmail: 'info@usip.org', activeProjects: 7 },
    IPRA: { id: 'IPRA', name: 'International Peace Research Association', country: 'Norway', focusArea: 'Conflict Transformation Research', contactEmail: 'secretariat@iprapeace.org', activeProjects: 3 },
    EPRA: { id: 'EPRA', name: 'European Peace Research Association', country: 'Austria', focusArea: 'Balkan Cross-Border Dialogues', contactEmail: 'contact@epra.eu', activeProjects: 5 },
    NPI_NH: { id: 'NPI_NH', name: 'Nashua Community Peace Council', country: 'United States', focusArea: 'Immigrant Youth Literacy & Dialogue', contactEmail: 'outreach@nashuapeace.org', activeProjects: 2 }
  };

  searchKeyInput: string = '';
  queriedPartner: PartnerOrg | null = null;
  dictSearchMessage: string = '';

  newKey: string = '';
  newName: string = '';
  newCountry: string = '';
  newFocus: string = '';
  newEmail: string = '';
  newProjectsCount: number = 1;

  get dictionaryKeys(): string[] {
    return Object.keys(this.partnerDirectory);
  }

  searchDictionary(): void {
    const key = (this.searchKeyInput || '').trim().toUpperCase();
    if (!key) {
      this.queriedPartner = null;
      this.dictSearchMessage = 'Please enter a partnership dictionary acronym or ID.';
      return;
    }
    if (this.partnerDirectory.hasOwnProperty(key)) {
      this.queriedPartner = this.partnerDirectory[key];
      this.dictSearchMessage = `Record found for key [${key}].`;
    } else {
      this.queriedPartner = null;
      this.dictSearchMessage = `Key "${key}" was not found in the partnership dictionary. Try: ${this.dictionaryKeys.join(', ')}`;
    }
  }

  insertDictionaryEntry(): void {
    const key = (this.newKey || '').trim().toUpperCase();
    if (!key || !this.newName.trim() || !this.newCountry.trim()) {
      alert('Key, Organization Name, and Country are required.');
      return;
    }
    if (this.partnerDirectory[key]) {
      alert(`Key "${key}" already exists! Please use a unique identifier or edit the existing record.`);
      return;
    }
    this.partnerDirectory[key] = {
      id: key,
      name: this.newName.trim(),
      country: this.newCountry.trim(),
      focusArea: this.newFocus.trim() || 'General Collaborative Dialogue',
      contactEmail: this.newEmail.trim() || 'contact@nashuapeace.org',
      activeProjects: Number(this.newProjectsCount) || 1
    };
    alert(`Successfully registered "${key}" to the dictionary.`);
    this.newKey = '';
    this.newName = '';
    this.newCountry = '';
    this.newFocus = '';
    this.newEmail = '';
    this.newProjectsCount = 1;
  }

  deleteDictionaryEntry(key: string): void {
    if (confirm(`Remove "${key}" from the partnership registry dictionary?`)) {
      delete this.partnerDirectory[key];
      if (this.queriedPartner && this.queriedPartner.id === key) {
        this.queriedPartner = null;
        this.dictSearchMessage = `Key [${key}] was deleted from active records.`;
      }
    }
  }

  ngOnInit(): void {
    this.inspectCharacter();
    this.computeGradeStats();
  }
}
