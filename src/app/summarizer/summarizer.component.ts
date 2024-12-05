import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-summarizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './summarizer.component.html',
  styleUrls: ['./summarizer.component.css']
})
export class SummarizerComponent {
  status: string = 'Checking browser support...';
  inputText: string = '';
  progress: string = '';
  summary: string = '';
  isSummarizerReady: boolean = false;
  summarizer: any;

  async ngOnInit() {
    if ('ai' in window && 'summarizer' in (window as any).ai) {
      this.status = 'Summarizer API supported. Initializing...';

      const capabilities = await (window as any).ai.summarizer.capabilities();
      if (capabilities.available === 'no') {
        this.status = 'Summarizer API is not usable at the moment.';
        return;
      }

      const options = {
        type: 'key-points',
        format: 'plain-text',
        length: 'medium',
      };

      this.summarizer = await (window as any).ai.summarizer.create({
        ...options,
        monitor: (monitor: any) => {
          monitor.addEventListener('downloadprogress', (e: any) => {
            this.progress = `Downloading model: ${e.loaded} of ${e.total} bytes.`;
          });
        }
      });

      if (capabilities.available === 'after-download') {
        await this.summarizer.ready;
      }

      this.status = 'Summarizer is ready.';
      this.isSummarizerReady = true;
    } else {
      this.status = 'Summarizer API not supported in this browser.';
    }
  }

  async summarize() {
    if (!this.inputText.trim()) {
      alert('Please enter text to summarize.');
      return;
    }

    this.progress = 'Generating summary...';
    this.summary = '';

    try {
      const summary = await this.summarizer.summarize(this.inputText);
      this.summary = `Summary: ${summary}`;
    } catch (err) {
      this.progress = 'Error generating summary.';
      console.error(err);
    } finally {
      this.progress = '';
    }
  }
}
