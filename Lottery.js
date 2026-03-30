const app = new Vue({
  el: '#app',
  data: {
    myBingoState: [], // 0: unknown (white), 1: matched (red), 2: unmatched (green)
    jackpots: [
      // Jackpot 1
      [
        [0, 0, 1, 1],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      // Jackpot 2
      [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1]
      ],
      // Jackpot 2
      [
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0]
      ],
      // Jackpot 2
      [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0]
      ],
      // Jackpot 2
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0]
      ]
    ],
    resultBingo: null,
  },
  created() {
    this.initializeMyBingoState();
    this.updateResultBingo();
  },
  watch: {
    myBingoState: {
      deep: true,
      handler() {
        this.updateResultBingo();
      }
    }
  },
  methods: {
    initializeMyBingoState() {
      for (let i = 0; i < 4; i++) {
        this.myBingoState.push(Array(4).fill(0)); // All cells initially unknown (white)
      }
    },
    handleCellClick(row, col) {
      // Cycle through states: 0 (unknown) -> 1 (matched) -> 2 (unmatched) -> 0 (unknown)
      // Use Vue.set to ensure reactivity for nested arrays
      this.$set(this.myBingoState[row], col, (this.myBingoState[row][col] + 1) % 3);
    },
    updateResultBingo() {
      this.resultBingo = null; // Reset result

      for (const jackpot of this.jackpots) {
        let isMatch = true;
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 4; col++) {
            const myState = this.myBingoState[row][col];
            const jackpotValue = jackpot[row][col];

            if (myState === 1 && jackpotValue !== 1) { // My matched cell must be matched in jackpot
              isMatch = false;
              break;
            }
            if (myState === 2 && jackpotValue === 1) { // My unmatched cell must not be matched in jackpot
              isMatch = false;
              break;
            }
          }
          if (!isMatch) break;
        }
        if (isMatch) {
          this.resultBingo = jackpot;
          break; // Found the first matching jackpot
        }
      }
    }
  }
});