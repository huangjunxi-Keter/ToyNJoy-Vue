<template>
  <RouterView />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0 !important;
}

.page-content {
  border: 0;
  min-height: 100%;
}

.pagination {
  padding-top: 20px;
}
</style>
