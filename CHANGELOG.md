## [1.4.10](https://github.com/ymmooot/nuxt-jsonld/compare/v1.4.9...v1.4.10) (2020-06-15)


### Bug Fixes

* return value types of jsonld ([4ceee10](https://github.com/ymmooot/nuxt-jsonld/commit/4ceee10123ea06987762e4ad213473d18c562fda))

## [1.4.9](https://github.com/ymmooot/nuxt-jsonld/compare/v1.4.8...v1.4.9) (2020-04-24)


### Bug Fixes

* fix bug that head method can not access data of 'this' context ([c94e297](https://github.com/ymmooot/nuxt-jsonld/commit/c94e29773cf3892d5f6abcf3fddcd513e03a275a)), closes [#347](https://github.com/ymmooot/nuxt-jsonld/issues/347)

## [1.4.6](https://github.com/ymmooot/nuxt-jsonld/compare/v1.4.5...v1.4.6) (2020-04-21)


### Bug Fixes

* [#336](https://github.com/ymmooot/nuxt-jsonld/issues/336) ([cc3c77c](https://github.com/ymmooot/nuxt-jsonld/commit/cc3c77c5b1bca57d511d522f54845707001f0b33))

## [1.4.5](https://github.com/ymmooot/nuxt-jsonld/compare/v1.4.4...v1.4.5) (2019-12-22)


### Bug Fixes

* do not use hash to make hid ([e743b99](https://github.com/ymmooot/nuxt-jsonld/commit/e743b994db9e0e5092b846f35230fa574a615f4b))

## [1.4.4](https://github.com/ymmooot/nuxt-jsonld/compare/v1.4.3...v1.4.4) (2019-09-23)


### Bug Fixes

* only inject metainfo into correct components ([5c08259](https://github.com/ymmooot/nuxt-jsonld/commit/5c08259))
* removed dependency and hashing, removed spread in reduce ([5880435](https://github.com/ymmooot/nuxt-jsonld/commit/5880435))
* restored hash and associated tests ([e79db81](https://github.com/ymmooot/nuxt-jsonld/commit/e79db81))


### Performance Improvements

* refactored head to use computed ([d7f7785](https://github.com/ymmooot/nuxt-jsonld/commit/d7f7785))

## [1.4.3](https://github.com/ymmooot/nuxt-jsonld/compare/v1.4.2...v1.4.3) (2019-09-06)


### Bug Fixes

* fix merge strategy bug ([4b190ca](https://github.com/ymmooot/nuxt-jsonld/commit/4b190ca)), closes [#112](https://github.com/ymmooot/nuxt-jsonld/issues/112)

## [1.4.2](https://github.com/ymmooot/nuxt-jsonld/compare/v1.4.1...v1.4.2) (2019-08-20)


### Bug Fixes

* bug that jsonlds are sanitized with nuxt2.9 ([cb976f0](https://github.com/ymmooot/nuxt-jsonld/commit/cb976f0))

## [1.4.1](https://github.com/ymmooot/nuxt-jsonld/compare/v1.4.0...v1.4.1) (2019-07-03)


### Bug Fixes

* not use counter for hid not to change hid every request ([ae1cccb](https://github.com/ymmooot/nuxt-jsonld/commit/ae1cccb)), closes [#58](https://github.com/ymmooot/nuxt-jsonld/issues/58)

# [1.4.0](https://github.com/ymmooot/nuxt-jsonld/compare/v1.3.4...v1.4.0) (2019-06-07)


### Features

* 🎸 not make jsonld tags when jsonld method returns null ([c4c8b0d](https://github.com/ymmooot/nuxt-jsonld/commit/c4c8b0d)), closes [#23](https://github.com/ymmooot/nuxt-jsonld/issues/23)

## [1.3.4](https://github.com/ymmooot/nuxt-jsonld/compare/v1.3.3...v1.3.4) (2019-05-31)


### Bug Fixes

* return type ([62a8d59](https://github.com/ymmooot/nuxt-jsonld/commit/62a8d59))

## [1.3.3](https://github.com/ymmooot/nuxt-jsonld/compare/v1.3.2...v1.3.3) (2019-05-31)


### Bug Fixes

* make type for target and don't use "any" ([57cd665](https://github.com/ymmooot/nuxt-jsonld/commit/57cd665))

## [1.3.2](https://github.com/ymmooot/nuxt-jsonld/compare/v1.3.1...v1.3.2) (2019-05-31)


### Bug Fixes

* fix bug of type ([9e7c807](https://github.com/ymmooot/nuxt-jsonld/commit/9e7c807))

## [1.3.1](https://github.com/ymmooot/nuxt-jsonld/compare/v1.3.0...v1.3.1) (2019-05-31)


### Bug Fixes

* fix to export types ([2020749](https://github.com/ymmooot/nuxt-jsonld/commit/2020749))

# [1.3.0](https://github.com/ymmooot/nuxt-jsonld/compare/v1.2.0...v1.3.0) (2019-05-31)


### Features

* **typescript:** improve typescript support ([830957f](https://github.com/ymmooot/nuxt-jsonld/commit/830957f)), closes [#18](https://github.com/ymmooot/nuxt-jsonld/issues/18)

# [1.2.0](https://github.com/ymmooot/nuxt-jsonld/compare/v1.1.0...v1.2.0) (2019-05-31)


### Features

* add types and decorator for typescript ([bdddcf3](https://github.com/ymmooot/nuxt-jsonld/commit/bdddcf3)), closes [#16](https://github.com/ymmooot/nuxt-jsonld/issues/16)

# [1.1.0](https://github.com/ymmooot/nuxt-jsonld/compare/v1.0.0...v1.1.0) (2019-05-13)


### Features

* Insert newlines at the beginning and end of the stringified json when a space option is not 0 ([337f5f9](https://github.com/ymmooot/nuxt-jsonld/commit/337f5f9))

# [1.0.0](https://github.com/ymmooot/nuxt-jsonld/compare/v0.0.5...v1.0.0) (2019-05-13)


### Features

* **nuxt-jsonld:** customizing indentation implementation ([fe6da56](https://github.com/ymmooot/nuxt-jsonld/commit/fe6da56)), closes [#7](https://github.com/ymmooot/nuxt-jsonld/issues/7)


### BREAKING CHANGES

* **nuxt-jsonld:** deprecate the static `mixin` and here comes `createMixin`, the mixin constructor, as the new public API
