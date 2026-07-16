<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();
</script>

<template>
  <!--
    FIX: your original markup had a <nav> nested INSIDE another <nav>.
    Nested <nav> elements confuse Bootstrap's collapse/toggle JS (it can
    grab the wrong element) and confuse screen readers (two "navigation"
    landmarks stacked on top of each other). This version uses exactly
    ONE <nav>, with the brand mark and links as plain children of it.
  -->
  <nav class="navbar navbar-expand-lg fixed-top" id="site-nav">
    <div class="container d-flex align-items-center justify-content-between">

      <!-- Brand mark: logo + name -->
      <a class="navbar-brand d-flex align-items-center gap-2" href="/">
        <img
          src="/images/logo.png"
          alt="Nathaniel Medina logo"
          width="36"
          height="36"
          class="rounded-circle"
        />
        <span class="brand-name">Nathaniel Medina</span>
      </a>

      <!-- Mobile hamburger toggle -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24" height="24" style="display: block;">
    <path stroke="#0b4d3e" stroke-width="2.5" stroke-linecap="round" d="M4 7h22M4 15h22M4 23h22"/>
  </svg>
      </button>

      <!-- Collapsible link list (collapses into the hamburger menu on mobile) -->
      <div class="collapse navbar-collapse flex-grow-0" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto gap-lg-4 text-center">

            <router-link
                :to="{ path: '/' }"
                class="nav-link">Home
            </router-link>

            <router-link
                :to="{ path: '/projects' }"
                class="nav-link">Projects
            </router-link>

            <router-link
                :to="{ path: '/contact' }"
                class="nav-link">Contact
            </router-link>

        </div>
      </div>

    </div>
  </nav>
</template>

<style scoped>
.navbar-toggler {
  border: 1px solid var(--forest-deep) !important;
  padding: 0.25rem 0.5rem;
}

#site-nav {
  background: var(--parchment);
  /* Thin bottom border instead of a hard shadow — reads as "card edge",
     not "floating panel", which fits the flatter parchment aesthetic. */
  border-bottom: 1px solid rgba(11, 77, 62, 0.15);
  padding: 0.6rem 0;
}

.brand-name {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--forest-deep);
  letter-spacing: 0.02em;
}

/* Nav links: mono font, uppercase, wide letter-spacing.
   This is the one place we borrow a "code label" feel for the nav —
   it reads as intentional rather than decorative because it's used
   consistently for every link, not just one. */
.nav-link {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--forest-deep) !important;
  padding: 0.5rem 0.75rem !important;
  position: relative;
}

/* Underline that grows in on hover/active instead of a plain color swap —
   small motion detail, costs nothing, reads as more considered. */
.nav-link::after {
  content: '';
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0.2rem;
  height: 2px;
  background: var(--brass);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

/* Respect users who've asked their OS to reduce motion */
@media (prefers-reduced-motion: reduce) {
  .nav-link::after {
    transition: none;
  }
}
</style>