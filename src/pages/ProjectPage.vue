<script setup>
import projects from '../data/projects.json'
import ProjectCard from '../components/ProjectCard.vue'
import { computed } from 'vue'

// NOTE: Bootstrap's grid actually wraps columns on its own once a row
// fills up (e.g. four `col-lg-4`s in one .row will wrap to a second line
// automatically). You likely don't need to manually chunk into rows of 3 —
// you could drop `rowProjects` entirely and just v-for `projects` straight
// into one .row. Keeping your version as-is here since it works fine;
// just flagging it as a possible simplification later.

// Grouped so the markup below can loop instead of repeating five blocks —
// same visual result, less duplication than writing each category out by hand.
const toolGroups = [
  { label: 'Language', tools: ['HTML', 'CSS', 'JavaScript', 'TypeScript'] },
  { label: 'Front End', tools: ['Vue.js', 'Bootstrap 5', 'React (Learning)', 'Axios'] },
  { label: 'Back End', tools: ['Node.js', 'Express', 'REST APIs', 'JWT'] },
  { label: 'Database', tools: ['MongoDB'] },
  { label: 'Tools', tools: ['Git', 'GitHub', 'VS Code', 'Vercel/Render', 'Figma', 'Postman'] },
  { 
    label: 'Core Competencies', 
    tools: ['Full-Stack Development', 'Responsive Web Applications', 'Web Design', 'CRUD Operations', 'API Integration', 'Authentication & Authorization', 'Version Control', 'Deployment'] 
  },
  { 
    label: 'Development Approach', 
    tools: ['AI-Assisted Development (ChatGPT, Claude)', 'Debugging & Code Reviews', 'Documentation', 'Agile Workflows', 'Git & GitHub PR Workflows', 'Trello'] 
  },
  { 
    label: 'Productivity Tools', 
    tools: ['Microsoft Word', 'Excel', 'PowerPoint', 'Google Docs & Sheets', 'Google Drive & Forms', 'Google Calendar'] 
  },
  { 
    label: 'Soft Skills', 
    tools: ['Problem Solving', 'Analytical Thinking', 'Customer Service', 'Documentation', 'Time Management', 'Team Collaboration'] 
  }
]
</script>

<template>
  <!-- My Projects -->
  <section id="projects">
    <div class="container">

      <div class="text-center section-heading">
        <span class="eyebrow">Selected Work</span>
        <h1 class="section-title">My Projects</h1>
      </div>

      <div class="row g-4 justify-content-center">

        <div
          v-for="project in projects"
          :key="project.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <ProjectCard :project="project" />
        </div>

      </div>

    </div>
  </section>
  <!-- End of My Projects -->

	<!-- Tools -->
	<section id="tools">
	<div class="container">
		<div class="text-center section-heading">
		<span class="eyebrow">Loadout</span>
		<h1 class="section-title">Tools &amp; Tech Stack</h1>
		</div>
		
		<div class="row g-4 justify-content-center">
      <div 
        v-for="group in toolGroups" 
        :key="group.label" 
        class="col-12 col-md-6 col-lg-3"
      >
        <div class="tool-group">
        <h4 class="tool-group-label">{{ group.label }}</h4>
        <div class="tool-chip-list">
          <span 
          v-for="tool in group.tools" 
          :key="tool" 
          class="tool-chip"
          >
          {{ tool }}
          </span>
        </div>
        </div>
      </div>
		</div>
	</div>
	</section>
	<!-- End of Tools -->

</template>

<style scoped>
@import '../assets/main.css';

/* ---- Shared section heading style ----
   Same eyebrow + display-heading pattern as the landing hero
   (status badge -> role-line -> name-line), reused here so the whole
   page reads as one system instead of each section inventing its own. */
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

/* ---- Projects section ---- */
#projects {
  background-color: var(--forest-deep);
  padding: 5rem 0;
}

/* ---- Tools section ---- */
#tools {
  background-color: var(--forest-mid);
  padding: 5rem 0;
  border-top: 1px solid rgba(244, 241, 220, 0.12);
}

.tool-group {
  height: 100%;
  text-align: center;
}

.tool-group-label {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brass-light);
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(244, 241, 220, 0.2);
}

.tool-chip-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

/* Same "mono tag" language as .stack-tag on the landing page,
   just inverted for a dark background. Using text chips instead of
   the individual icon images keeps every tool visually consistent —
   no mismatched icon styles between your icons8 set and the single
   letter placeholder icons (H.png, G.png, etc). If you'd rather keep
   icons, that's an easy swap: just put an <img class="tool-icon"> next
   to {{ tool }} inside the chip below. */
.tool-chip {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--cream-text);
  background: rgba(244, 241, 220, 0.08);
  border: 1px solid rgba(244, 241, 220, 0.25);
  border-radius: 6px;
  padding: 0.35rem 0.7rem;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.tool-chip:hover {
  border-color: var(--brass);
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .tool-chip:hover { transform: none; }
}
</style>