export interface ProblemArea {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

export interface AdvisorState {
  plantsAffected: string;
  antActivitySeverity: 'low' | 'medium' | 'high';
  kitchenInfestation: boolean;
  gardenSize: 'balcony' | 'medium' | 'large';
  weedTypes: string[];
}
