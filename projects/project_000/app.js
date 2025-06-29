const app = Vue.createApp({
  data() {
    return {
      perspective: 100,
      rotateY: 0,
      rotateX: 0,
      rotateZ: 0,
    };
  },
  computed: {
    box() {
      return {
        transform: `perspective(${this.perspective}px) rotateY(${this.rotateY}deg) rotateX(${this.rotateX}deg) rotateZ(${this.rotateZ}deg)`,
      };
    },
  },
  methods: {
    reset() {
      this.perspective = 100;
      this.rotateY = 0;
      this.rotateX = 0;
      this.rotateZ = 0;
    },
    async copy() {
      let text = `transform: ${this.box.transform};`;
      navigator.clipboard.writeText(text);

      alert('Copied to clipboard:\n' + text);
    },
  },
}).mount('#app');
