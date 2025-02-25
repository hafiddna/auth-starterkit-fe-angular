import { Injectable, signal } from '@angular/core';
import { AppSettings, defaults } from '../config';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  // TODO: Get from localstorage first, if there is no value, get from defaults
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

  setLanguage(lang: string) {
    this.setOptions({ language: lang });
  }

  getLanguage() {
    return this.getOptions().language;
  }
}
