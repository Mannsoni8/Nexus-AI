function softmax(logits, temperature = 1) {
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

function sampleToken(tokens, probabilities) {
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
