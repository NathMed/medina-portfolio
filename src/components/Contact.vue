<script setup>
	import {Notyf} from 'notyf';
	import {ref, onMounted, onBeforeUnmount} from 'vue';

	const notyf = new Notyf();

	const name = ref("");
	const email = ref("");
	const message = ref("");
	const isLoading = ref(false);

	// Web3Forms Access Key used to authenticate form submissions.
	const WEB3FORMS_ACCESS_KEY = "8ec6cfea-c173-4f2b-866b-890b6fa8f1b2"

	// Email subject that will appear when a form submission is received.
	const subject = "A wild Pokémon appeared!";

	const submitForm = async () => {

		if(!recaptchaToken.value) {
			notyf.error('Please verify that you are not a robot');
			return;
		}
		
		isLoading.value = true;

		try {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				}, 
				body: JSON.stringify({
					access_key: WEB3FORMS_ACCESS_KEY,
					subject: subject,
					name: name.value,
					email: email.value,
					message: message.value
				})
			})

			const result = await response.json();

				if (result.success) {
					isLoading.value = false;
					notyf.success("Message Sent!");
				}
		} catch (error) {
			console.log(error);
			isLoading.value = false;
			notyf.error("Failed to send message.");
		} finally {
			resetRecaptcha();
		}
	}

	/*reCAPTCHA*/

	const SITE_KEY = '6Ld_egctAAAAAFoDMBagmHPYUwyR0B3pNs_YLtPJ';  // Replace with your site key

    const recaptchaContainer = ref(null);

    const recaptchaWidgetId = ref(null);

    const recaptchaToken = ref('');

    function onRecaptchaSuccess(token) {
        recaptchaToken.value = token;
    }

    function onRecaptchaExpired() {
        recaptchaToken.value = '';
    }

    function renderRecaptcha() {
        if (!window.grecaptcha) {
            console.error('reCAPTCHA not loaded');
            return;
        }

        recaptchaWidgetId.value = window.grecaptcha.render(recaptchaContainer.value, {
            sitekey: SITE_KEY,
            size: 'normal',
            callback: onRecaptchaSuccess,
            'expired-callback': onRecaptchaExpired,
        });
    }

    function resetRecaptcha() {
        if (recaptchaWidgetId.value !== null) {
        	window.grecaptcha.reset(recaptchaWidgetId.value);
        	recaptchaToken.value = '';
        }
    }

    onMounted(() => {
    const interval = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
            renderRecaptcha();
            clearInterval(interval);
        }
    }, 100);

	onBeforeUnmount(() => {
	  clearInterval(interval);
	});
});  
</script>

<template>
	<!-- Contact -->

	<div id="contact" class="container-fluid py-5">
	  <div class="row text-center mb-4">
	    <div class="col-12">
	      <h1 class="fw-bold">Contact Me!</h1>
	    </div>
	  </div>

	    <!-- Content -->
	    <div class="row align-items-center justify-content-center">

	      <!-- Map -->
	      <div class="col-11 col-lg-5 mb-4 mb-lg-0">
	        <div class="ratio ratio-4x3 shadow rounded">
	          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.867668690057!2d120.9803878759038!3d14.54955907832264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cb006d580d4b%3A0x9c26bfec3a729c8e!2sDiwata%20Pares%20Overload%20Pasay!5e0!3m2!1sen!2sph!4v1772567438250!5m2!1sen!2sph" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
	        </div>
	      </div>

	      <!-- Form -->
	      <div class="col-12 col-lg-5 mt-lg-5 pt-lg-5">
	        <form @submit.prevent="submitForm">
	          <div class="mb-3">
	              <input id="name" v-model="name" type="text" class="form-control rounded-pill"placeholder="First Name MI Last Name" required>
	          </div>

	          <div class="mb-3">
	            <input type="email" v-model="email" class="form-control rounded-pill"
	              placeholder="Email" required>
	          </div>

	          <div class="mb-3">
	            <textarea v-model="message" class="form-control rounded-4"
	              rows="5"
	              placeholder="Message"></textarea>
	          </div>

	          <!-- Icons -->
	          <div class="mb-3 d-flex gap-3 fs-2">
	            <a href="https://linkedin.com" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
	            <a href="https://github.com" target="_blank"><i class="fa-brands fa-github"></i></a>
	            <a href="https://mail.google.com" target="_blank"><i class="fa-solid fa-envelope"></i></a>
	          </div>

	          <!-- Button -->
	          <div class="text-end">
	            <button type="submit" 
	              class="btn text-light px-4 rounded-pill" :disabled="isLoading">{{isLoading ? "Sending..." : "Submit"}}
	            </button>
	          </div>
	          <div class="text-end my-5">
	            <button formaction="https://google.com" type="submit" 
	              class="btn text-light px-4 rounded-pill">
	              Request a Resume
	            </button>
	          </div>

	          <div class="d-flex justify-content-end mt-2">
	          	<div ref="recaptchaContainer"></div>
	          </div>

	        </form>
	      </div>
	    </div>
	  </div>
	  <!-- End of Contact -->
</template>

<style scoped>

</style>