/*
과제: 깊은 복사 메소드 구현하기
원시타입, 객체, 배열, Map, Set, Date 객체까지 모두 깊은 복사를 할 수 있는 copy 메소드를 만들어주세요.
(javascript로 작성)
jest를 이용한 테스트 코드를 작성해주세요.
과제를 완료한 후 reviewer에 f-lab-ash를 추가해주세요.
*/

const cloneDeep = (param) => {
  let copyItem;
  const isObject = (value) => {
    // typeof(null) === 'object' 방지
    return Boolean(typeof value === "object" && value !== null);
  };
  if (!isObject(param)) return param;

  // instance별 깊은복사 구현
  if (param instanceof Array) {
    copyItem = param.map((val) => {
      if (isObject(val)) {
        return cloneDeep(val);
      } else {
        return val;
      }
    });
  } else if (param instanceof Set) {
    copyItem = new Set();
    param.forEach((val) => {
      if (isObject(val)) {
        copyItem.add(cloneDeep(val));
      } else {
        copyItem.add(val);
      }
    });
  } else if (param instanceof Map) {
    copyItem = new Map();
    param.forEach((val, key) => {
      if (isObject(val)) {
        copyItem.set(...[key, cloneDeep(val)]);
      } else {
        copyItem.set(...[key, val]);
      }
    });
  } else if (param instanceof Date) {
    copyItem = new Date(param);
  } else {
    copyItem = {};
    for (let key in param) {
      if (typeof param[key] === "object" && param[key] !== null) {
        copyItem[key] = cloneDeep(param[key]);
      } else {
        copyItem[key] = param[key];
      }
    }
  }

  return copyItem;
};

// console.log("참조타입 클론", cloneDeep(obj));
// console.log("참조타입 클론", cloneDeep(set));
// console.log("참조타입 클론", cloneDeep(map));
// console.log("참조타입 클론", cloneDeep(arr));
// console.log("원시타입 클론", cloneDeep(1));
// console.log("원시타입 클론", cloneDeep("원시 클론"));
// console.log("원시타입 클론", cloneDeep(false));
// console.log("원시타입 클론", cloneDeep(null));
