const alternatives = {
  moment: {
    alternatives: ["dayjs", "date-fns"],
    reason:
      "Moment.js is heavy (~2MB). Day.js is lighter (~2KB) and date-fns is modular.",
  },
  lodash: {
    alternatives: ["lodash-es", "rambda"],
    reason:
      "Full Lodash is heavy (~4MB). Lodash-es enables tree-shaking and Rambda is lighter.",
  },
  axios: {
    alternatives: ["ky", "got"],
    reason:
      "Axios is relatively heavy (~1.5MB). Ky and Got are lighter and more modern.",
  },
  express: {
    alternatives: ["fastify", "koa"],
    reason:
      "Express has more overhead. Fastify is faster and lighter, Koa is minimalist.",
  },
  mongoose: {
    alternatives: ["prisma", "@prisma/client"],
    reason:
      "Mongoose is heavy with many dependencies. Prisma is more modern and type-safe.",
  },
};

function getAlternatives(packageName) {
  return alternatives[packageName] || null;
}

function addAlternative(packageName, alternativeData) {
  if (!alternativeData.alternatives || !alternativeData.reason) {
    throw new Error("Alternative data must include alternatives and reason");
  }

  alternatives[packageName] = alternativeData;
}

module.exports = {
  getAlternatives,
  addAlternative,
};
