import { createClient } from "@supabase/supabase-js";


const PROJECT_URL = "https://odnddpsqdbsbvuzirkqk.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kbmRkcHNxZGJzYnZ1emlya3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkyMzg3NDksImV4cCI6MTk4NDgxNDc0OX0.RNrJgucJVvMbCRkKH-jgu2sBjmhFcFfR9kpehWdx5tM";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video")
        .select("*");
    }
  }
}