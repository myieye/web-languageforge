<script>
	import { browser } from '$app/environment'
	import { throw_error } from '$lib/error'
	import { GET } from '$lib/fetch'
	import { Button } from '$lib/forms'
	import { start, stop } from '$lib/progress'
	import { onMount } from 'svelte'

	let dark_mode = false

	onMount(() => dark_mode = window.matchMedia('(prefers-color-scheme: dark)').matches)

	$: browser && document.documentElement.setAttribute('data-theme', dark_mode ? 'dark' : 'light')
</script>

<h1>LFNext app</h1>

<section>
	<h2>Migrated capabilities</h2>
	<ol>
		<li><a href=/password/change>Change password</a></li>
		<li><a href=/projects/abc-123>Project landing page</a></li>
	</ol>
</section>

<section>
	<h2>Progress indicator</h2>
	<Button on:click={ () => start('index.svelte') }>start progress</Button>
	<Button on:click={ () => stop('index.svelte') }>stop progress</Button>
</section>

<section>
	<h2>Error handling</h2>

	<h3>Client</h3>
	<Button on:click={ () => globalThis.whatIsTheAirspeedVelocityOfAnUnladenSwallow() } danger>Cause run-time error</Button>
	<Button on:click={ async () => await GET('//LFAPP') } danger>Cause network error</Button>
	<Button on:click={ () => throw_error("sorry, that's not a good password", 400) } danger>Cause biz logic error</Button>
	<Button on:click={ async () => await GET('//httpbin.org/status/500') } danger>Cause backend error</Button>

	<h3>Server</h3>
	The change password page has a few options:
	<ul>
		<li>Submit the form without supplying anything</li>
		<li>Only supply the password and not the confirm</li>
		<li>Try to submit the form without being authenticated</li>
	</ul>
</section>

<section>
	<h2>UI library <small><a href=//daisyui.com rel=noreferrer target=_blank>//daisyui.com</a></small></h2>

	<h3>Button</h3>
	<button class='btn btn-primary'>primary</button>
	<button class='btn btn-secondary'>secondary</button>
	<button class='btn btn-error'>error</button>
	<button class='btn btn-lg'>large</button>
	<button class='btn' disabled>disabled</button>

	<h3>Light/Dark mode</h3>
	<input type=checkbox bind:checked={ dark_mode } class='toggle toggle-primary toggle-lg'>
</section>
