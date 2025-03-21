import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings, defaults } from '../config';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private optionsSignal = signal<AppSettings>(defaults);
  private notify$ = new BehaviorSubject<Record<string, any>>({});

  constructor() {
    this.notify$.next(this.optionsSignal());

    const options = localStorage.getItem('options');
    if (options) {
      this.optionsSignal = signal<AppSettings>(JSON.parse(options));
    }
  }

  // Observable for notification updates
  get notify(): Observable<Record<string, any>> {
    return this.notify$.asObservable();
  }

  // Get the current options
  getOptions(): AppSettings {
    return this.optionsSignal();
  }

  setOptions(options: Partial<AppSettings>) {
    this.optionsSignal.update((current) => ({
      ...current,
      ...options,
    }));
    localStorage.setItem('options', JSON.stringify(this.optionsSignal()));
    this.notify$.next(this.optionsSignal);

  }
}
