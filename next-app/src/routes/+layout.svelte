<script>
	import { page } from '$app/stores'
	import '$lib/app.css'
	import Header from '$lib/Header.svelte'

	let menu_toggle = false

	$: current_page = $page.url.pathname

	function open() {
		menu_toggle = true
	}

	function close() {
		menu_toggle = false
	}

	function closeOnEscape(e) {
		e.key === 'Escape' && close()
	}
</script>

<svelte:window on:keydown={ closeOnEscape } />

<!-- https://daisyui.com/components/drawer -->
<div class='drawer drawer-end'>
	<input type=checkbox checked={ menu_toggle } class=drawer-toggle>

	<div class=drawer-content>
		<Header on:menuopen={ open } />

		<!-- https://tailwindcss.com/docs/typography-plugin -->
		<main class='prose max-w-none px-6'>
			<slot />
		</main>
	</div>

	<div class=drawer-side on:click={ close } on:keydown={ close }>
	  <div class=drawer-overlay></div>

	  <!-- https://daisyui.com/components/menu  -->
	  <ul class='menu p-4 bg-base-100'>
		<li class=menu-title><span>User</span></li>
		<li><a href=/app/userprofile rel=external>My profile</a></li>
		<li><a href=/password/change  class:active={ current_page.startsWith('/password/change') }>Change password</a></li>
		<li><a href=/app/siteadmin rel=external>Site administration</a></li>
		<li><a href=/auth/logout rel=external>Logout</a></li>

		<li class='menu-title mt-6'><span>Project</span></li>
		<li><a href=/app rel=external>My projects</a></li>

		<li class='menu-title mt-6'><span>About</span></li>
		<li><a href=https://community.software.sil.org/t/w/5454 target=_blank rel=noreferrer>What's new</a></li>
		<li><a href='https://www.youtube.com/playlist?list=PLJLUPwIFOI8d8lmQVAcBapyw87jCtmDNA' target=_blank rel=noreferrer>Videos</a></li>
		<li><a href=https://github.com/sillsdev/web-languageforge/wiki/Known-Issues-and-Limitations target=_blank rel=noreferrer>Known issues and limitations</a></li>

		<li class='menu-title mt-6'><span>Help</span></li>
		<li><a href=https://community.software.sil.org/c/language-forge target=_blank rel=noreferrer>Community Support</a></li>
		<li><a href=mailto:issues@languageforge.org target=_blank rel=noreferrer>Report a Problem</a></li>
	  </ul>
	</div>
  </div>

<style>
	ul {
		min-width: 33%;
	}
</style>
