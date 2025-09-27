export interface UserProfile {
  name: string;
  region: string;
  acceptedTerms: boolean;
  voiceSettings?: {
    rate: number;
    pitch: number;
    volume: number;
    language: string;
  };
  createdAt: Date;
  lastActive: Date;
}

export interface StarredMessage {
  id: string;
  text: string;
  timestamp: Date;
  type?: string;
  source?: string;
}

export class ProfileManager {
  private profileKey = 'nanicure_profile';
  private starredKey = 'nanicure_starred';

  getProfile(): UserProfile | null {
    try {
      const data = localStorage.getItem(this.profileKey);
      if (!data) return null;
      
      const profile = JSON.parse(data);
      // Convert date strings back to Date objects
      profile.createdAt = new Date(profile.createdAt);
      profile.lastActive = new Date(profile.lastActive);
      
      return profile;
    } catch (error) {
      console.error('Error loading profile:', error);
      return null;
    }
  }

  saveProfile(profile: UserProfile): void {
    try {
      profile.lastActive = new Date();
      localStorage.setItem(this.profileKey, JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  }

  createProfile(name: string, region: string): UserProfile {
    const profile: UserProfile = {
      name,
      region,
      acceptedTerms: true,
      voiceSettings: {
        rate: 0.95,
        pitch: 1.1,
        volume: 1.0,
        language: 'en-IN'
      },
      createdAt: new Date(),
      lastActive: new Date()
    };

    this.saveProfile(profile);
    return profile;
  }

  updateProfile(updates: Partial<UserProfile>): void {
    const current = this.getProfile();
    if (current) {
      const updated = { ...current, ...updates };
      this.saveProfile(updated);
    }
  }

  deleteProfile(): void {
    localStorage.removeItem(this.profileKey);
    localStorage.removeItem(this.starredKey);
  }

  isLoggedIn(): boolean {
    return this.getProfile() !== null;
  }

  getStarredMessages(): StarredMessage[] {
    try {
      const data = localStorage.getItem(this.starredKey);
      if (!data) return [];
      
      const starred = JSON.parse(data);
      return starred.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    } catch (error) {
      console.error('Error loading starred messages:', error);
      return [];
    }
  }

  addStarredMessage(message: StarredMessage): void {
    try {
      const starred = this.getStarredMessages();
      
      // Check if already starred
      if (starred.some(msg => msg.id === message.id)) {
        return;
      }
      
      starred.unshift(message); // Add to beginning
      
      // Keep only latest 100 starred messages
      if (starred.length > 100) {
        starred.splice(100);
      }
      
      localStorage.setItem(this.starredKey, JSON.stringify(starred));
    } catch (error) {
      console.error('Error saving starred message:', error);
    }
  }

  removeStarredMessage(id: string): void {
    try {
      const starred = this.getStarredMessages();
      const filtered = starred.filter(msg => msg.id !== id);
      localStorage.setItem(this.starredKey, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing starred message:', error);
    }
  }

  clearStarredMessages(): void {
    localStorage.removeItem(this.starredKey);
  }

  exportProfile(): string {
    const profile = this.getProfile();
    const starred = this.getStarredMessages();
    
    return JSON.stringify({
      profile,
      starred,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }

  importProfile(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.profile) {
        this.saveProfile(data.profile);
      }
      
      if (data.starred && Array.isArray(data.starred)) {
        localStorage.setItem(this.starredKey, JSON.stringify(data.starred));
      }
      
      return true;
    } catch (error) {
      console.error('Error importing profile:', error);
      return false;
    }
  }
}

// Singleton instance
export const profileManager = new ProfileManager();
