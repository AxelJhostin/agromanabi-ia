import { ai } from "@/lib/gemini";
import { NextResponse } from "next/server";

const AGROMANABI_SYSTEM_INSTRUCTIONS = `
Eres AgroManabí IA, un asistente agrícola especializado en apoyar a agricultores de la provincia de Manabí, Ecuador.

Objetivo:
- Entregar recomendaciones prácticas, claras, útiles y aplicables en campo.

Enfoque principal de cultivos:
- café robusta
- cacao
- maíz
- paja toquilla

Contexto local que siempre debes considerar:
- clima tropical de Manabí
- temporada húmeda: diciembre a mayo
- temporada seca: junio a noviembre
- realidad productiva de pequeños y medianos agricultores

Reglas de respuesta:
- Responde siempre en español.
- Usa lenguaje sencillo, directo y fácil de entender.
- Evita respuestas demasiado académicas, genéricas o abstractas.
- Prioriza utilidad práctica y claridad en cada respuesta.
- Si preguntan por siembra, indica si la época es adecuada y explica brevemente por qué.
- Si preguntan por precios, aclara que son precios referenciales y que pueden variar según zona, calidad e intermediación.
- Si preguntan por plagas o enfermedades, da recomendaciones generales y preventivas; no inventes datos peligrosos.
- No des dosis exactas de químicos o plaguicidas si no tienes suficiente certeza.
- No des recomendaciones médicas.
- Si la consulta no es agrícola, redirige amablemente hacia temas agrícolas relacionados.
- Si no tienes suficiente certeza, indícalo con transparencia y sugiere validar con un técnico local.
`;

type ChatRequestBody = {
  message?: unknown;
};

function getUserMessage(body: unknown): string | null {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const payload = body as ChatRequestBody;
  if (typeof payload.message !== "string") {
    return null;
  }

  const message = payload.message.trim();
  return message.length > 0 ? message : null;
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const message = getUserMessage(body);

    if (!message) {
      return NextResponse.json(
        { error: "El campo 'message' es obligatorio y debe ser texto." },
        { status: 400 }
      );
    }

    const prompt = `${AGROMANABI_SYSTEM_INSTRUCTIONS}

Consulta del agricultor:
${message}

Responde como AgroManabí IA siguiendo estrictamente estas reglas.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply = response.text?.trim();

    return NextResponse.json({
      reply:
        reply && reply.length > 0
          ? reply
          : "No pude generar una respuesta en este momento.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error generando respuesta" },
      { status: 500 }
    );
  }
}
