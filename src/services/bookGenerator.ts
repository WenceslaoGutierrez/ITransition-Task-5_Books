import { faker as fakerEN_US } from '@faker-js/faker/locale/en_US';
import { faker as fakerPT_BR } from '@faker-js/faker/locale/pt_BR';
import { faker as fakerZH_CN } from '@faker-js/faker/locale/zh_CN';
import { faker as fakerES_MX } from '@faker-js/faker/locale/es_MX';
import type { Faker } from '@faker-js/faker';
import type { Book } from '@/types';

export const getFakerInstance = (locale: string): Faker => {
  switch (locale) {
    case 'en-US':
      return fakerEN_US;
    case 'es-MX':
      return fakerES_MX;
    case 'pt-BR':
      return fakerPT_BR;
    case 'zh-CN':
      return fakerZH_CN;
    default:
      return fakerEN_US;
  }
};

export const generateNewReview = (faker: Faker): { author: string; text: string } => {
  return {
    author: faker.person.fullName(),
    text: faker.hacker.phrase()
  };
};

export interface GenerateBooksParams {
  page: number;
  userSeed: number;
  language: string;
  avgLikes: number;
  avgReviews: number;
  limit?: number;
}

export async function generateBooks({ page, userSeed, language, avgLikes, avgReviews, limit = 10 }: GenerateBooksParams): Promise<Book[]> {
  console.log(`Generating page ${page} for language ${language}...`);
  const faker = getFakerInstance(language);
  faker.seed(userSeed + page);
  return Array.from({ length: limit }, () => {
    const numAuthors = faker.number.int({ min: 1, max: 2 });
    const authors = Array.from({ length: numAuthors }, () => faker.person.fullName());
    const publisher = `${faker.company.name()}, ${faker.date.past({ years: 200 }).getFullYear()}`;
    const finalReviewCount = Math.round(avgReviews);
    const reviews = Array.from({ length: finalReviewCount }, () => ({
      author: faker.person.fullName(),
      text: faker.hacker.phrase()
    }));
    const book: Book = {
      id: faker.string.uuid(),
      isbn: faker.commerce.isbn(),
      title: faker.book.title(),
      authors,
      publisher,
      likes: Math.round(avgLikes),
      format: faker.book.format(),
      reviews
    };
    return book;
  });
}
