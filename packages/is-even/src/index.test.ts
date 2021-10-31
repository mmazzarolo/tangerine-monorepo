import { isEven } from "./index";

describe("isEven", () => {
  test("it detects even numbers", () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(2)).toBe(true);
    expect(isEven(4)).toBe(true);
    expect(isEven(10)).toBe(true);
    expect(isEven(132)).toBe(true);
  });

  test("it detects odd numbers", () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(3)).toBe(false);
    expect(isEven(5)).toBe(false);
    expect(isEven(11)).toBe(false);
    expect(isEven(133)).toBe(false);
  });
});
