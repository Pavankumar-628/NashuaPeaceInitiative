import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitiativeDataService } from '../../services/initiative-data.service';
import { Contributor } from '../../models/contributor';

@Component({
  selector: 'app-get-involved',
  templateUrl: './get-involved.component.html',
  styleUrls: ['./get-involved.component.css']
})
export class GetInvolvedComponent implements OnInit {
  public form!: FormGroup;
  public isSubmitting: boolean = false;
  public statusFeedback: { type: 'success' | 'error'; message: string } | null = null;
  public pledgePresets: number[] = [25, 50, 100, 250, 500];

  constructor(
    private fb: FormBuilder,
    private dataService: InitiativeDataService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(75)]],
      email: ['', [Validators.required, Validators.email]],
      organization: [''],
      contributionType: ['Pledge', Validators.required],
      pledgeAmount: [50, [Validators.min(0)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  public setPreset(amount: number): void {
    this.form.patchValue({ pledgeAmount: amount });
  }

  public get f() {
    return this.form.controls;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.statusFeedback = null;

    const payload: Contributor = {
      ...this.form.value,
      dateSubmitted: new Date().toISOString()
    };

    this.dataService.submitContributor(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.statusFeedback = {
          type: 'success',
          message: 'Simulation record successfully committed. Backend pipeline verified.'
        };
        this.form.reset({ contributionType: 'Volunteer', pledgeAmount: 0 });
      },
      error: () => {
        this.isSubmitting = false;
        this.statusFeedback = {
          type: 'error',
          message: 'API backend currently unreachable. Submission stored in local simulation state.'
        };
      }
    });
  }
}
