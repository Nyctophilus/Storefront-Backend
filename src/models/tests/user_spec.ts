import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User, UserStore } from "../user";
import { parseJwt } from "../../utils/parseJwt";

dotenv.config();
const {
  BCRYPT_SALT_ROUNDS,
  BCRYPT_PEPPER,
  JWT_TOKEN_SECRET,
} = process.env;

const store = new UserStore();

const userInstance = {
  firstname: "mo",
  lastname: "kelly",
  username: "mo22-test-dev",
};

const userInstancePassword = "CodDo128ao";

describe("User Model", () => {
  it("should have INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have CREATE method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have LOGIN method", () => {
    expect(store.login).toBeDefined();
  });

  it("should have DELETE method", () => {
    expect(store.delete).toBeDefined();
  });

  it("CREATE method should add user", async () => {
    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(
      parseInt(BCRYPT_SALT_ROUNDS as string)
    );
    const hashPassword = bcrypt.hashSync(
      pepperedPassword,
      salt
    );

    const user: User = {
      ...userInstance,
      password: hashPassword as string,
    };

    const { username } = await store.create(user);

    expect({ username }).toEqual({
      username: userInstance.username,
    });
  });

  it("INDEX method should return users list", async () => {
    const userList = await store.index();
    const { firstname, lastname, username } = userList[0];

    expect([{ firstname, lastname, username }]).toEqual([
      userInstance,
    ]);
  });

  it("SHOW method should return a user by username", async () => {
    const { firstname, lastname, username } =
      await store.show(userInstance.username);

    expect({ firstname, lastname, username }).toEqual(
      userInstance
    );
  });

  it("LOGIN method should return a token", async () => {
    const foundUser = await store.login(
      userInstance.username
    );
    expect(foundUser).toBeDefined();

    const pepperedPassword = `${userInstancePassword}${BCRYPT_PEPPER}`;
    const validPassword = bcrypt.compareSync(
      pepperedPassword,
      foundUser.password
    );
    expect(validPassword).toBeTrue();

    const token = jwt.sign(
      { username: foundUser.username },
      JWT_TOKEN_SECRET as string
    );
    const { username } = parseJwt(token);
    expect(username).toBe(foundUser.username);
  });
});
