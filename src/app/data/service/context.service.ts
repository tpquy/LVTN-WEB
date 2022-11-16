import { Injectable, Inject, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  constructor(@Inject(LOCALE_ID) private localeId: string) { }

  getLocaleId(): string {
    return this.localeId;
  }
  
}
