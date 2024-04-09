import { faker } from "@faker-js/faker";

export interface FakeData {
  firstName: string;
  lastName: string;
  password: string;
  randomNumber: number;
  username: string;
  zipCode: string;
}

export const generateFakeData: () => FakeData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: faker.internet.password(),
  randomNumber: faker.number.int({ min: 1, max: 5 }),
  username: faker.internet.userName(),
  zipCode: faker.location.zipCode(),
});