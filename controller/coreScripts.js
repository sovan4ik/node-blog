exports.postTime = (ms) => {
    let t = new Date(ms + 10800000);
    let h = (t.getUTCHours() < 10 ? "0" : "") + t.getUTCHours();
    let mm = (t.getUTCMinutes() < 10 ? "0" : "") + t.getUTCMinutes();
    let d = (t.getUTCDate() < 10 ? "0" : "") + t.getUTCDate();
    let m = (t.getUTCMonth() < 10 ? "0" : "") + (t.getUTCMonth() + 1);
    let y = t.getUTCFullYear();
    let time = `${h}:${mm} — ${d}.${m}.${y}`;
    return time; 
}

exports.test = (name) => {
    return `Hello ${name}`; 
}

exports.sortFromOldToNew = (value) => {
    value.sort((a, b) => a.date - b.date); 
      return value;
    }

exports.sortFromNewToOld = (value) => {
    value.sort((a, b) => b.date - a.date); 
      return value;
    }
