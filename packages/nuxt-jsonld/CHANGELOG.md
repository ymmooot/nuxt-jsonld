# Changelog

## [3.0.0](https://github.com/ymmooot/nuxt-jsonld/compare/v2.3.1...v3.0.0) (2026-10-08)


### ⚠ BREAKING CHANGES

* the Options API is disabled by default. Set `optionsAPI: true` to keep using the `jsonld` component option. The `disableOptionsAPI` option is removed.
* the module is disabled on Nuxt 3.

### Features

* make the Options API opt-in with `optionsAPI` ([1d119ea](https://github.com/ymmooot/nuxt-jsonld/commit/1d119ea6cbd05d1df30d258f4b076ab2c4f59fd0))
* require Nuxt 4 ([f332548](https://github.com/ymmooot/nuxt-jsonld/commit/f33254833533916a7b11c0ad23cb3b77b835bee8))

## [2.3.1](https://github.com/ymmooot/nuxt-jsonld/compare/v2.3.0...v2.3.1) (2026-10-07)


### Bug Fixes

* import useHead from #imports instead of @unhead/vue ([#1506](https://github.com/ymmooot/nuxt-jsonld/issues/1506)) ([83e3d70](https://github.com/ymmooot/nuxt-jsonld/commit/83e3d70031385b57acbafccbf63b6b6baafc1aae))

## [2.3.0](https://github.com/ymmooot/nuxt-jsonld/compare/v2.2.1...v2.3.0) (2026-09-11)


### Features

* update schema-dts to v2 (Schema.org v30) ([0043041](https://github.com/ymmooot/nuxt-jsonld/commit/0043041db575ee4b9dcb77f04dbfdad2d42b0d7d))

## [2.2.1](https://github.com/ymmooot/nuxt-jsonld/compare/v2.2.0...v2.2.1) (2025-06-12)


### Bug Fixes

* trigger release ([6539b4a](https://github.com/ymmooot/nuxt-jsonld/commit/6539b4a4e3d6a04e21f1b8254f9b8f1404794a8e))

## [2.2.0](https://github.com/ymmooot/nuxt-jsonld/compare/v2.1.1...v2.2.0) (2025-06-11)

### Bug Fixes

* augment `vue` rather than `@vue/runtime-core` ([ca43314](https://github.com/ymmooot/nuxt-jsonld/commit/ca433146b3b86095c7c3c55be8c49157223af5f4))
* indicate compatibility with new v4 major ([8cc9c67](https://github.com/ymmooot/nuxt-jsonld/commit/8cc9c67dd729cf9b663fcc3e134cfdb7661c3335))
