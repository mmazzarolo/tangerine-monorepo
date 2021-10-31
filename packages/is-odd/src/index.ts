import { isEven } from "@my-monorepo/is-even";

export function isOdd(n: number): boolean {
  return isEven(n) === false;
}
