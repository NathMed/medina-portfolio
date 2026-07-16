<script setup>
// Compute the year automatically so you never have to remember to
// bump "2025" -> "2026" -> "2027" by hand.
const year = new Date().getFullYear();
</script>

<template>
  <footer id="site-footer">
    <div class="container">
      <div class="footer-inner">

        <div class="footer-name">
          <span class="footer-name-text">Nathaniel Medina</span>
          <span class="footer-role">Junior Full Stack Developer</span>
		  <span class="footer-role">Built with Vue 3 + Bootstrap + AI Assisted</span>
        </div>

        <!-- Social / contact links.
             Swap these hrefs for your real profile / repo / portfolio links. -->
        <div class="footer-links">
          <a href="https://github.com/NathMed" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/nathaniel-medina-031a6837b/" target="_blank" rel="noopener">LinkedIn</a>
        </div>

        <div class="footer-copyright">
          &copy; {{ year }} Nathaniel Medina. All rights reserved.
        </div>

      </div>
    </div>
  </footer>
</template>

<style scoped>

#site-footer {
  background: var(--forest-deep);
  color: var(--cream-text);
  font-family: var(--font-body);
  padding: 2.5rem 0;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.footer-name-text {
  display: block;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 600;
  font-size: 1.25rem;
}

.footer-role {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brass-light);
  margin-top: 0.25rem;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-links a {
  color: var(--cream-text);
  text-decoration: none;
  font-size: 0.85rem;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.footer-links a:hover {
  color: var(--brass-light);
  border-color: var(--brass-light);
}

@media (prefers-reduced-motion: reduce) {
  .footer-links a { transition: none; }
}

.footer-copyright {
  font-size: 0.75rem;
  color: rgba(244, 241, 220, 0.6);
}
</style>