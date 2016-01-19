Package.describe({
  name: 'alanning:update-helpers',
  version: '0.0.1',
  summary: 'Utility functions to query meta data about MongoDB update objects',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.export("UpdateHelpers");
  api.addFiles('update-helpers.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('alanning:update-helpers');
  api.addFiles('update-helpers-tests.js');
});
