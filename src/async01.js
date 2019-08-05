
performance.mark('async01_START');

for (let i=0; i<1000000000; i++) {
  const j = i;
}

console.log('Im async01.js', performance.now());

performance.mark('async01_END');
performance.measure(
  'MEASURE_async01.js',
  'async01_START',
  'async01_END'
);