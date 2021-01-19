<template>
  <div class="error-page">
    <div class="error-page__code">{{ code }}</div>
    <div class="error-page__msg">{{ msg }}</div>
    <div class="error-page__sub-msg">
      <span>The requested URL was not found on this server.</span>
      <i>That’s all we know.</i>
    </div>
    <div class="error-page__robot">
      <img src="/images/robot.png" alt="robot" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => ({
        statusCode: '',
        message: '',
      }),
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'this is an error.',
    }
  },
  computed: {
    code() {
      return this.error.statusCode || 404
    },
    msg() {
      return this.error.message || this.otherError
    },
  },
  head() {
    return {
      title:
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError,
    }
  },
}
</script>

<style lang="scss" scoped>
.error-page {
  text-align: center;

  &__code {
    font-weight: 600;
    font-size: 28px;
  }

  &__msg {
    font-size: 14px;
  }

  &__sub-msg {
    i {
      color: rgb(112, 108, 108);
    }
  }
}
</style>
