import { extractText, getDocumentProxy } from "unpdf";
import mammoth from "mammoth";

export type ExtractedText = {
  text: string;
  pages?: number;
  warnings: string[];
};

export async function extractCVText(
  buffer: ArrayBuffer,
  mimeType: string,
  filename: string,
): Promise<ExtractedText> {
  const lower = (mimeType || "").toLowerCase();
  const name = filename.toLowerCase();

  if (lower.includes("pdf") || name.endsWith(".pdf")) {
    return extractPDF(buffer);
  }
  if (
    lower.includes("wordprocessingml") ||
    lower.includes("msword") ||
    name.endsWith(".docx") ||
    name.endsWith(".doc")
  ) {
    return extractDOCX(buffer);
  }
  if (lower.startsWith("text/") || name.endsWith(".txt") || name.endsWith(".md")) {
    const text = new TextDecoder("utf-8").decode(buffer);
    return { text, warnings: [] };
  }

  throw new Error(
    `Unsupported file type for "${filename}" (${mimeType || "unknown"}). ` +
      `Accept PDF, DOCX, or plain text.`,
  );
}

async function extractPDF(buffer: ArrayBuffer): Promise<ExtractedText> {
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { totalPages, text } = await extractText(pdf, { mergePages: true });
  const trimmed = (Array.isArray(text) ? text.join("\n\n") : text).trim();
  const warnings: string[] = [];
  if (trimmed.length < 200) {
    warnings.push(
      "Extracted text is very short — the PDF may be image-only. " +
        "Try exporting a text-based PDF.",
    );
  }
  return { text: trimmed, pages: totalPages, warnings };
}

async function extractDOCX(buffer: ArrayBuffer): Promise<ExtractedText> {
  const result = await mammoth.extractRawText({
    buffer: Buffer.from(buffer),
  });
  return {
    text: result.value.trim(),
    warnings: result.messages.map((m) => m.message),
  };
}
