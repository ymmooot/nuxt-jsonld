<template>
  <nav>
    <ol>
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index">
        <a :href="breadcrumb.url" target="_blank">{{ breadcrumb.text }}</a>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
  jsonld() {
    const items = this.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.text,
      },
    }));

    return {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
  },
};
</script>
