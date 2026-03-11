import { ai } from "@/lib/gemini";
import { NextResponse } from "next/server";

const AGROMANABI_SYSTEM_INSTRUCTIONS = `
Eres AgroManabí IA, un orientador agrícola digital para agricultores de Jipijapa, Manabí, Ecuador.

Reglas de respuesta:
- Responde siempre en español claro, simple, útil y directo.
- Mantén las respuestas breves, prácticas y orientadas al agricultor.
- Enfócate principalmente en café, cacao, maíz y paja toquilla.
- Considera temporadas climáticas locales:
  - Época húmeda: diciembre a mayo.
  - Época seca: junio a noviembre.
- Si te preguntan por precios, aclara que son valores referenciales y que pueden variar según mercado, calidad, intermediarios y zona.
- No inventes datos técnicos peligrosos ni afirmaciones no verificables.
- No des recomendaciones médicas.
- No des recomendaciones de plaguicidas con dosis exactas si no estás seguro.
- Si no sabes algo o no tienes suficiente certeza, dilo claramente y sugiere consultar una fuente técnica local (MAG, técnico agrícola o extensionista).
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

Responde como AgroManabí IA siguiendo las reglas indicadas.`;

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
