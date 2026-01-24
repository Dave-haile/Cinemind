import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Suggest one amazing movie to watch right now. Give the title and a 1-sentence catchy pitch.",
    });

    return NextResponse.json({
      recommendation: response.text || "No recommendation at the moment."
    });
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return NextResponse.json(
      { error: "Failed to get a recommendation. Please try again later." },
      { status: 500 }
    );
  }
}