
export default function vibrate(options = { duration: 100, interval: 100, count: 1 }) {
    if (!window) {
        return;
    }
  
    if (!window.navigator) {
        return;
    }
  
    if (!window.navigator.vibrate) {
        return;
    }
  
    const pattern = [];
  
    for (let index = 0; index < options.count; index++) {
        pattern.push(options.duration);
        pattern.push(options.interval);
    }
  
    window.navigator.vibrate(pattern);
  }