export interface Book {
  id: string;
  isbn: string;
  title: string;
  authors: string[];
  publisher: string;
  reviews?: { author: string; text: string }[];
  likes?: number;
  format?: string;
}
