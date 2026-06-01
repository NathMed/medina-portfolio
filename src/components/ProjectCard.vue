<script setup>
	
	import {defineProps} from 'vue';

	defineProps({
		project:Object
	})

</script>

<template>
  <div class="project col-12 col-sm-10 col-lg-3 text-lg-center mx-auto mt-4 mt-lg-5 p-4 shadow-lg rounded">
    <img :src="project.image" class="img-fluid">
    <h2 class="fw-bold">{{ project.title }}</h2>
    <p>{{ project.description }}</p>
  </div>
</template>

<style scoped>
	
</style>