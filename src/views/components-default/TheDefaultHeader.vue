<template>
  <div class="default-header expandHeader">
    <v-container class="d-flex align-center pt-8">
      <v-row align="center" no-gutters>
        <v-col cols="4">
          <router-link :to="{ name: ROUTES_HOME.HOME.NAME, query: {} }">
            <v-img
              :class="$vuetify.breakpoint.smAndDown ? 'mx-auto' : ''"
              src="@/assets/images/icons/logo-light2.png"
              max-height="38"
              max-width="204"
            />
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ROUTES_HOME, ROUTES_WALLET } from '@/core/configs/configRoutes';
import { mapGetters } from 'vuex';

export default {
  name: 'TheDefaultHeader',
  data: () => ({
    // eslint-disable-next-line
    menuObj: {
      name: 'Wallet actions',
      items: [
        {
          title: 'Popular actions',
          items: [
            {
              title: 'Send transaction',
              to: { name: ROUTES_WALLET.SEND_TX.NAME }
            },
            {
              title: 'Explore DApps',
              to: { name: ROUTES_WALLET.DAPPS.NAME }
            },
            {
              title: 'Swap tokens',
              to: { name: ROUTES_WALLET.SWAP.NAME }
            },
            {
              title: 'Sign message',
              to: { name: ROUTES_WALLET.SIGN_MESSAGE.NAME }
            }
          ]
        },
        {
          title: 'More actions',
          items: [
            {
              title: 'Verify message',
              to: { name: ROUTES_HOME.TOOLS.NAME, query: { tab: '1' } }
            }
          ]
        }
      ]
    },
    ROUTES_HOME: ROUTES_HOME
  }),
  computed: {
    ...mapGetters('global', ['swapLink'])
  }
};
</script>
