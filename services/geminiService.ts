import { LeadData, ScoreResult, Recommendations } from '../types';

export async function getLeadRecommendations(leadData: LeadData, scoreResult: ScoreResult): Promise<Recommendations> {
  try {
    const response = await fetch('/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ leadData, scoreResult }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const recommendations: Recommendations = await response.json();
    return recommendations;

  } catch (e) {
    console.error("Error fetching recommendations:", e);
    // Return a default error structure that matches the Recommendations type
    return {
      serviceCategory: "Error",
      service: "Error de Conexión",
      nextSteps: "No se pudieron generar recomendaciones debido a un error de comunicación con el servidor. Por favor, revise la conexión y vuelva a intentarlo.",
      priority: "Media",
      action: "Contactar a soporte técnico o revisar la implementación.",
      scoreJustification: "No disponible.",
      serviceJustification: "No disponible."
    };
  }
}
