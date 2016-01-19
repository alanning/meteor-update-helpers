"use strict";

//////////////////////////////////////////////////////////////////////
// getOperations
//

Tinytest.add('getOperations returns all actions', function (test) {
  var mutator = {$set: {"profile.name": "John",
                        "lastSeen": new Date()},
                 $unset: {"profile.age": 1}},
      expected,
      actual;

  expected = ["$set", "$unset"];
  actual = UpdateHelpers.getOperations(mutator);
  test.equal(actual, expected);
});


//////////////////////////////////////////////////////////////////////
// getFields
//
Tinytest.add('getFields returns all fields', function (test) {
  var mutator = {$set: {"profile.name": "John",
                        "lastSeen": new Date()},
                 $unset: {"profile.age": 1}},
      expected,
      actual;

  expected = ["profile.name", "lastSeen", "profile.age"];
  actual = UpdateHelpers.getFields(mutator);
  test.equal(actual, expected);
});

Tinytest.add("getFields with 'topLevelOnly' option returns top-level fields",
  function (test) {
  var mutator = {$set: {"profile.name": "John",
                        "lastSeen": new Date()},
                 $unset: {"profile.age": 1}},
      expected,
      options,
      actual;

  expected = ["profile", "lastSeen"];
  options = {topLevelOnly: true};
  actual = UpdateHelpers.getFields(mutator, options);
  test.equal(actual, expected);
});


//////////////////////////////////////////////////////////////////////
// filterMutator
//
Tinytest.add('filterMutator works with top-level fields', function (test) {
  var mutator = {$set: {"profile.name": "John",
                        "lastSeen": new Date()},
                 $unset: {"profile.age": 1}},
      fieldsToKeep = ["profile"],
      expected,
      actual;

  expected = {$set: {"profile.name": "John"},
              $unset: {"profile.age": 1}};
  actual = UpdateHelpers.filterMutator(mutator, fieldsToKeep);
  test.equal(actual, expected);
});

Tinytest.add('filterMutator works with sub-level fields', function (test) {
  var mutator = {$set: {"profile.name": "John",
                        "lastSeen": new Date()},
                 $unset: {"profile.age": 1}},
      fieldsToKeep = ["profile.name"],
      expected,
      actual;

  expected = {$set: {"profile.name": "John"}};
  actual = UpdateHelpers.filterMutator(mutator, fieldsToKeep);
  test.equal(actual, expected);
});
