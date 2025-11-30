const time = (
  <div>
    <p>
      Current Time: {dayjs().format('HH:mm:ss')}
    </p>
  </div>
);

const clockContainer = document.querySelector('#clockContainer');
const root = ReactDOM.createRoot(clockContainer);
root.render(time);

setInterval(() => {
  const time = (
    <div>
      <p>
        Current Time: {dayjs().format('HH:mm:ss')}
      </p>
    </div>
);
  root.render(time);
}, 1000);