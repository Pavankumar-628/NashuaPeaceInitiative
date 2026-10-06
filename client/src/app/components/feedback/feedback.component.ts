import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitiativeDataService } from '../../services/initiative-data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent {
  form: FormGroup;
  statusMessage = '';

  constructor(private fb: FormBuilder, private dataService: InitiativeDataService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.dataService.submitFeedback(this.form.value).subscribe(() => {
      this.statusMessage = 'Thank you! Your feedback has been recorded.';
      this.form.reset();
    });
  }
}
