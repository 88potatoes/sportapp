export interface Fixture {
  id: number;
  player1_id: number;
  player2_id: number;
  location?: string;
  matchtime: Date;
  player1_score: number;
  player2_score: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Player {
  id: number;
  first_name?: string;
  last_name?: string;
  createdAt: Date;
  updatedAt: Date;
  team_id: number;
}

export interface Team {
  id: number;
  team_name?: string;
  createdAt: Date;
  updatedAt: Date;
}
