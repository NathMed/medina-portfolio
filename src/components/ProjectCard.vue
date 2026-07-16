<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="project-card h-100">

    <div class="card-image-wrap">
      <img :src="project.image" :alt="project.title" class="card-image" />
    </div>

    <div class="card-body">
      <h3 class="card-title">{{ project.title }}</h3>
      <p class="card-description">{{ project.description }}</p>

      <div class="card-tags">
        <span v-for="tool in project.tools" :key="tool" class="card-tag">
          {{ tool }}
        </span>
      </div>

      <div class="card-links">
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener"
          class="card-link card-link-primary"
        >
          Live demo
        </a>
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener"
          class="card-link card-link-secondary"
        >
          Code
        </a>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import '../assets/main.css';

.project-card {
  display: flex;
  flex-direction: column;
  background: var(--forest-mid);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* Replaces the old bare `.project:hover { transform: scale(1.1) }`.
   Scaling a whole card up 10% tends to make it overlap its neighbors
   and look janky — a smaller lift + shadow reads as "hover feedback"
   without breaking the grid. */
.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
}

@media (prefers-reduced-motion: reduce) {
  .project-card:hover { transform: none; }
}

.card-image-wrap {
  width: 100%;
  aspect-ratio: 16 / 9; /* consistent shape regardless of each image's real size */
  overflow: hidden;
  background: var(--forest-deep);
}

.card-image {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--cream-text);
  margin-bottom: 0.5rem;
}

.card-description {
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(244, 241, 220, 0.85);
  margin-bottom: 1rem;
  flex-grow: 1; /* pushes tags/links to the bottom so cards in the same row line up */
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.card-tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: var(--brass-light);
  border: 1px solid rgba(201, 162, 39, 0.4);
  border-radius: 4px;
  padding: 0.15rem 0.45rem;
}

.card-links {
  display: flex;
  gap: 0.75rem;
}

.card-link {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-pill);
  transition: transform 0.2s ease;
}

.card-link-primary {
  background: var(--brass);
  color: var(--forest-deep);
}

.card-link-secondary {
  background: transparent;
  color: var(--cream-text);
  border: 1px solid rgba(244, 241, 220, 0.4);
}

.card-link:hover {
  transform: scale(1.05);
}

@media (prefers-reduced-motion: reduce) {
  .card-link:hover { transform: none; }
}
</style>