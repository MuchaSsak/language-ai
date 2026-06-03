const context = require.context("../locales", true, /\/messages\.ts$/);

const allMessages = context.keys().reduce(
  (acc, path) => {
    // e.g. "./en/messages.ts"
    const locale = path.split("/")[1];
    acc[locale] = context(path).messages;
    return acc;
  },
  {} as Record<string, any>,
);

export default allMessages;
