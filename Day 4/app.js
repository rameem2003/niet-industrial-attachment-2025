const h1 = document.querySelectorAll("h1");
console.log(h1);

h1.forEach((item, index) => {
  let count = 0;
  const counter = () => {
    count++;
    item.innerHTML = count;

    if (count >= item.dataset.counter) {
      clearInterval(stop);
    }
  };

  let stop = setInterval(() => {
    counter();
  }, item.dataset.timer);
});