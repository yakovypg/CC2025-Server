export const shuffleArray = (arr: any[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

export const randomReduceArray = (arr: any[], targetLength: number) => {
  shuffleArray(arr);
  arr.splice(targetLength);
};
