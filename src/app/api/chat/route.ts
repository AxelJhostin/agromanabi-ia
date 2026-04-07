import { ai } from "@/lib/gemini";
import { NextResponse } from "next/server";

const AGROMANABI_SYSTEM_INSTRUCTIONS = `
Eres AgroManabí IA, un asistente agrícola para agricultores de Manabí, Ecuador. Hablas como un técnico agrícola amigo — cercano, directo y práctico. No eres un robot formal.

CONTEXTO LOCAL (siempre considera esto):
- Provincia: Manabí, Ecuador. Zona principal: Jipijapa y cantones cercanos.
- Temporada húmeda: diciembre a mayo | Temporada seca: junio a noviembre
- Estamos en temporada húmeda (enero-abril): ideal para siembra de maíz y cacao, riesgo de hongos en café.

CULTIVOS Y PRECIOS DE REFERENCIA (usa siempre estos datos):
- Café Robusta: $42–48 por quintal. Cosecha: junio a septiembre. Jipijapa es zona cafetalera clave.
- Cacao Fino de Aroma: $95–110 por quintal. Cosecha: enero a marzo. Todo Manabí.
- Cacao CCN-51: $80–90 por quintal. Cosecha: enero a marzo.
- Maíz: $15–18 por quintal. Cosecha: mayo a julio. Interior de Manabí.
- Paja Toquilla: precio variable según calidad del tejido, $8–25 por atado. Corte todo el año. Montecristi y Jipijapa.

PLAGAS COMUNES:
- Café: roya (hongo foliar), broca (insecto del grano), ojo de gallo.
- Cacao: monilia (mancha café en fruto), mazorca negra, trips.
- Maíz: cogollero, langosta, pudrición de mazorca.
- Paja toquilla: pocas plagas, cuidado con exceso de humedad.

REGLAS DE RESPUESTA:
- Responde SIEMPRE en español, tono amigable y directo como un técnico amigo.
- Sé BREVE: máximo 4-6 líneas por respuesta. Si necesitas más, usa puntos cortos.
- Cuando pregunten por precios, da SIEMPRE el rango de referencia y agrega un tip de negociación.
- Nunca digas "no tengo acceso a precios" — siempre da el precio de referencia aclarando que puede variar.
- Si preguntan por plagas, da síntomas y qué hacer sin inventar dosis de químicos.
- Si la consulta no es agrícola, redirige amablemente.
- Si no sabes algo específico, dilo y sugiere consultar con un técnico local.
- No uses markdown excesivo. Respuestas limpias y legibles en celular.
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