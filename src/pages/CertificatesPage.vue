<script setup>
import certificates from '../data/certificates.json'
import CertificateCard from '../components/CertificateCard.vue'
import { computed } from 'vue'

const sortedCertificates = computed(() => {
  return [...certificates].sort((a, b) => b.id - a.id)
})
</script>

<template>
  <section id="certificates">
    <div class="container">

      <!-- Heading -->
      <div class="text-center section-heading">
        <span class="eyebrow">
          Credentials
        </span>

        <h1 class="section-title">
          My Certificates
        </h1>

        <p class="section-description">
          A collection of certifications and completed training
          that support my development journey as a web developer.
        </p>
      </div>


      <!-- Certificate Grid -->
        <div class="row g-4 justify-content-center">
            <div
                v-for="certificate in sortedCertificates"
                :key="certificate.id"
                class="col-12 col-md-6"
            >
                <CertificateCard
                :certificate="certificate"
                />
            </div>
        </div>

    </div>

  </section>
</template>

<style scoped>
#certificates {
  background-color: var(--forest-mid);
  padding: 5rem 0;
}

/* Heading */
.section-heading {
  margin-bottom: 3rem;
}

.eyebrow {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--brass-light);
  margin-bottom: 0.75rem;
}

.section-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 2.75rem);
  color: var(--cream-text);
  margin: 0;
}

.section-description {
  max-width: 650px;
  margin: 1rem auto 0;
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(244, 241, 220, 0.75);
}


/* Mobile */
@media (max-width: 575.98px) {
  #certificates {
    padding: 3.5rem 1rem;
  }

  .section-heading {
    margin-bottom: 2rem;
  }
}

</style>