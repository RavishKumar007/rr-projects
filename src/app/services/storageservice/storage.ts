import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SafeStorageService {
  // Check the platform environment using modern functional injection
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  
  // Temporary in-memory fallback store exclusively for Server-Side Rendering execution
  private serverStore: Record<string, string> = {};

  /**
   * Retrieves an item from storage.
   * On the browser, it reads from the real localStorage.
   * On the server, it checks the temporary in-memory fallback.
   */
  getItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return this.serverStore[key] || null;
  }

  /**
   * Persists an item to storage.
   * On the browser, it writes directly to localStorage.
   * On the server, it updates the temporary scratchpad to prevent read errors.
   */
  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    } else {
      this.serverStore[key] = value;
    }
  }

  /**
   * Removes a specific item from storage.
   */
  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    } else {
      delete this.serverStore[key];
    }
  }

  /**
   * Clears all entries from storage.
   */
  clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    } else {
      this.serverStore = {};
    }
  }
}
