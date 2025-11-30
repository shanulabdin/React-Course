const currentTime = dayjs().format('HH:mm:ss');

const time = (
  <div>
    <p>
      Current Time: {currentTime}
    </p>
  </div>
);

const clockContainer = document.querySelector('#clockContainer');
const root = ReactDOM.createRoot(clockContainer);
root.render(time);