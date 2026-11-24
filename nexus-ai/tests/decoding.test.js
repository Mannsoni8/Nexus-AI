import test from "node:test";
import assert from "node:assert/strict";

import { softmax } from "../src/core/decoding.js";

test("softmax probabilities sum to one", () => {
  const probabilities = softmax([4.2, 2.8, 1.6]);

  const sum = probabilities.reduce(
    (acc, value) => acc + value,
    0
  );

  assert.ok(Math.abs(sum - 1) < 0.000001);
});

test("softmax rejects invalid temperatures", () => {
  assert.throws(() => softmax([1, 2, 3], 0));

  assert.throws(() => softmax([1, 2, 3], -1));

  assert.throws(() => softmax([1, 2, 3], NaN));

  assert.throws(() => softmax([1, 2, 3], Infinity));
});

test("softmax handles large logits", () => {
  const probabilities = softmax([1000, 2000, 3000]);

  assert.ok(
    probabilities.every(Number.isFinite)
  );

  const sum = probabilities.reduce(
    (acc, value) => acc + value,
    0
  );

  assert.ok(Math.abs(sum - 1) < 0.000001);
});