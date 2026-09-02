<script setup>
    defineProps({
    certificate: {
        type: Object,
        required: true
    }
    })
</script>

<template>
  <article class="certificate-card">

    <!-- Certificate Preview -->
    <div class="certificate-image-wrapper">
      <img
        :src="certificate.image"
        :alt="`${certificate.title} certificate`"
        class="certificate-image"
      />
    </div>

    <!-- Certificate Information -->
    <div class="certificate-content">

      <div class="certificate-meta">
        <span>{{ certificate.issuer }}</span>
        <span>{{ certificate.date }}</span>
      </div>

      <h2 class="certificate-title">
        {{ certificate.title }}
      </h2>

      <p class="certificate-description">
        {{ certificate.description }}
      </p>

      <a
        v-if="certificate.link"
        :href="certificate.link"
        target="_blank"
        rel="noopener"
        class="certificate-button"
      >
        View Certificate
      </a>

      <a
        v-else
        :href="certificate.image"
        target="_blank"
        rel="noopener"
        class="certificate-button"
      >
        View Certificate
      </a>

    </div>

  </article>
</template>

<style scoped>
.certificate-card {
  height: 100%;
  display: flex;
  flex-direction: column;

  background-color: var(--forest-deep);
  border: 1px solid rgba(244, 241, 220, 0.15);
  border-radius: var(--radius-card);

  overflow: hidden;

  box-shadow: var(--shadow-soft);

  transition:
    transform 0.25s ease,
    border-color 0.25s ease;
}

.certificate-card:hover {
  transform: translateY(-5px);
  border-color: var(--brass);
}

/* Certificate image */

.certificate-image-wrapper {
  width: 100%;
  aspect-ratio: 16 / 10;

  background-color: var(--parchment-soft);

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
}

.certificate-image {
  width: 100%;
  height: 100%;

  object-fit: contain;

  padding: 1rem;

  transition: transform 0.3s ease;
}

.certificate-card:hover .certificate-image {
  transform: scale(1.02);
}

/* Content */

.certificate-content {
  display: flex;
  flex-direction: column;

  flex-grow: 1;

  padding: 1.5rem;
}

.certificate-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  margin-bottom: 0.75rem;

  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  color: var(--brass-light);
}

.certificate-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  line-height: 1.15;

  color: var(--cream-text);

  margin-bottom: 1rem;
}

.certificate-description {
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.7;

  color: rgba(244, 241, 220, 0.8);

  margin-bottom: 1.5rem;
}

/* Button */

.certificate-button {
  align-self: flex-start;

  margin-top: auto;

  padding: 0.6rem 1.25rem;

  border: 1px solid var(--brass);
  border-radius: var(--radius-pill);

  color: var(--brass-light);

  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  text-decoration: none;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.certificate-button:hover {
  background-color: var(--brass);
  color: var(--forest-deep);
}

@media (max-width: 575.98px) {

  .certificate-content {
    padding: 1.25rem;
  }

  .certificate-title {
    font-size: 1.45rem;
  }

  .certificate-description {
    font-size: 0.85rem;
  }

}
</style>