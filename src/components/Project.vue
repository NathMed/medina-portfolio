<script setup>
	
	import projects from '../data/projects.json'
	import ProjectCard from './ProjectCard.vue'
	import {computed} from 'vue';

	const rowSize = 3;
	const rowProjects = computed(() => {
		const row = [];

		for (let i = 0; i < projects.length; i += rowSize) {
			row.push(projects.slice(i, i + rowSize))
		}
		return row;
	})

</script>

<template>
	<!-- My Project -->

	<div class="container-fluid">
	  <div id="projects" class="row justify-content-center pb-5">

	    <h1 class="col-6 my-5 py-3 bg-dark text-center rounded-pill">My Projects</h1>

        <div
        	v-for="(group, index) in rowProjects"
        	:key="index"
        	class="row my-5 justify-content-center"
        >
        	<ProjectCard 
        		v-for="project in group"
        		:key="project.id"
        		:project="project"
        	/>
        	
        </div>
	  
	  </div>
	</div>

	<!-- End of My Project -->
</template>

<style scoped>
	
</style>