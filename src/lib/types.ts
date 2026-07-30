/**
 * Presentation-layer types. These mirror the REST contracts exposed by the
 * Spring Boot API — the frontend never derives business rules from them.
 */

export type PipelineStage =
  | "novo-lead"
  | "primeiro-contato"
  | "reuniao-agendada"
  | "proposta-enviada"
  | "negociacao"
  | "cliente-fechado"
  | "perdido";

export interface Company {
  id: string;
  name: string;
  category: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  website: string;
  rating: number;
  reviews: number;
  openingHours: string;
  tags: string[];
  aiScore: number | null;
  aiSummary?: string;
  favorite: boolean;
  stage: PipelineStage;
  createdAt: string;
  photos: string[];
  notes?: string;
}
//  "places.displayName,places.formattedAddress ,places.priceLevel,places.websiteUri,places.nationalPhoneNumber,places.rating,nextPageToken"
    
export interface SearchHistoryItem {
  id: string;
  query: string;
  city: string;
  category: string;
  results: number;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  kind: "search" | "ai" | "pipeline" | "system";
  createdAt: string;
}
