# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<!--
################################################################################
### PLEASE LINK THE ISSUES IF THERE IS ONE, OTHERWISE LINK THE PULL-REQUESTS ###
################################################################################
-->

## [Unreleased]
### Added
- Assignment unit. [#600](https://github.com/geli-lms/geli/issues/600)

### Changed
- Bump version number to 0.8.6. [#1206](https://github.com/geli-lms/geli/pull/1206)
- Update frontend to Angular 7. [#889](https://github.com/geli-lms/geli/issues/889)

### Fixed
- Apidoc: parser plugin 'param' not found in block. [#1207](https://github.com/geli-lms/geli/pull/1207)

## [[0.8.5](https://github.com/geli-lms/geli/releases/tag/v0.8.5)] - 2019-03-26 - WS 18/19 🎉-Release
### Added
- Translatable SnackBarService. [#922](https://github.com/geli-lms/geli/issues/922)
- `ProgressController` `GET` unit tests & access denial tests in general. [#1116](https://github.com/geli-lms/geli/issues/1116)
- `UnitController` `GET` & `DELETE` route unit tests for status code `200`. [#1190](https://github.com/geli-lms/geli/issues/1190)
- `UnitController` status code `403` (not authorized to view / edit course) unit tests for all routes. [#1190](https://github.com/geli-lms/geli/issues/1190)
- `WhitelistController` status code `403` unit tests for all routes. [#1192](https://github.com/geli-lms/geli/issues/1192)
- Sticky header for course view. [#1115](https://github.com/geli-lms/geli/issues/1115)
- `MediaController` status code `403` unit tests for all routes. [#1196](https://github.com/geli-lms/geli/issues/1196)
- `CourseMediaMigration` to patch the `_course` properties of a `Course`'s `Directory` / `File` tree. [#1196](https://github.com/geli-lms/geli/issues/1196)

### Changed
- Extend `ProgressController` `PUT` route to handle both creation and updates. [#1116](https://github.com/geli-lms/geli/issues/1116)
- Refactor `ProgressController` unit tests in general. [#1116](https://github.com/geli-lms/geli/issues/1116)
- Refactor `MediaController` unit tests in general using the `TestHelper`. [#1196](https://github.com/geli-lms/geli/issues/1196)
- Instead of a list of progress data, the `ProgressController` `GET` route now responds with a single progress object or an empty object if no data can be found. [#1116](https://github.com/geli-lms/geli/issues/1116)
- `Directory` / `File` schemata and the corresponding interfaces now reference their `Course` as `_course` (analogous to the `Unit` schema). [#1196](https://github.com/geli-lms/geli/issues/1196)

### Removed
- Unused `ProgressController` `GET` routes for `/courses/` & `/users/`. [#1116](https://github.com/geli-lms/geli/issues/1116)
- `ProgressController` `POST` route _(obviated by extended `PUT` route)_. [#1116](https://github.com/geli-lms/geli/issues/1116)
- Unused `WhitelistController` `PUT` route. [#1192](https://github.com/geli-lms/geli/issues/1192)
- Dependency `migrate-mongoose`. [#1189](https://github.com/geli-lms/geli/pull/1189)

### Fixed
- `TaskUnitComponent.validate` `validationMode` reset. [#1116](https://github.com/geli-lms/geli/issues/1116)
- `CodeKataComponent` `progress.code` loading. [#1116](https://github.com/geli-lms/geli/issues/1116)
- Code order in the `MediaController`'s `createDirectory` & `createFile`. [#1196](https://github.com/geli-lms/geli/issues/1196)
- Notification scroll bug. [#1082](https://github.com/geli-lms/geli/issues/1082)

### Security
- Close `ProgressController` vulnerabilities. [#1116](https://github.com/geli-lms/geli/issues/1116)
- Close `UnitController` vulnerabilities. [#1190](https://github.com/geli-lms/geli/issues/1190)
- Close `WhitelistController` vulnerabilities. [#1192](https://github.com/geli-lms/geli/issues/1192)
- Close `MediaController` vulnerabilities. [#1196](https://github.com/geli-lms/geli/issues/1196)

## [[0.8.4](https://github.com/geli-lms/geli/releases/tag/v0.8.4)] - 2018-12-20 - WS 18/19 ❄️-Release
### Added
- Export PDF with styled free text units. [#997](https://github.com/geli-lms/geli/issues/997) [#1047](https://github.com/geli-lms/geli/pull/1047)
- More predefined custom containers. [#996](https://github.com/geli-lms/geli/issues/996)
- Styled code snippets. [#1017](https://github.com/geli-lms/geli/issues/1017)
- `LectureController` success (`200`), access denial (`403`) and not found (`404`) unit tests for all routes. [#1041](https://github.com/geli-lms/geli/issues/1041)
- Various `NotificationController` unit tests (`200`s, `400`s, `403`s, `404`s). [#1065](https://github.com/geli-lms/geli/issues/1065)
- Two `NotificationSettingsController` unit tests for `403` & `404` `PUT` request errors. [#1072](https://github.com/geli-lms/geli/issues/1072)
- `TestHelper` request methods for `PUT` & `DELETE`. [#1041](https://github.com/geli-lms/geli/issues/1041)
- CodeKata validation service. [#844](https://github.com/geli-lms/geli/issues/844)
- Course: Added switch for file <-> video unit. [#912](https://github.com/geli-lms/geli/issues/912)

### Fixed
- `bundle.scss` not available in api container. [#1052](https://github.com/geli-lms/geli/issues/1052)

### Changed
- Update `mongoose` to `5.4.x`. [#1003](https://github.com/geli-lms/geli/issues/1003) [#1004](https://github.com/geli-lms/geli/pull/1004) [#1044](https://github.com/geli-lms/geli/pull/1044) [#1077](https://github.com/geli-lms/geli/pull/1077)
- Refactor `LectureController` `GET`/`POST`/`PUT` routes to use `async`/`await`. [#1041](https://github.com/geli-lms/geli/issues/1041)
- Refactor `NotificationController` unit tests in general. [#1065](https://github.com/geli-lms/geli/issues/1065)
- Refactor `NotificationController` to utilize `.orFail` and the `errorCodes` file. [#1065](https://github.com/geli-lms/geli/issues/1065)
- Refactor `ExportController` & `LectureController` to utilize `.orFail`. [#1065](https://github.com/geli-lms/geli/issues/1065)
- Sanitize `{post} /api/lecture/` route parameters by reducing the arbitrary `ILecture` input to `name` & `description`. [#1041](https://github.com/geli-lms/geli/issues/1041)
- Sanitize `NotificationController` `POST` route parameters by taking a `targetType` and `targetId` instead of the separate `changedCourse`/`changedLecture`/`changedUnit` which needed a _(missing)_ consistency check. [#1065](https://github.com/geli-lms/geli/issues/1065)
- Empty success response object in the two `NotificationController` `POST` routes. [#1065](https://github.com/geli-lms/geli/issues/1065)
- Major `NotificationSettingsController` refactoring and changes in general, plus unit test / front-end adjustments. [#1072](https://github.com/geli-lms/geli/issues/1072)
- Disable unit submit button when deadline is over. [#964](https://github.com/geli-lms/geli/issues/964)
- The background image on the index page. [#922](https://github.com/geli-lms/geli/issues/922)

### Removed
- Unused `Notification` class in the front-end. [#1065](https://github.com/geli-lms/geli/issues/1065)
- Unused `NotificationSettings` class in the front-end. [#1072](https://github.com/geli-lms/geli/issues/1072)
- `{post} /api/notificationSettings/` route; functionality now handled completely by `{put} /api/notificationSettings/`. [#1072](https://github.com/geli-lms/geli/issues/1072)

### Fixed
- Some incorrect `FixtureUtils` return types. [#1041](https://github.com/geli-lms/geli/issues/1041) [#1065](https://github.com/geli-lms/geli/issues/1065)
- `LectureController` `404` error handling. [#1041](https://github.com/geli-lms/geli/issues/1041)
- `NotificationController` `404` error handling. [#1065](https://github.com/geli-lms/geli/issues/1065)
- `NotificationSettingsController` `404` `PUT` error handling. [#1072](https://github.com/geli-lms/geli/issues/1072)
- Course list broken when course image in invalid state. [#1053](https://github.com/geli-lms/geli/issues/1053)

### Security
- Fix multiple security issues of the `LectureController`. [#1041](https://github.com/geli-lms/geli/issues/1041)
- Fix missing `teacher` authorization check for the two `NotificationController` `POST` routes. [#1065](https://github.com/geli-lms/geli/issues/1065)
- Fix missing `NotificationController` `POST` `teacher` authorization check. [#1065](https://github.com/geli-lms/geli/issues/1065)
- Fix `{get} /api/notification/` response leaks by introducing `INotificationView`, a reduced and safe variant of the `INotification` interface. [#1065](https://github.com/geli-lms/geli/issues/1065)
- Fix response leaks for all three _(now two)_ `NotificationSettingsController` routes by introducing `INotificationSettingsView`, a strongly reduced _(no own _id)_ and safe variant of the `INotificationSettings` interface. [#1072](https://github.com/geli-lms/geli/issues/1072)
- Secure `{get} /api/notification/` by using the `@CurrentUser` instead of allowing arbitrary id requests. [#1065](https://github.com/geli-lms/geli/issues/1065)
- Secure `{get} /api/notificationSettings/` by using the `@CurrentUser` instead of allowing arbitrary id requests. [#1072](https://github.com/geli-lms/geli/issues/1072)
- Secure `{put} /api/notificationSettings/` by using the `@CurrentUser` instead of allowing arbitrary id requests. [#1072](https://github.com/geli-lms/geli/issues/1072)
- Minimize `NotificationSettingsController` attack surface by severely simplifying its routes. [#1072](https://github.com/geli-lms/geli/issues/1072)

## [[0.8.3](https://github.com/geli-lms/geli/releases/tag/v0.8.3)] - 2018-11-29 - WS 18/19 🚀-Release
### Added
- Chat system access denial unit tests. [#989](https://github.com/geli-lms/geli/issues/989)
- `DuplicationController` access denial (`403`) unit tests. [#1016](https://github.com/geli-lms/geli/issues/1016)
- `ExportController` access denial (`403`) unit tests. [#1039](https://github.com/geli-lms/geli/issues/1039)
- `ExportController` not found (`404`) unit tests. [#1039](https://github.com/geli-lms/geli/issues/1039)
- `DuplicationController` not found (`404`) unit tests. [#1039](https://github.com/geli-lms/geli/issues/1039)
- `TestHelper` class for shared API unit test functionality. [#989](https://github.com/geli-lms/geli/issues/989) [#1016](https://github.com/geli-lms/geli/issues/1016)
- `extractSingleMongoId` variant of the `ExtractMongoId` utility function(s). [#989](https://github.com/geli-lms/geli/issues/989)
- Show message count for `UnitComponent` chat. [#933](https://github.com/geli-lms/geli/issues/993)
- Styles for free text units. [#867](https://github.com/geli-lms/geli/issues/867)
- Export PDF with styled free text units. [#997](https://github.com/geli-lms/geli/issues/997)
- Extend `ICourseView` with `userCanEditCourse` & `active` properties. [#924](https://github.com/geli-lms/geli/issues/924)
- Make `MongoDB` port configurable as `DB_PORT`. [#1034](https://github.com/geli-lms/geli/pull/1034)
- `IUserPrivileges`, `IUserEditPrivileges`, `ICourseUserPrivileges`, i.a. for the `checkPrivileges` methods. [#1039](https://github.com/geli-lms/geli/issues/1039)

### Changed
- Update `mongoose` to `5.2.x`. [#1004](https://github.com/geli-lms/geli/pull/1004)
- Update contributors list. [#1007](https://github.com/geli-lms/geli/issues/1007)
- Display only one notification per course update. [#914](https://github.com/geli-lms/geli/issues/914)
- Use `terser` instead of `uglify-js`. [#1018](https://github.com/geli-lms/geli/pull/1018)
- `ExtractMongoId` utility upgrades & streamlining. [#989](https://github.com/geli-lms/geli/issues/989) [#1016](https://github.com/geli-lms/geli/issues/1016) [#1039](https://github.com/geli-lms/geli/issues/1039)
- Switch project license to `Apache License, Version 2.0` instead of `GPL-3.0`. [#1033](https://github.com/geli-lms/geli/issues/1033)

### Removed
- PDF export with styled free text units. [#997](https://github.com/geli-lms/geli/issues/997)

### Fixed
- Notifications for invisible courses and lectures will no longer be created. [#877](https://github.com/geli-lms/geli/issues/877)
- EU-DSGVO: Exclusion of comments in the user chat data export. [#998](https://github.com/geli-lms/geli/issues/998)
- Nondeterministic chat system unit test authorization failures. [#989](https://github.com/geli-lms/geli/issues/989)
- Unnecessarily verbose `DuplicationController` route responses. [#1016](https://github.com/geli-lms/geli/issues/1016)
- Prepare `mongoose 5.3.x` update. [#1003](https://github.com/geli-lms/geli/issues/1003) [#1027](https://github.com/geli-lms/geli/pull/1027)
- `ExportController` missing 404 handling. [#1039](https://github.com/geli-lms/geli/issues/1039)
- `DuplicationController` missing 404 handling. [#1039](https://github.com/geli-lms/geli/issues/1039)
- Fix invalid translation key `hasBeenDeleted`. [#1032](https://github.com/geli-lms/geli/pull/1032)

### Security
- Fix multiple severe security issues of the chat system. [#989](https://github.com/geli-lms/geli/issues/989)
- Fix multiple security issues of the three `DuplicationController` routes. [#1016](https://github.com/geli-lms/geli/issues/1016)
- Fix missing `teacher` authorization checks in the `ExportController` `course`/`lecture`/`unit` routes. [#1039](https://github.com/geli-lms/geli/issues/1039)
- Update `node` to latest LTS (Long Term Support) version. [#1019](https://github.com/geli-lms/geli/issues/1019)

## [[0.8.2](https://github.com/geli-lms/geli/releases/tag/v0.8.2)] - 2018-11-08 - WS 18/19 🍪-Release
### Added
- My courses: Make title or teaser image clickable. [#904](https://github.com/geli-lms/geli/issues/904)
- EU-DSGVO: Export Chat User Data. [#862](https://github.com/geli-lms/geli/issues/862)

### Changed
- Minor `ConfigController` bugs and refactoring-flaws. [#899](https://github.com/geli-lms/geli/issues/899)
- Don't pin `@types/express` to a specific version. [#947](https://github.com/geli-lms/geli/pull/947)
- Switch to cookie-based JWT authentication. [#840](https://github.com/geli-lms/geli/issues/840) [#968](https://github.com/geli-lms/geli/issues/968)
- Prepare `typescript` 3.1 upgrade. [#967](https://github.com/geli-lms/geli/pull/967)
- Use `npm ci` instead `npm install` and cache `$HOME/.npm` instead of `node_modules`. [#972](https://github.com/geli-lms/geli/pull/972)
- Use travis build stages. [#962](https://github.com/geli-lms/geli/issues/962) [#1024](https://github.com/geli-lms/geli/pull/1024)

### Removed
- `@types/winston`. [#945](https://github.com/geli-lms/geli/pull/945)
- The now obsolete `'mediaToken'` and `JwtPipe` systems. [#840](https://github.com/geli-lms/geli/issues/840)
- Unused controller code. [#986](https://github.com/geli-lms/geli/issues/986)

### Fixed
- Deprecated `Messages.count` replace with `Message.countDocuments`. [#925](https://github.com/geli-lms/geli/issues/925)
- Deprecated `User.count` replace with `User.countDocuments`. [#934](https://github.com/geli-lms/geli/issues/934) 
- Redirect to initial URL after login. [#318](https://github.com/geli-lms/geli/issues/318)
- Error when clicking on notification. [#916](https://github.com/geli-lms/geli/issues/916)
- Admin couldn't change password of a student. [#975](https://github.com/geli-lms/geli/issues/975)

### Security
- Progress leak of invisible units and courses. [#735](https://github.com/geli-lms/geli/issues/735)
- Reduce XSS attack surface by switching from `localStorage` tokens to `HttpOnly`, strict `SameSite` cookie-based JWT authentication. [#840](https://github.com/geli-lms/geli/issues/840)

## [[0.8.1](https://github.com/geli-lms/geli/releases/tag/v0.8.1)] - 2018-10-31 - WS 18/19 Hotfix-Release
### Fixed
- People can enroll in courses again. [#942](https://github.com/geli-lms/geli/pull/942)

## [[0.8.0](https://github.com/geli-lms/geli/releases/tag/v0.8.0)] - 2018-10-29 - WS 18/19 Bugfix & Tweak-Release
### Added
- Cookie information banner. [#565](https://github.com/geli-lms/geli/pull/565)
- Course progress can now be exported as a CSV-file. [#766](https://github.com/geli-lms/geli/pull/766)
- More EN/DE translations. [#753](https://github.com/geli-lms/geli/issues/753)
- Use i18n for new course view. [#763](https://github.com/geli-lms/geli/pull/763)
- `FileIconService`. [#607](https://github.com/geli-lms/geli/issues/607)
- Legal notice and privacy declaration. [#768](https://github.com/geli-lms/geli/issues/768)
- More `NotificationController` tests. [#772](https://github.com/geli-lms/geli/pull/772)
- Anonymous forum. [#46](https://github.com/geli-lms/geli/issues/46) [#857](https://github.com/geli-lms/geli/issues/857)
- Unit-specific comments. [#761](https://github.com/geli-lms/geli/issues/761)
- Simple E2E test for login. [#795](https://github.com/geli-lms/geli/pull/795)
- Checkboxes for accepting our terms of use and privacy declarations while registering. [#778](https://github.com/geli-lms/geli/issues/778)
- PDF course content download functionality. [#720](https://github.com/geli-lms/geli/pull/720) [#913](https://github.com/geli-lms/geli/issues/913) [#923](https://github.com/geli-lms/geli/pull/923)
- User data deletion functionality for EU-GDPR compliance. [#775](https://github.com/geli-lms/geli/issues/775)
- Personal data export functionality for EU-GDPR compliance. [#805](https://github.com/geli-lms/geli/issues/805)
- Guided dialog for adding a whitelist. [#727](https://github.com/geli-lms/geli/issues/727) [#509](https://github.com/geli-lms/geli/issues/509)
- `JwtPipe` to easily append `'mediaToken'`s to file URLs. [#729](https://github.com/geli-lms/geli/issues/729)
- `FileComponent` to flexibly display a single file e.g. in a new tab. [#729](https://github.com/geli-lms/geli/issues/729)
- More `DownloadController` unit tests, including a new `DeleteCache` `admin`-only API. [#729](https://github.com/geli-lms/geli/issues/729)
- `'Misc.'` front-end admin sub-component with cache-clearing control re. the `DeleteCache` API. [#729](https://github.com/geli-lms/geli/issues/729)
- E2E test for invalid email & password input. [#825](https://github.com/geli-lms/geli/pull/825)
- Search function for available courses. [#723](https://github.com/geli-lms/geli/issues/723)
- Form validation before submit when creating a new course. [#724](https://github.com/geli-lms/geli/pull/724)
- ID validation of the `CourseController` `/api/courses/:id` route. [#724](https://github.com/geli-lms/geli/pull/724)
- Possibility to add files directly in the file unit. [#728](https://github.com/geli-lms/geli/issues/728)
- Execute npm rebuild in docker. [#855](https://github.com/geli-lms/geli/pull/855)
- Sentry reporting for missing translations. [#858](https://github.com/geli-lms/geli/issues/858)
- Migration for `visible` field. [#890](https://github.com/geli-lms/geli/pull/890)
- Migration for `fileUnitType` field. [#907](https://github.com/geli-lms/geli/pull/907)
- Fixed error on clicking on notification. [#916](https://github.com/geli-lms/geli/issues/916)
- A collapse/expand button to units. [#868](https://github.com/geli-lms/geli/issues/868)


### Changed
- Minor fixes and adaptations and merge-failure fixes. [#785](https://github.com/geli-lms/geli/issues/785)
- Rework existing translations. [#753](https://github.com/geli-lms/geli/issues/753) [#906](https://github.com/geli-lms/geli/pull/906)
- Migrate `MatSnackBar` to `SnackBarService`. [#724](https://github.com/geli-lms/geli/pull/724) [#730](https://github.com/geli-lms/geli/pull/730)
- Reload user list after deleting an account. [#724](https://github.com/geli-lms/geli/pull/724)
- `getNotificationSettings` does not create new notification settings. [#731](https://github.com/geli-lms/geli/issues/731)
- Refactor save mechanism of unit edit form. [#532](https://github.com/geli-lms/geli/issues/532)
- Move the 'create course' button into a `MatDialog`. [#725](https://github.com/geli-lms/geli/issues/725)
- Update `bcrypt` dependency. [#774](https://github.com/geli-lms/geli/pull/774)
- Use `path`-module to extract extensions from filenames. [#773](https://github.com/geli-lms/geli/pull/773)
- Update validator dependency. [#791](https://github.com/geli-lms/geli/pull/791)
- Append `'mediaToken'` to various file URLs via `JwtPipe`. [#729](https://github.com/geli-lms/geli/issues/729)
- Move all URL etc. from `utetrapp/geli` and `h-da/geli` to current repo `geli-lms/geli`. [#849](https://github.com/geli-lms/geli/pull/849)
- Adjust `nginx` config in web-frontend for `ws-chat`. [#839](https://github.com/geli-lms/geli/issues/839)
- Update insecure dependencies. [#816](https://github.com/geli-lms/geli/issues/816)
- Update frontend to `Angular 6`. [#716](https://github.com/geli-lms/geli/pull/766)
- Update `Node.js` version to `10.8.0`. [#821](https://github.com/geli-lms/geli/pull/821)
- Update `README.md` with latest information. [#845](https://github.com/geli-lms/geli/pull/845)
- Exit build when no change to `CHANGELOG.md`. [#880](https://github.com/geli-lms/geli/pull/880)
- Use deploy token to push geli-docs. [#851](https://github.com/geli-lms/geli/issues/851) [#900](https://github.com/geli-lms/geli/pull/900) [#902](https://github.com/geli-lms/geli/pull/902)
- Responsiveness of course overview. [#837](https://github.com/geli-lms/geli/issues/837)
- Adjust `CHANGELOG.md` for next release. [#879](https://github.com/geli-lms/geli/pull/879) [#928](https://github.com/geli-lms/geli/pull/928)
- Exclude pull requests from dependabot from changelog check. [#854](https://github.com/geli-lms/geli/pull/854)

### Removed
- `isCourseTeacherOrAdmin` and `isMemberOfCourse` from `UserService`. [#731](https://github.com/geli-lms/geli/issues/731)
- `fs-extra` dependency. [#780](https://github.com/geli-lms/geli/pull/780)
- `winston` dependency. [#806](https://github.com/geli-lms/geli/pull/806)

### Fixed
- Unit export. [#42](https://github.com/geli-lms/geli/issues/42)
- Notification settings. [#731](https://github.com/geli-lms/geli/issues/731)
- API-doc. [#737](https://github.com/geli-lms/geli/issues/737)
- `tutor` role is now disabled. [#710](https://github.com/geli-lms/geli/issues/710)
- Notifications on hidden units. [#733](https://github.com/geli-lms/geli/issues/733)
- User input validation for notication settings API. [#771](https://github.com/geli-lms/geli/issues/771)
- Identification only via matriculation number. [#685](https://github.com/geli-lms/geli/issues/685)
- Typo in `UserProfileDialog` component. [#782](https://github.com/geli-lms/geli/pull/782)
- Missing capitalization typo for `common.users` EN-translation. [#729](https://github.com/geli-lms/geli/issues/729)
- Broken badge links after repository migration. [#783](https://github.com/geli-lms/geli/pull/783) [#892](https://github.com/geli-lms/geli/pull/892)
- Invalid response for dependency. [#787](https://github.com/geli-lms/geli/pull/787)
- Travis usages after `Angular 6` update. [#789](https://github.com/geli-lms/geli/pull/789)
- Build with source maps. [#797](https://github.com/geli-lms/geli/pull/797)
- Missing import for `RxJS` operators. [#808](https://github.com/geli-lms/geli/issues/808)
- Wrong image URL in profile export. [#811](https://github.com/geli-lms/geli/issues/811)
- `picture.path` backslash issue / regression. [#729](https://github.com/geli-lms/geli/issues/729)
- Remaining hard-coded `'upload'` strings in the API, now replaced with `config.uploadFolder`. [#729](https://github.com/geli-lms/geli/issues/729)
- Missing `@UseBefore` middleware in `MediaController`. [#729](https://github.com/geli-lms/geli/issues/729)
- Make E2E login test more stable. [#823](https://github.com/geli-lms/geli/pull/823) [#824](https://github.com/geli-lms/geli/pull/824)
- `sentry.sh` build warning regarding invalid `-eq` usage. [#830](https://github.com/geli-lms/geli/pull/830) [#832](https://github.com/geli-lms/geli/pull/832)
- PDF download fix if text is empty + added path to local `PhantomJS`. [#833](https://github.com/geli-lms/geli/issues/833)
- Wrong reset password translation. [#836](https://github.com/geli-lms/geli/issues/836)
- Various flawed code kata translations. [#886](https://github.com/geli-lms/geli/issues/886)
- Fix migrations for adding chatrooms to course and unit. [#888](https://github.com/geli-lms/geli/issues/888)
- Fix maximum width of main content area. [#893](https://github.com/geli-lms/geli/issues/893)
- Migrations for adding chatrooms to course and unit. [#888](https://github.com/geli-lms/geli/issues/888) [#903](https://github.com/geli-lms/geli/pull/903) [#905](https://github.com/geli-lms/geli/pull/905)
- `AuthController` `addWhitelistedUserToCourses` broken condition & typos. [#895](https://github.com/geli-lms/geli/issues/895)
- `ChatRoomController` internal data leak. [#897](https://github.com/geli-lms/geli/issues/897)
- Error on clicking on notification. [#916](https://github.com/geli-lms/geli/issues/916)
- Deprecated warning on startup. [#920](https://github.com/geli-lms/geli/pull/920)

### Security
- Secure the static `'uploads'` route by introducing a special `'mediaToken'` with new JWT strategy & middleware. [#729](https://github.com/geli-lms/geli/issues/729)
- Secure `DownloadController` → `getArchivedFile` → `id` input usage. [#729](https://github.com/geli-lms/geli/issues/729)
- _(Scrapped experiment of a `@Controller`-based replacement for the static `'uploads'` route: `UploadsController`. [#729](https://github.com/geli-lms/geli/issues/729))_

## [[0.7.0](https://github.com/geli-lms/geli/releases/tag/v0.7.0)] - 2018-05-05 - SS 18 intermediate Release
### Added
- A dedicated `FileViewComponent` and restyled the course section. [#599](https://github.com/geli-lms/geli/issues/599)
- The possibility to sort all courses alphabetically. [#567](https://github.com/geli-lms/geli/issues/567)
- A box for information on the homescreen. [#216](https://github.com/geli-lms/geli/issues/216)
- An account activation resend feature. [#601](https://github.com/geli-lms/geli/issues/601)
- `SnackBarService` as wrapper for `MatSnackBar`. [#574](https://github.com/geli-lms/geli/issues/574)
- New course & user API unit tests. [#654](https://github.com/geli-lms/geli/issues/654) [#691](https://github.com/geli-lms/geli/issues/691)
- Details of courseAdmin and teacher to course detail view. on click profiles are shown.[#598](https://github.com/geli-lms/geli/issues/598)
- Small auto linting scripts to `package.json`. [#688](https://github.com/geli-lms/geli/issues/688)
- Changed size of drop down arrows for better usability. [#686](https://github.com/geli-lms/geli/issues/686)
- New contributors. [#624](https://github.com/geli-lms/geli/issues/624)
- The date and the teacher under each unit. [#582](https://github.com/geli-lms/geli/issues/582)
- E-Mail validation to reset password. [#597](https://github.com/geli-lms/geli/issues/597)
- Language code to header. [#554](https://github.com/geli-lms/geli/issues/554)
- Icon for access key. [#547](https://github.com/geli-lms/geli/issues/574)
- Unit visibility toggle. [#582](https://github.com/geli-lms/geli/issues/582)
- Bootstrap grid system. [#613](https://github.com/geli-lms/geli/issues/613)
- Changeable picture to course. [#702](https://github.com/geli-lms/geli/issues/702)
- A responsive image service. [#546](https://github.com/geli-lms/geli/issues/546)

### Changed
- Refactor or slightly altered various course & user related APIs. [#654](https://github.com/geli-lms/geli/issues/654) [#691](https://github.com/geli-lms/geli/issues/691)
- Remove first name from resend activation feature and changed button positioning. [#711](https://github.com/geli-lms/geli/issues/711)
- Refactor register and resend activation to use geli email validator with top level domain check. [#713](https://github.com/geli-lms/geli/issues/713)
- Refactor the `unitCreator` with a `forSafe` user object. [#717](https://github.com/geli-lms/geli/pull/717)
- Change the text in download course[#718](https://github.com/geli-lms/geli/pull/718)
- Refactor register and resend activation to use geli email validator with top level domain check. [#713](https://github.com/geli-lms/geli/issues/713)
- Refactor the uploadform. [#693](https://github.com/geli-lms/geli/issues/693)

### Fixed
- Route `/users/roles`. [#204](https://github.com/geli-lms/geli/issues/204)
- Profile picture will be deleted after changing any other profile data. [#504](https://github.com/geli-lms/geli/issues/504)
- Some UI issues in create code kata unit. [#543](https://github.com/geli-lms/geli/issues/543)
- Reading wrong error message across the whole application. [#572](https://github.com/geli-lms/geli/issues/572)
- `admin`s can change their own role. [#606](https://github.com/geli-lms/geli/issues/606)
- A typo in admin panel. [#533](https://github.com/geli-lms/geli/issues/533)
- `admin` cannot delete any courses. [#647](https://github.com/geli-lms/geli/issues/647)
- Some issues with download a course. [#659](https://github.com/geli-lms/geli/issues/659)
- An issue with deleting a course and the notification was not triggered. [#642](https://github.com/geli-lms/geli/issues/543)
- Course progress mechanism. [#593](https://github.com/geli-lms/geli/issues/593)
- Wasteful course data usage via specialized course model interfaces. [#654](https://github.com/geli-lms/geli/issues/654)
- Broken documentation link. [#583](https://github.com/geli-lms/geli/issues/583)
- Limit the first and last name to 64 characters in the registration- and edit page. [#585](https://github.com/geli-lms/geli/issues/585)
- A correct email validator to the `user-edit` and `register` components. [#564](https://github.com/geli-lms/geli/issues/564)
- Upload of profile pictures now prevents files with forbidden extensions. [#581](https://github.com/geli-lms/geli/issues/581)
- Empty course downloads. [#659](https://github.com/geli-lms/geli/issues/659)
- Videos in the course now get sized equally and can't grow too big in mobile views. [#534](https://github.com/geli-lms/geli/issues/534)
- Missing background on the password reset page. [#673](https://github.com/geli-lms/geli/issues/673)
- Notification icon spacing in the navbar for students. [#696](https://github.com/geli-lms/geli/issues/696)
- Repair Angular CLI code generation. [#701](https://github.com/geli-lms/geli/pull/701)
- `tsconfig.spec.ts` for `ng test`. [#656](https://github.com/geli-lms/geli/pull/656)
- `.travis.yml`. [#706](https://github.com/geli-lms/geli/pull/706)
- Wording of progress display on profile page. [#715](https://github.com/geli-lms/geli/issues/715)
- Form validator in create task. [#579](https://github.com/geli-lms/geli/issues/579)
- `mongoose` pre hook usage. [#680](https://github.com/geli-lms/geli/issues/680) [#677](https://github.com/geli-lms/geli/issues/677)
- Broken code kata validation. [#834](https://github.com/geli-lms/geli/issues/834)

### Security
- Fix numerous severe user related security issues. [#691](https://github.com/geli-lms/geli/issues/691) [#709](https://github.com/geli-lms/geli/pull/709)
- Fix multiple severe course related security issues. [#594](https://github.com/geli-lms/geli/issues/594) [#653](https://github.com/geli-lms/geli/issues/653) [#691](https://github.com/geli-lms/geli/issues/691)
- Update the dependencies for security. [#661](https://github.com/geli-lms/geli/issues/661)

## [[0.6.0](https://github.com/geli-lms/geli/releases/tag/v0.6.0)] - 2018-03-31 - Introduces MediaManager and some minor changes
### Added
- MediaManager for file management in courses


## [[0.5.0](https://github.com/geli-lms/geli/releases/tag/v0.5.0)] - 2018-03-24 - WS 17/18 intermediate Release
### Added
- selective download of the course
- progress dashboard for teacher
- translateable frontend with i18n
- notification system added
- introduces new error message system
- dark theme option
- introducing an api documentation
- courses are ordered by last visit
- user password edit
- adds imprint


## [[0.4.0](https://github.com/geli-lms/geli/releases/tag/v0.4.0)] - 2017-12-04 - WS 17/18 Second feature release
### Added
- Responsivness improved
- leave course function
- delete course
- import/export course function
- free text mail to students
- dragging content between lectures
- consistent save and abort btns in units
- progress component
- duplication of lectures
- randomize tasks after validation


## [[0.3.1](https://github.com/geli-lms/geli/releases/tag/v0.3.1)] - 2017-11-05 - Dynamic db name update
### Added
- The possibility to use a other database name then 'test'


## [[0.3.0](https://github.com/geli-lms/geli/releases/tag/v0.3.0)] - 2017-11-02
### Added
- a lot of major bugfixes and optimizations


## [[0.2.2](https://github.com/geli-lms/geli/releases/tag/v0.2.2)] - 2017-10-19 - Security improvements
### Added 
- security for free courses


## [[0.2.1](https://github.com/geli-lms/geli/releases/tag/v0.2.1)] - 2017-10-03 - First Live-Ready release
### Added
- first live functionality


## [[0.2.0](https://github.com/geli-lms/geli/releases/tag/v0.2.0)] - 2017-06-29 - Almost production ready
### Added
- Many new feature for production


## [[0.1.0](https://github.com/geli-lms/geli/releases/tag/v0.1.0)] - 2017-05-11 - Basics implemented
### Added
- Many basic implementations of ground functionality
