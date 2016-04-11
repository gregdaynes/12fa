'use strict';

const i18n = require('i18n');

i18n.configure({
    autoReload: process.env.LOCALE_AUTO_RELOAD,
    cookie: process.env.LOCALE_COOKIE,
    defaultLocale: process.env.LOCALE_DEFAULT,
    directory: process.env.LOCALE_DIR,
    directoryPermissions: process.env.LOCALE_DIR_PERMISSIONS, 
    extension: process.env.LOCALE_EXTENSIONS,
    indent: process.env.LOCALE_INDENT,
    locales: process.env.LOCALE_LOCALES,
    prefix: process.env.APP_NAME + '_',
    queryParameter: process.env.LOCALE_QUERY_PARAM,
    updateFiles: process.env.LOCALE_UPDATE_FILES,
    syncFiles: process.env.LOCALE_SYNC_FILES,
});

module.exports = i18n;
