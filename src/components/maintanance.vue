<template>
	<div class="maintanance">
		<a-result status="500" title="Maintanance mode" sub-title="Sorry, we will back soon.">
			<template v-if="mainPageButton" #extra>
				<router-link :to="{name: 'root'}">
					<a-button type="primary">
						Back Home
					</a-button>
				</router-link>
			</template>
		</a-result>
	</div>
</template>

<script>
export default {
	name: "maintanance-mode",
	props: {
		"main-page-button": Boolean
	}
}
</script>

<style>
.maintanance{
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>