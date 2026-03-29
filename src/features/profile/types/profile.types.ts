export interface ProfileStats {
  played: number;
  won: number;
  lost: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  stats: ProfileStats;
}