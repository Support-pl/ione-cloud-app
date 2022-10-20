<template>
  <a-row :gutter="[0, 20]">
    <a-col :span="6">
      {{ $t( 'clientinfo.password' ) }}: 
    </a-col>
    <a-col :span="18">
      <password :password="SingleCloud.TEMPLATE.CONTEXT.PASSWORD"/>
    </a-col>
    <a-col :span="24">
      <p>
        {{ $t("Enter new password") }}:
        <password-meter
          style="height: 10px"
          :password="options.password"
          @score="(value) => score = value.score"
        />
        <a-input-password v-model="options.password" />
      </p>
      <p>
        {{ $t("clientinfo.password again") }}:
        <a-input-password v-model="options.password2" />
      </p>
    </a-col>
    <a-col style="display: flex; justify-content: end" :span="24">
      <a-button
        type="primary"
        :loading="isLoading"
        :disabled="score < 4 || options.password !== options.password2"
        @click="$emit('send', options.password)"
      >
        {{ $t('Send') }}
      </a-button>
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters } from 'vuex'
import password from '@/components/password.vue';
import passwordMeter from 'vue-simple-password-meter'

export default {
	name: "access-manager",
	components: { password, passwordMeter },
  props: { isLoading: { type: Boolean, required: true } },
  data: () => ({
    options: {
      password: '',
      password2: ''
    },
    score: 0
  }),
	computed: {
		...mapGetters('cloud', { SingleCloud: 'getOpenedCloud' }),
	}
}
</script>
