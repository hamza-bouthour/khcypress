import { faker } from "@faker-js/faker";

const passwordLength = 12;

export const generateUserDetails = () => {
  let isMale = Math.floor(Math.random() * 2) === 1;
  let details = {
    email: { id: "emailOrPhone", value: faker.internet.email() },
    fullName: {
      id: "fullName",
      value: faker.person.fullName({ sex: isMale ? "male" : "female" }),
    },
    userName: {
      id: "username",
      value: faker.lorem.words(1) + faker.number.int({ min: 900, max: 1600 }),
    },
    password: {
      id: "password",
      value: faker.internet.password({ length: passwordLength }),
    },
  };
  return details;
};
