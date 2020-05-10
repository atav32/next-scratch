import * as tf from '@tensorflow/tfjs';

const usePromise = ({ element }, timeout = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (element) {
        resolve(element);
      } else {
        reject(element);
      }
    }, timeout);
  });
};

const getAsyncResponse = async () => {
  const response = await usePromise({element: 'abc'})
  return response;
};

export default function Transpile() {
  const arr = [1, 2, 3, 4, 5];
  console.log('Array.prototype.includes', arr.includes(3));
  getAsyncResponse().then(response => console.log('async response', response));

  return (
    <div className="ContentContainer">
      <p>This is the transpile page</p>
    </div>
  );
}
