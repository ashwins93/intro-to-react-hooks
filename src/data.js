import faker from "faker";

window.faker = faker;

export default [
  "Learn React",
  "Learn React Hooks",
  ...faker.lorem.words(500).split(" ")
];
