import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qdwipjdlvukfgbqdocoy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkd2lwamRsdnVrZmdicWRvY295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2OTYzNjgsImV4cCI6MjA1NDI3MjM2OH0.Qd0cFZIZq0QKAyjQyrp-gdaEH0Mv6ROzxTg4oxXZaUI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const sanitizeFileName = (name) => {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "") 
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_.-]/g, ""); 
};

export const uploadImage = async (file, folder = "products") => {
  if (!file) throw new Error("Fayl seçilməyib!");

  const fileName = `${Date.now()}_${sanitizeFileName(file.name)}`;
  const filePath = `images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(folder)
    .upload(filePath, file, { upsert: false });

  if (uploadError) {
    console.error("Yükləmə xətası:", uploadError.message);
    throw uploadError;
  }

  const { data: publicUrlData } = supabase.storage
    .from(folder)
    .getPublicUrl(filePath);

  return publicUrlData?.publicUrl || null;
};
