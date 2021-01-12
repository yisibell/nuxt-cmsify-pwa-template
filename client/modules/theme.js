export default function theme(moduleOptions) {
  this.nuxt.hook('ready', (nuxt) => {
    // Your custom code here

    console.log(nuxt.setLayout)
  })
}
