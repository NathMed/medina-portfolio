<script setup>
// Static content for now. If you want this to be reusable/editable later,
// the natural next step is to pull these strings into props or a
// small `content.js` file — but for a one-person portfolio, hardcoding
// here is perfectly fine and keeps things simple to read.
</script>

<template>
  <section id="landing">
    <div class="container">
      <div class="row align-items-center hero-row">

        <!-- LEFT: text column -->
        <div class="col-12 col-lg-7 text-center text-lg-start order-2 order-lg-1">

          <!-- Signature element: availability badge.
               This is the one "personality" detail in the whole hero —
               a bordered mono pill with a small pulsing dot, instead of
               a plain line of text. Everything else around it stays quiet. -->
          <div class="status-badge mb-3">
            <span class="status-dot"></span>
            Available for work
          </div>

          <h2 class="role-line">Junior Full Stack Developer</h2>
          <h1 class="name-line">Nathaniel Medina</h1>

          <p class="intro-text">
            Hi, I'm Nathaniel — a full-stack developer building with
            <span class="stack-tag">MongoDB</span>,
            <span class="stack-tag">Express</span>,
            <span class="stack-tag">Vue</span>, and
            <span class="stack-tag">Node</span>.
            I enjoys building practical web applications and continuously learning modern technologies.
            I'm currently focused on React, TypeScript, Node.js, Express, and PostgreSQL while continuously improving through hands-on projects.
          </p>

          <router-link
              :to="{ path: '/contact' }"
              class="hire-btn">Hire me
          </router-link>
          <router-link
              :to="{ path: '/projects' }"
              class="hire-btn ms-3">View my Projects & Tools
          </router-link>
        </div>

        <!-- RIGHT: photo column.
             Capped size + a brass ring, instead of the old 350x350px
             fixed image that dominated the whole hero on mobile. -->
        <div class="col-12 col-lg-5 order-1 order-lg-2 text-center mb-4 mb-lg-0">
          <div class="photo-frame">
            <img
              src="/images/profilepic.png"
              alt="Portrait of Nathaniel Medina"
              class="profile-photo"
            />
          </div>
        </div>

      </div>

      <!-- Quote row: full width, sits below the two-column hero -->
      <div class="row">
        <div class="col-12 text-center quote-row">
          <p class="quote-text">
            "Success comes when opportunity meets preparation." — Zig Ziglar
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#landing {
  /* Kept your original idea of a cream-to-green gradient, just
     smoothed to a single direction (top-to-bottom) so it reads
     cleanly at any screen width instead of a diagonal that
     shifts oddly on mobile. */
  background: linear-gradient(180deg, var(--parchment) 0%, var(--forest-deep) 100%);
  font-family: var(--font-body);
  color: var(--ink);
  padding: 7rem 0 4rem; /* top padding clears the fixed navbar */
}

.hero-row {
  min-height: 60vh;
}

/* ---- Status badge ---- */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--forest-deep);
  background: var(--parchment-soft);
  border: 1px solid var(--brass);
  border-radius: var(--radius-pill);
  padding: 0.35rem 0.9rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brass);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

@media (prefers-reduced-motion: reduce) {
  .status-dot { animation: none; }
}

/* ---- Text ---- */
.role-line {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--ink);
  margin-bottom: 0.25rem;
}

.name-line {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.25rem, 5vw, 3.5rem); /* scales smoothly, no separate mobile override needed */
  color: var(--forest-deep);
  margin-bottom: 1.25rem;
}

.intro-text {
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 32rem;
  margin: 0 auto 2rem;
}

/* On large screens the text column is left-aligned, so undo the
   auto-centering margin from the mobile-first rule above. */
@media (min-width: 992px) {
  .intro-text {
    margin-left: 0;
    margin-right: 0;
  }
}

.stack-tag {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--parchment-soft);
  border: 1px solid rgba(11, 77, 62, 0.25);
  border-radius: 4px;
  padding: 0.05rem 0.4rem;
  color: var(--forest-deep);
}

/* ---- CTA button ---- */
.hire-btn {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--forest-deep);
  padding: 0.7rem 2rem;
  border-radius: var(--radius-pill);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: var(--brass) !important;
}

.hire-btn:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-soft);
  background-color: var(--ink) !important;
  color: var(--brass);
}

@media (prefers-reduced-motion: reduce) {
  .hire-btn:hover { transform: none; }
}

/* ---- Photo ----
   This is the key fix: a max-width in rem/px that's capped much lower
   than the old 350px, plus clamp() so it scales between a mobile floor
   and a desktop ceiling instead of jumping between breakpoints. */
.photo-frame {
  display: inline-block;
  padding: 6px;
  border: 2px solid var(--brass);
  border-radius: 50%;
}

.profile-photo {
  display: block;
  width: clamp(140px, 22vw, 200px);
  height: clamp(140px, 22vw, 200px);
  object-fit: cover;
  border-radius: 50%;
}

/* ---- Quote ---- */
.quote-row {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(244, 241, 220, 0.25);
}

.quote-text {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--cream-text);
  max-width: 40rem;
  margin: 0 auto;
}
</style>