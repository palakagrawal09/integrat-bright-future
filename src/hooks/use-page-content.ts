import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type PageContentRow = {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  sort_order: number;
  published: boolean;
};

type ContentMap = Record<string, Record<string, string>>;

export function usePageContent(page: string) {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .eq("page", page)
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (!error && data) {
        const map: ContentMap = {};
        (data as PageContentRow[]).forEach((row) => {
          if (!map[row.section]) map[row.section] = {};
          map[row.section][row.content_key] = row.content_value;
        });
        setContent(map);
      }
      setLoading(false);
    };

    fetch();
  }, [page]);

  const get = (section: string, key: string, fallback = ""): string => {
    return content[section]?.[key] ?? fallback;
  };

  const getJSON = <T = any>(section: string, key: string, fallback?: T): T => {
    const val = content[section]?.[key];
    if (!val) return fallback as T;
    try {
      return JSON.parse(val);
    } catch {
      return fallback as T;
    }
  };

  return { content, loading, get, getJSON };
}
