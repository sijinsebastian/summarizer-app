import { bootstrapApplication } from '@angular/platform-browser';
import { SummarizerComponent } from './app/summarizer/summarizer.component';

bootstrapApplication(SummarizerComponent)
  .catch(err => console.error(err));
