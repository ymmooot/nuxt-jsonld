<template>
  <p>sample</p>
</template>

<script lang="ts" setup>
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Thing',
  name: 'test',
});
</script>
