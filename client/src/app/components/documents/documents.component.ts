import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Interfaces for Part 1: Dictionary Exercises
export interface BankRecord {
  bankId: string;
  name: string;
  routing: string;
  swift: string;
  branchCity: string;
  activeAccounts: number;
  reserveBalance: number;
}

export interface OrderRecord {
  orderId: string;
  client: string;
  item: string;
  quantity: number;
  unitPrice: number;
  status: 'Fulfilled' | 'Pending' | 'Shipped';
  date: string;
}

export interface EmployerRecord {
  empId: string;
  companyName: string;
  industry: string;
  headquarters: string;
  workforce: number;
  partnershipTier: 'Strategic' | 'Associate' | 'Community';
}

// Interfaces for Part 2: Black Sea Geo-Explorer & Quiz
export interface BlackSeaCountry {
  name: string;
  capital: string;
  code: string;
  fact: string;
  lat: number;
  lon: number;
  zoom: number;
  coastalLengthKm: number;
  strategicPort: string;
}

export interface QuizQuestion {
  text: string;
  options: string[];
  answer: string;
  explanation: string;
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  // ==========================================
  // PART 1: DICTIONARY ENGINES (bank, order, employer)
  // ==========================================
  activeDictionary: 'banks' | 'orders' | 'employers' = 'banks';
  dictSearchKey: string = '';
  dictResultFound: boolean = false;
  dictSearchMessage: string = '';

  // 1. Bank Dictionary
  bankDictionary: { [key: string]: BankRecord } = {
    BofA: { bankId: 'BofA', name: 'Bank of America - Nashua Regional', routing: '011000138', swift: 'BOFAUS3N', branchCity: 'Nashua, NH', activeAccounts: 1420, reserveBalance: 2450000 },
    TD: { bankId: 'TD', name: 'TD Bank Commercial Trust', routing: '011401533', swift: 'TDBKUS33', branchCity: 'Manchester, NH', activeAccounts: 890, reserveBalance: 1820000 },
    Citizens: { bankId: 'Citizens', name: 'Citizens Regional Community Bank', routing: '011500120', swift: 'CTZIUS33', branchCity: 'Concord, NH', activeAccounts: 640, reserveBalance: 950000 },
    FirstNH: { bankId: 'FirstNH', name: 'First New Hampshire Credit Union', routing: '211284561', swift: 'FNHCUS33', branchCity: 'Nashua, NH', activeAccounts: 410, reserveBalance: 620000 }
  };

  // 2. Order Dictionary
  orderDictionary: { [key: string]: OrderRecord } = {
    ORD_901: { orderId: 'ORD_901', client: 'Nashua Peace Initiative Youth Council', item: 'Cross-Cultural Mediation Handbooks', quantity: 150, unitPrice: 18.50, status: 'Fulfilled', date: '2026-10-28' },
    ORD_902: { orderId: 'ORD_902', client: 'Granite State Restorative Alliance', item: 'Civic Conflict Transformation Modules', quantity: 80, unitPrice: 32.00, status: 'Shipped', date: '2026-11-01' },
    ORD_903: { orderId: 'ORD_903', client: 'Geneva Peace Research Consortium', item: 'Black Sea Regional Security Dossiers', quantity: 45, unitPrice: 65.00, status: 'Pending', date: '2026-11-05' },
    ORD_904: { orderId: 'ORD_904', client: 'Rivier Community Outreach Center', item: 'Democratic Peace Education Toolkits', quantity: 200, unitPrice: 12.75, status: 'Fulfilled', date: '2026-11-07' }
  };

  // 3. Employers Dictionary
  employerDictionary: { [key: string]: EmployerRecord } = {
    EMP_NPI: { empId: 'EMP_NPI', companyName: 'Nashua Peacebuilding Initiative', industry: 'Non-Governmental Organization', headquarters: 'Nashua, NH', workforce: 28, partnershipTier: 'Strategic' },
    EMP_BAE: { empId: 'EMP_BAE', companyName: 'BAE Systems Community Outreach', industry: 'Aerospace & Systems Engineering', headquarters: 'Nashua, NH', workforce: 3200, partnershipTier: 'Associate' },
    EMP_RIV: { empId: 'EMP_RIV', companyName: 'Rivier University Academic Union', industry: 'Higher Education & Research', headquarters: 'Nashua, NH', workforce: 450, partnershipTier: 'Strategic' },
    EMP_SNHU: { empId: 'EMP_SNHU', companyName: 'Southern New Hampshire Civic Trust', industry: 'Community Foundations', headquarters: 'Manchester, NH', workforce: 120, partnershipTier: 'Community' }
  };

  // Generic Query Result Holder
  activeBankResult: BankRecord | null = null;
  activeOrderResult: OrderRecord | null = null;
  activeEmployerResult: EmployerRecord | null = null;

  // Key Cache Arrays
  bankKeys: string[] = [];
  orderKeys: string[] = [];
  employerKeys: string[] = [];

  // ==========================================
  // PART 2: BLACK SEA GEOGRAPHIC EXPLORER & QUIZ
  // ==========================================
  blackSeaCountries: { [key: string]: BlackSeaCountry } = {
    Bulgaria: {
      name: 'Bulgaria', capital: 'Sofia', code: 'BG',
      fact: 'Borders the Black Sea to the east with major commercial ports at Varna and Burgas.',
      lat: 42.73, lon: 25.49, zoom: 6, coastalLengthKm: 378, strategicPort: 'Varna & Burgas'
    },
    Georgia: {
      name: 'Georgia', capital: 'Tbilisi', code: 'GE',
      fact: 'Anchors the eastern Black Sea coastline, serving as a critical trans-Caucasian trade corridor.',
      lat: 42.18, lon: 43.45, zoom: 7, coastalLengthKm: 310, strategicPort: 'Batumi & Poti'
    },
    Romania: {
      name: 'Romania', capital: 'Bucharest', code: 'RO',
      fact: 'Home to the Danube Delta and Constanța, the largest European port on the Black Sea.',
      lat: 45.94, lon: 24.97, zoom: 6, coastalLengthKm: 225, strategicPort: 'Constanța'
    },
    Russia: {
      name: 'Russia', capital: 'Moscow', code: 'RU',
      fact: 'Maintains southwestern coastal access via Novorossiysk, Tuapse, and the Taman Peninsula.',
      lat: 44.70, lon: 38.00, zoom: 7, coastalLengthKm: 800, strategicPort: 'Novorossiysk'
    },
    'Türkiye': {
      name: 'Türkiye', capital: 'Ankara', code: 'TR',
      fact: 'Controls the northern coastline and sovereign maritime access through the Bosphorus Strait.',
      lat: 39.05, lon: 35.20, zoom: 6, coastalLengthKm: 1695, strategicPort: 'Trabzon & Samsun'
    },
    Ukraine: {
      name: 'Ukraine', capital: 'Kyiv', code: 'UA',
      fact: 'Features an extensive northern coastline, the Sea of Azov nexus, and pivotal ports at Odesa.',
      lat: 48.38, lon: 31.16, zoom: 6, coastalLengthKm: 2782, strategicPort: 'Odesa & Chornomorsk'
    }
  };

  countryList: string[] = [];
  selectedCountryName: string = 'Romania';
  selectedCountry: BlackSeaCountry = this.blackSeaCountries['Romania'];
  safeMapUrl: SafeResourceUrl | null = null;
  osmDirectLink: string = '';
  countrySearchQuery: string = '';

  // Interactive Quiz Engine
  quizQuestions: QuizQuestion[] = [
    {
      text: 'Which major European river flows through multiple capital cities before forming a vast delta in Romania and Ukraine on the Black Sea?',
      options: ['Rhine', 'Danube', 'Volga', 'Elbe'],
      answer: 'Danube',
      explanation: 'The Danube River enters the Black Sea via the UNESCO-protected Danube Delta along the Romanian and Ukrainian borders.'
    },
    {
      text: 'The Kerch Strait connects the Black Sea directly to which adjacent shallow body of water?',
      options: ['Sea of Marmara', 'Aegean Sea', 'Sea of Azov', 'Caspian Sea'],
      answer: 'Sea of Azov',
      explanation: 'The narrow Kerch Strait provides the sole maritime passageway connecting the northeastern Black Sea to the Sea of Azov.'
    },
    {
      text: 'Which international treaty signed in 1936 governs maritime traffic and the passage of naval warships through the Turkish Straits?',
      options: ['Treaty of Lausanne', 'Montreux Convention', 'Helsinki Accords', 'Geneva Maritime Protocol'],
      answer: 'Montreux Convention',
      explanation: 'The Montreux Convention gives Türkiye sovereignty over the Bosphorus and Dardanelles straits while regulating warship transit.'
    },
    {
      text: 'What distinct oceanographic condition characterizes the deeper water layers (below ~150 meters) of the Black Sea?',
      options: ['Extreme hypersalinity', 'Anoxic water with hydrogen sulfide', 'Dense sub-surface coral reefs', 'Fast sub-polar ocean currents'],
      answer: 'Anoxic water with hydrogen sulfide',
      explanation: 'Over 90% of the Black Sea’s deep water volume is anoxic (lacks dissolved oxygen) and heavily saturated with toxic hydrogen sulfide (H2S).'
    },
    {
      text: 'Which coastal port serves as Bulgaria’s primary deep-water maritime trade hub and is often called the "Maritime Capital of Bulgaria"?',
      options: ['Burgas', 'Varna', 'Constanța', 'Batumi'],
      answer: 'Varna',
      explanation: 'Varna is the largest port city and naval hub on Bulgaria’s eastern Black Sea coast.'
    },
    {
      text: 'The autonomous region of Adjara, featuring the major subtropical port city of Batumi, is located in which littoral nation?',
      options: ['Georgia', 'Türkiye', 'Bulgaria', 'Romania'],
      answer: 'Georgia',
      explanation: 'Batumi is the capital of the Autonomous Republic of Adjara situated in southwestern Georgia along the Black Sea.'
    }
  ];

  currentQuestionIndex: number = 0;
  quizScore: number = 0;
  selectedOption: string | null = null;
  isAnswerSubmitted: boolean = false;
  quizCompleted: boolean = false;
  feedbackMessage: string = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.refreshDictionaryKeys();
    this.countryList = Object.keys(this.blackSeaCountries);
    this.selectCountry(this.selectedCountryName);
  }

  // ==========================================
  // PART 1 METHODS: DICTIONARY LOGIC
  // ==========================================
  setDictionaryMode(mode: 'banks' | 'orders' | 'employers'): void {
    this.activeDictionary = mode;
    this.dictSearchKey = '';
    this.dictSearchMessage = '';
    this.activeBankResult = null;
    this.activeOrderResult = null;
    this.activeEmployerResult = null;
  }

  refreshDictionaryKeys(): void {
    this.bankKeys = Object.keys(this.bankDictionary);
    this.orderKeys = Object.keys(this.orderDictionary);
    this.employerKeys = Object.keys(this.employerDictionary);
  }

  searchDictionary(): void {
    const key = (this.dictSearchKey || '').trim();
    if (!key) {
      this.dictSearchMessage = 'Please enter an identification key to query.';
      return;
    }

    if (this.activeDictionary === 'banks') {
      const match = this.bankKeys.find(k => k.toLowerCase() === key.toLowerCase());
      if (match && this.bankDictionary[match]) {
        this.activeBankResult = this.bankDictionary[match];
        this.dictSearchMessage = `Bank record found for key "${match}".`;
      } else {
        this.activeBankResult = null;
        this.dictSearchMessage = `No bank found for "${key}". Available keys: ${this.bankKeys.join(', ')}`;
      }
    } else if (this.activeDictionary === 'orders') {
      const match = this.orderKeys.find(k => k.toLowerCase() === key.toLowerCase());
      if (match && this.orderDictionary[match]) {
        this.activeOrderResult = this.orderDictionary[match];
        this.dictSearchMessage = `Order record found for key "${match}".`;
      } else {
        this.activeOrderResult = null;
        this.dictSearchMessage = `No order found for "${key}". Available keys: ${this.orderKeys.join(', ')}`;
      }
    } else if (this.activeDictionary === 'employers') {
      const match = this.employerKeys.find(k => k.toLowerCase() === key.toLowerCase());
      if (match && this.employerDictionary[match]) {
        this.activeEmployerResult = this.employerDictionary[match];
        this.dictSearchMessage = `Employer partner found for key "${match}".`;
      } else {
        this.activeEmployerResult = null;
        this.dictSearchMessage = `No employer found for "${key}". Available keys: ${this.employerKeys.join(', ')}`;
      }
    }
  }

  // ==========================================
  // PART 2 METHODS: GEOGRAPHIC & QUIZ ENGINE
  // ==========================================
  selectCountry(countryName: string): void {
    if (!this.blackSeaCountries[countryName]) return;
    this.selectedCountryName = countryName;
    this.selectedCountry = this.blackSeaCountries[countryName];

    const delta = this.selectedCountry.zoom === 7 ? 2.6 : 4.4;
    const minLon = (this.selectedCountry.lon - delta).toFixed(2);
    const minLat = (this.selectedCountry.lat - delta * 0.72).toFixed(2);
    const maxLon = (this.selectedCountry.lon + delta).toFixed(2);
    const maxLat = (this.selectedCountry.lat + delta * 0.72).toFixed(2);

    const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
    const rawMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(this.selectedCountry.lat + ',' + this.selectedCountry.lon)}`;
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawMapUrl);
    this.osmDirectLink = `https://www.openstreetmap.org/?mlat=${this.selectedCountry.lat}&mlon=${this.selectedCountry.lon}#map=${this.selectedCountry.zoom}/${this.selectedCountry.lat}/${this.selectedCountry.lon}`;
  }

  onSearchCountryInput(): void {
    const q = (this.countrySearchQuery || '').trim().toLowerCase();
    if (!q) return;
    const match = this.countryList.find(c => c.toLowerCase().includes(q));
    if (match) {
      this.selectCountry(match);
    }
  }

  handleAnswerSelect(option: string): void {
    if (this.isAnswerSubmitted) return;
    this.selectedOption = option;
    this.isAnswerSubmitted = true;
    const q = this.quizQuestions[this.currentQuestionIndex];
    if (option === q.answer) {
      this.quizScore++;
      this.feedbackMessage = `Correct! ${q.explanation}`;
    } else {
      this.feedbackMessage = `Incorrect. The correct answer is ${q.answer}. ${q.explanation}`;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = null;
      this.isAnswerSubmitted = false;
      this.feedbackMessage = '';
    } else {
      this.quizCompleted = true;
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.quizScore = 0;
    this.selectedOption = null;
    this.isAnswerSubmitted = false;
    this.quizCompleted = false;
    this.feedbackMessage = '';
  }
}
