import { NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 60; // 1 minute max duration for Vercel Hobby

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    const _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'mock-key',
    });

    // We can just simulate the response for now, or perform a real request if needed.
    // For now, matching what analyzeClothingStyle does, let us return the mock data for now,
    // but the structure is correct to perform actual server-side openai calls safely.

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json({
      category: "tops",
      subCategory: "sweatshirt",
      fitType: "oversized",
      material: "Heavy Cotton",
      materialType: "knit",
      thickness: 7,
      stretchFactor: 4,
      drapingFactor: 3,
      drapingLevel: 3,
      stretchLevel: 4,
      description: "Heavyweight loopback cotton with a drop-shoulder oversized silhouette. The fabric has a substantial feel with moderate stretch."
    });
  } catch (error) {
    console.error("Vision API Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
