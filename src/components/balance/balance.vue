<template>
  <div class="balance" v-if="isLogged">
    <span
      class="balance__item"
      @click="showModal"
      :class="{ clickable: clickable }"
    >
      {{ currency.prefix }}{{ user.balance | numsepar }}

      <a-badge
        v-if="clickable"
        :count="'+'"
        :offset="[10, -8]"
        :number-style="{}"
      >
        {{ currency.suffix }}
      </a-badge>
      <template v-else>
        {{ currency.suffix }}
      </template>
    </span>
    <addFunds :modalVisible="modalVisible" :hideModal="hideModal" />
  </div>
</template>

<script>
import addFunds from "./addFunds.vue";
import md5 from "md5";
export default {
  name: "balance_item",
  components: {
    addFunds,
  },
  props: {
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      modalVisible: false,
      confirmLoading: false,
      amount: 10,
      btns: [5, 10, 50, 100, 500, 1000],
      stay: false,
    };
  },
  mounted() {
    this.$api
      .sendAsUser("getBalance")
      .then((res) => {
        if (this.isLogged && this.user.id == res.userid) {
          this.$store.dispatch("updateBalance", res.balance);
          this.$store.dispatch("updateCurrency", res.currency_code);
          this.$store.dispatch("updateRate", res.currency_rate);
        }
      })
      .catch((err) => console.error(err));
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    currency() {
      if (this.user.currency_code) return { suffix: this.user.currency_code };
      return this.$config.currency;
    },
    isLogged() {
      return this.$store.getters.isLogged;
    },
  },
  methods: {
    URLparameter(obj, outer = "") {
      var str = "";
      for (var key in obj) {
        if (key == "price") continue;
        if (str != "") {
          str += "&";
        }
        if (typeof obj[key] == "object") {
          str += this.URLparameter(obj[key], outer + key);
        } else {
          str += outer + key + "=" + encodeURIComponent(obj[key]);
        }
      }
      return str;
    },
    showModal() {
      if (this.clickable) {
        this.modalVisible = true;
      }
    },
    hideModal() {
      this.modalVisible = false;
    },
    handleOk(e) {
      this.confirmLoading = true;
      let userinfo = {
        userid: this.user.id,
        amount: this.amount,
        secret: md5("addFunds" + this.user.id + this.user.secret),
      };
      this.$axios
        .get("addFunds.php?" + this.URLparameter(userinfo))
        .then((res) => {
          this.modalVisible = false;
          this.confirmLoading = false;
          if (!this.stay) {
            this.$router.push({ path: `/invoice-${res.data.invoiceid}` });
          } else {
            this.$message.success(`Now look invoice#${res.data.invoiceid}`);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleCancel(e) {
      this.modalVisible = false;
    },
    addAmount(amount) {
      if (this.amount == "") this.amount = 0;
      this.amount += amount;
    },
  },
};
</script>

<style>
.balance__item.clickable {
  cursor: pointer;
}
.balance__item .ant-badge-count {
  height: 21px;
  width: 21px;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 6px;
}
</style>
