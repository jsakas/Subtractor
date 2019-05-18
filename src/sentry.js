if (SENTRY_ENABLED) {
    require('@sentry/browser')
        .init({ dsn: 'https://7c95a9a1547046e1afde59d864482271@sentry.io/1462746' });
}
