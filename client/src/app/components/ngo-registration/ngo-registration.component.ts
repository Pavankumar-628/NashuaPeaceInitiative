import { Component, OnInit } from '@angular/core';

export interface FocusAreaTag {
  id: string;
  label: string;
  category: 'dialogue' | 'education' | 'humanitarian' | 'advocacy' | 'youth';
  selected: boolean;
}

export interface NgoRegistrationData {
  // Step 1: Organizational Identity
  orgName: string;
  regNumber: string;
  orgType: string;
  yearFounded: number | null;
  country: string;
  city: string;
  website: string;
  // Step 2: Representative Contact
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  // Step 3: Mission & Focus Areas
  missionStatement: string;
  selectedFocusAreas: string[];
  annualBudget: string;
  volunteerCount: number | null;
  // Step 4: Verification & Terms
  verifiedAffidavit: boolean;
  uploadedFileName: string;
  uploadedFileSize: string;
  registrationNotes: string;
}

export interface RegisteredNgo {
  id: string;
  orgName: string;
  country: string;
  city: string;
  orgType: string;
  contactEmail: string;
  focusAreas: string[];
  registeredDate: string;
  status: 'Approved' | 'Under Review' | 'Verified Partner';
  badgeColor: string;
}

@Component({
  selector: 'app-ngo-registration',
  templateUrl: './ngo-registration.component.html',
  styleUrls: ['./ngo-registration.component.css']
})
export class NgoRegistrationComponent implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 4;
  isSubmitted: boolean = false;
  submitSuccess: boolean = false;
  statusMessage: string = '';
  validationErrors: string[] = [];

  // Form State Model
  formData: NgoRegistrationData = this.getInitialFormData();

  // Thematic Focus Areas
  availableTags: FocusAreaTag[] = [
    { id: 'youth-dialogue', label: 'Youth Peace Leadership', category: 'youth', selected: false },
    { id: 'cross-cultural', label: 'Cross-Cultural Mediation', category: 'dialogue', selected: false },
    { id: 'conflict-res', label: 'Non-Violent Conflict Resolution', category: 'education', selected: false },
    { id: 'refugee-aid', label: 'Refugee & Asylum Assistance', category: 'humanitarian', selected: false },
    { id: 'community-justice', label: 'Restorative Community Justice', category: 'advocacy', selected: false },
    { id: 'civic-education', label: 'Democratic Peace Education', category: 'education', selected: false },
    { id: 'disarmament', label: 'Community Violence Prevention', category: 'advocacy', selected: false },
    { id: 'interfaith', label: 'Interfaith Cooperation', category: 'dialogue', selected: false }
  ];

  // Directory of Registered NGOs with LocalStorage Persistence
  registeredList: RegisteredNgo[] = [
    {
      id: 'NGO-NPI-101',
      orgName: 'Greater Nashua Interfaith Peace Forum',
      country: 'United States',
      city: 'Nashua, NH',
      orgType: 'Grassroots Coalition',
      contactEmail: 'contact@nashuainterfaith.org',
      focusAreas: ['Interfaith Cooperation', 'Youth Peace Leadership'],
      registeredDate: '2026-09-15',
      status: 'Verified Partner',
      badgeColor: 'badge-verified'
    },
    {
      id: 'NGO-NPI-102',
      orgName: 'Geneva Global Peace Institute',
      country: 'Switzerland',
      city: 'Geneva',
      orgType: 'International Foundation',
      contactEmail: 'partnerships@ggpi-peace.ch',
      focusAreas: ['Cross-Cultural Mediation', 'Democratic Peace Education'],
      registeredDate: '2026-10-02',
      status: 'Approved',
      badgeColor: 'badge-approved'
    },
    {
      id: 'NGO-NPI-103',
      orgName: 'Granite State Restorative Justice Alliance',
      country: 'United States',
      city: 'Manchester, NH',
      orgType: 'Non-Profit 501(c)(3)',
      contactEmail: 'support@graniterestorative.org',
      focusAreas: ['Restorative Community Justice', 'Non-Violent Conflict Resolution'],
      registeredDate: '2026-10-19',
      status: 'Verified Partner',
      badgeColor: 'badge-verified'
    }
  ];

  // Search and Filter State
  searchQuery: string = '';
  selectedFilterType: string = 'ALL';
  filteredRegistrants: RegisteredNgo[] = [];

  ngOnInit(): void {
    this.loadSavedRegistrations();
    this.applyFilter();
  }

  getInitialFormData(): NgoRegistrationData {
    return {
      orgName: '', regNumber: '', orgType: 'Non-Profit 501(c)(3)',
      yearFounded: null, country: '', city: '', website: '',
      contactName: '', contactRole: '', contactEmail: '', contactPhone: '', address: '',
      missionStatement: '', selectedFocusAreas: [], annualBudget: 'Tier 2 ($50k - $250k)', volunteerCount: null,
      verifiedAffidavit: false, uploadedFileName: '', uploadedFileSize: '', registrationNotes: ''
    };
  }

  // Navigation Logic
  goToStep(step: number): void {
    if (step < this.currentStep || this.validateCurrentStep()) {
      this.currentStep = step;
      this.validationErrors = [];
    }
  }

  nextStep(): void {
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.validationErrors = [];
      }
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.validationErrors = [];
    }
  }

  // Step-Specific Validation Rules
  validateCurrentStep(): boolean {
    this.validationErrors = [];
    if (this.currentStep === 1) {
      if (!this.formData.orgName.trim()) this.validationErrors.push('Organization Name is required.');
      if (!this.formData.regNumber.trim()) this.validationErrors.push('Registration / Tax ID is required.');
      if (!this.formData.country.trim()) this.validationErrors.push('Country is required.');
      if (!this.formData.city.trim()) this.validationErrors.push('City/Municipality is required.');
      if (this.formData.yearFounded && (this.formData.yearFounded < 1800 || this.formData.yearFounded > 2026)) {
        this.validationErrors.push('Year Founded must be between 1800 and 2026.');
      }
    } else if (this.currentStep === 2) {
      if (!this.formData.contactName.trim()) this.validationErrors.push('Primary Representative Name is required.');
      if (!this.formData.contactRole.trim()) this.validationErrors.push('Representative Title/Role is required.');
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!this.formData.contactEmail.trim() || !emailRegex.test(this.formData.contactEmail.trim())) {
        this.validationErrors.push('A valid official email address is required.');
      }
      if (!this.formData.contactPhone.trim()) this.validationErrors.push('Contact phone number is required.');
    } else if (this.currentStep === 3) {
      if (!this.formData.missionStatement.trim() || this.formData.missionStatement.trim().length < 30) {
        this.validationErrors.push('Mission Statement must be at least 30 characters in length.');
      }
      if (this.formData.selectedFocusAreas.length === 0) {
        this.validationErrors.push('Please select at least one thematic focus area tag.');
      }
    } else if (this.currentStep === 4) {
      if (!this.formData.verifiedAffidavit) {
        this.validationErrors.push('You must confirm and certify the accuracy of the submission affidavit.');
      }
    }
    return this.validationErrors.length === 0;
  }

  // Focus Area Tag Selection
  toggleTag(tag: FocusAreaTag): void {
    tag.selected = !tag.selected;
    if (tag.selected) {
      if (!this.formData.selectedFocusAreas.includes(tag.label)) {
        this.formData.selectedFocusAreas.push(tag.label);
      }
    } else {
      this.formData.selectedFocusAreas = this.formData.selectedFocusAreas.filter(label => label !== tag.label);
    }
  }

  // Simulated Document Ingestion
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png'];
      if (!allowed.includes(file.type)) {
        this.validationErrors = ['Invalid file type. Please upload a PDF, DOCX, or PNG document.'];
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.validationErrors = ['File size exceeds the 5MB limit.'];
        return;
      }
      this.formData.uploadedFileName = file.name;
      this.formData.uploadedFileSize = (file.size / 1024).toFixed(1) + ' KB';
      this.validationErrors = [];
    }
  }

  // Final Registration Submission
  submitRegistration(): void {
    if (!this.validateCurrentStep()) return;
    this.isSubmitted = true;
    const newId = `NGO-NPI-${Math.floor(100 + Math.random() * 900)}`;
    const newEntry: RegisteredNgo = {
      id: newId,
      orgName: this.formData.orgName.trim(),
      country: this.formData.country.trim(),
      city: this.formData.city.trim(),
      orgType: this.formData.orgType,
      contactEmail: this.formData.contactEmail.trim(),
      focusAreas: [...this.formData.selectedFocusAreas],
      registeredDate: new Date().toISOString().split('T')[0],
      status: 'Under Review',
      badgeColor: 'badge-review'
    };

    this.registeredList.unshift(newEntry);
    this.saveRegistrations();
    this.applyFilter();
    this.submitSuccess = true;
    this.statusMessage = `Registration successful! Application ID ${newId} has been logged into the Nashua Peace Initiative Registry.`;
  }

  resetForm(): void {
    this.formData = this.getInitialFormData();
    this.availableTags.forEach(t => (t.selected = false));
    this.currentStep = 1;
    this.isSubmitted = false;
    this.submitSuccess = false;
    this.statusMessage = '';
    this.validationErrors = [];
  }

  // Dynamic Filtering & Search
  applyFilter(): void {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredRegistrants = this.registeredList.filter(item => {
      const matchesSearch =
        !q ||
        item.orgName.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.focusAreas.some(fa => fa.toLowerCase().includes(q));
      const matchesType =
        this.selectedFilterType === 'ALL' ||
        item.orgType.toLowerCase().includes(this.selectedFilterType.toLowerCase());
      return matchesSearch && matchesType;
    });
  }

  private saveRegistrations(): void {
    try {
      localStorage.setItem('npi_registered_ngos', JSON.stringify(this.registeredList));
    } catch (e) {
      console.warn('LocalStorage unavailable for caching NGO registrations.');
    }
  }

  private loadSavedRegistrations(): void {
    try {
      const data = localStorage.getItem('npi_registered_ngos');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.registeredList = parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse cached registrations.');
    }
  }
}
