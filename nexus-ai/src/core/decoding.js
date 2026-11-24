export function softmax(logits, temperature = 1) {
  if (!Array.isArray(logits) || logits.length === 0) {
    throw new Error("Logits must be a non-empty array");
  }

  if (!logits.every(Number.isFinite)) {
    throw new Error("Logits must be finite numbers");
  }

  if (!Number.isFinite(temperature) || temperature <= 0) {
    throw new Error("Temperature must be positive");
  }

  // Numerical stability
  const maxLogit = Math.max(...logits);

  // Apply temperature and exponentiation
  const exponentials = logits.map((logit) =>
    Math.exp((logit - maxLogit) / temperature),
  );

  // Calculate denominator
  const sum = exponentials.reduce((acc, value) => acc + value, 0);

  // Normalize into probabilities
  return exponentials.map((value) => value / sum);
}

const tokens = ["blue", "clear", "dark", "green", "orange"];

const logits = [4.2, 2.8, 1.6, 0.3, 0.1];

const probabilities = softmax(logits, 1);

console.table(
  tokens.map((token, index) => ({
    token,
    logit: logits[index],
    probability: (probabilities[index] * 100).toFixed(2) + "%",
  })),
);

console.log(
  "Probability sum:",
  probabilities.reduce((a, b) => a + b, 0),
);

console.log(Math.exp(1000));

export function sampleToken(tokens, probabilities) {
  const random = Math.random();

  let cumulative = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulative += probabilities[i];

    if (random < cumulative) {
      return tokens[i];
    }
  }

  return tokens[tokens.length - 1];
}

console.log("Generated token:", sampleToken(tokens, probabilities));

export function greedyDecode(tokens, logits) {
  let maxIndex = 0;

  for (let i = 1; i < logits.length; i++) {
    if (logits[i] > logits[maxIndex]) {
      maxIndex = i;
    }
  }
  return tokens[maxIndex];
}

console.log(greedyDecode(tokens, logits));

const counts = Object.fromEntries(tokens.map((token) => [token, 0]));

const iterations = 10000;

for (let i = 0; i < iterations; i++) {
  const token = sampleToken(tokens, probabilities);

  counts[token]++;
}

console.log(counts);

console.table(
  tokens.map((token, index) => ({
    token: token,

    count: counts[token],

    theoretical: (probabilities[index] * 100).toFixed(2) + "%",

    observed: ((counts[token] / iterations) * 100).toFixed(2) + "%",
  })),
);
