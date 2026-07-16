<script setup>
import { Notyf } from 'notyf'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const notyf = new Notyf()

const name = ref('')
const email = ref('')
const message = ref('')
const isLoading = ref(false)

// Web3Forms Access Key — this is a public-facing key by design (Web3Forms
// is built to be called straight from the browser like this), so it's
// fine that it's visible in your bundled JS.
const WEB3FORMS_ACCESS_KEY = '8ec6cfea-c173-4f2b-866b-890b6fa8f1b2'

// Email subject that will appear when a form submission is received.
const subject = 'A wild Pokémon appeared!'

const submitForm = async () => {
  if (!recaptchaToken.value) {
    notyf.error('Please verify that you are not a robot')
    return
  }

  isLoading.value = true

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: subject,
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    })

    const result = await response.json()

    if (result.success) {
      notyf.success('Message sent!')
      // FIX: clear the fields after a successful send, so the form
      // is ready for a second message instead of showing stale text.
      name.value = ''
      email.value = ''
      message.value = ''
    } else {
      notyf.error('Failed to send message.')
    }
  } catch (error) {
    console.log(error)
    notyf.error('Failed to send message.')
  } finally {
    isLoading.value = false
    resetRecaptcha()
  }
}

/* reCAPTCHA */

const SITE_KEY = '6Ld_egctAAAAAFoDMBagmHPYUwyR0B3pNs_YLtPJ' // public site key — safe to expose

const recaptchaContainer = ref(null)
const recaptchaWidgetId = ref(null)
const recaptchaToken = ref('')

function onRecaptchaSuccess(token) {
  recaptchaToken.value = token
}

function onRecaptchaExpired() {
  recaptchaToken.value = ''
}

function renderRecaptcha() {
  if (!window.grecaptcha) {
    console.error('reCAPTCHA not loaded')
    return
  }

  recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
    sitekey: SITE_KEY,
    size: 'normal',
    callback: onRecaptchaSuccess,
    'expired-callback': onRecaptchaExpired,
  })
}

function resetRecaptcha() {
  if (recaptchaWidgetId.value !== null) {
    window.grecaptcha.reset(recaptchaWidgetId.value)
    recaptchaToken.value = ''
  }
}

let recaptchaPollInterval = null

onMounted(() => {
  let attempts = 0
  // Small safety addition: cap the polling at 50 tries (~5 seconds).
  // Your original version would poll forever if the reCAPTCHA script
  // ever failed to load — this just stops it from running indefinitely.
  recaptchaPollInterval = setInterval(() => {
    attempts++
    if (window.grecaptcha && window.grecaptcha.render) {
      renderRecaptcha()
      clearInterval(recaptchaPollInterval)
    } else if (attempts >= 50) {
      console.error('reCAPTCHA script never loaded — check the <script> tag in index.html')
      clearInterval(recaptchaPollInterval)
    }
  }, 100)
})

onBeforeUnmount(() => {
  clearInterval(recaptchaPollInterval)
})
</script>

<template>
  <section id="contact">
    <div class="container">

      <div class="text-center section-heading">
        <span class="eyebrow">Get In Touch</span>
        <h1 class="section-title">Contact Me</h1>
      </div>

      <div class="row align-items-start justify-content-center g-5">

        <!-- Map -->
        <div class="col-11 col-lg-5">
		  <span class="eyebrow">Near this area</span>
          <div class="ratio ratio-4x3 map-frame">

			<iframe 
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8660.844303751051!2d121.07221388963204!3d14.770856822217592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397a5b66dd73db7%3A0xebcec70186c75658!2sMetroplaza%20Mall!5e0!3m2!1sen!2sph!4v1784208153248!5m2!1sen!2sph" 
			style="border:0;" 
			allowfullscreen="" 
			loading="lazy" 
			referrerpolicy="strict-origin-when-cross-origin"
			></iframe>

          </div>
        </div>

        <!-- Form -->
        <div class="col-12 col-lg-5">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <input
                id="name"
                v-model="name"
                type="text"
                class="form-control contact-input"
                placeholder="First Name MI Last Name"
                required
              />
            </div>

            <div class="mb-3">
              <input
                v-model="email"
                type="email"
                class="form-control contact-input"
                placeholder="Email"
                required
              />
            </div>

            <div class="mb-3">
              <textarea
                v-model="message"
                class="form-control contact-input contact-textarea"
                rows="5"
                placeholder="Message"
                required
              ></textarea>
            </div>

            <!-- Social icons -->
            <div class="mb-4 d-flex gap-3 social-icons">
              <a href="https://www.linkedin.com/in/nathaniel-medina-031a6837b/" target="_blank" rel="noopener" aria-label="LinkedIn">
                <i class="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://github.com/NathMed" target="_blank" rel="noopener" aria-label="GitHub">
                <i class="fa-brands fa-github"></i>
              </a>
            </div>

            <div class="d-flex flex-column flex-sm-row justify-content-end gap-3 mb-3">
              <!-- FIX: this was type="submit" with formaction="https://google.com",
                   which tried to POST your contact form to Google instead of
                   opening a resume. It's now a plain download link.
                   Swap the href for wherever your actual resume file lives
                   (e.g. "/resume.pdf" in your public/ folder). -->
              <a href="https://drive.google.com/file/d/1zol6gVo3_3DIwKJlxeLfhrQbyl42lvbD/view?usp=drive_link" target="_blank" class="btn-pill btn-pill-outline text-center">
                Resume
              </a>

              <button type="submit" class="btn-pill btn-pill-filled" :disabled="isLoading">
                {{ isLoading ? 'Sending...' : 'Submit' }}
              </button>
            </div>

            <div class="d-flex justify-content-end">
              <div ref="recaptchaContainer"></div>
            </div>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
@import '../assets/main.css';

#contact {
  background-color: var(--parchment);
  color: var(--ink);
  padding: 5rem 0;
}

.section-heading {
  margin-bottom: 3rem;
}

.eyebrow {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--forest-mid);
  margin-bottom: 0.75rem;
}

.section-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 2.75rem);
  color: var(--forest-deep);
  margin: 0;
}

/* ---- Map ---- */
.map-frame {
  border-radius: var(--radius-card);
  overflow: hidden;
  border: 2px solid var(--brass);
  box-shadow: var(--shadow-soft);
}

/* ---- Form fields ---- */
.contact-input {
  font-family: var(--font-body);
  background: var(--parchment-soft);
  border: 1px solid rgba(11, 77, 62, 0.25);
  border-radius: var(--radius-pill);
  padding: 0.75rem 1.25rem;
  color: var(--ink);
}

.contact-textarea {
  border-radius: 1.25rem; /* softly-rounded corners instead of a pill, since a pill-shaped textarea looks odd at 5 rows tall */
}

.contact-input:focus {
  border-color: var(--brass);
  box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.25);
}

/* ---- Social icons ---- */
.social-icons a {
  color: var(--forest-deep);
  font-size: 1.5rem;
  transition: transform 0.2s ease, color 0.2s ease;
}

.social-icons a:hover {
  color: var(--brass);
  transform: translateY(-2px);
}

/* ---- Buttons ----
   Same pill language as the landing hero's "Hire me" button:
   one filled (primary action = Submit), one outline (secondary
   action = Request a Resume), so they don't compete for attention. */
.btn-pill {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: var(--radius-pill);
  padding: 0.65rem 1.75rem;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.btn-pill-filled {
  background: var(--brass);
  color: white;
}

.btn-pill-outline {
  background: transparent;
  color: var(--forest-deep);
  border: 1px solid var(--forest-deep);
}

.btn-pill:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-soft);
  background-color: var(--ink) !important;
  color: var(--brass);
}

.btn-pill:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .btn-pill:hover,
  .social-icons a:hover {
    transform: none;
  }
}
</style>