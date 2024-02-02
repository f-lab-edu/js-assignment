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

// primitive type tests
test("cloneDeep: String", () => {
  expect(cloneDeep("test")).toBe("test");
});

test("cloneDeep: Number", () => {
  expect(cloneDeep(1)).toBe(1);
});

test("cloneDeep: Boolean", () => {
  expect(cloneDeep(false)).toBe(false);
});

// reference type tests

const obj = { a: 1, b: 2, c: { d: 3, e: 5 } };

test("cloneDeep: Object", () => {
  expect(cloneDeep(obj) === obj).toEqual(false);
});

// 2depth이상의 객체에서 깊은복사 여부
test("cloneDeep: Object", () => {
  expect(cloneDeep(obj).c === obj.c).toEqual(false);
});

const arr = [3, { a: "b", c: "d" }, 1];

test("cloneDeep: Array", () => {
  expect(cloneDeep(arr)).toEqual(arr);
});

// 2depth이상의 배열에서 깊은복사 여부
test("cloneDeep: Array", () => {
  expect(cloneDeep(arr)[1] === arr[1]).toEqual(false);
});

const set = new Set([1, { a: 4, b: 5 }, 3, null]);

test("cloneDeep: Set", () => {
  expect(cloneDeep(set)).toEqual(set);
});

// 2depth이상의 Set객체에서 깊은복사 여부
test("cloneDeep: Set", () => {
  expect([...cloneDeep(set)][1] === [...set][1]).toEqual(false);
});

const map = new Map();
map.set(0, "a");
map.set(1, { a: "b", b: "c", set: set });

test("cloneDeep: Map", () => {
  expect(cloneDeep(map)).toEqual(map);
});

// 2depth이상의 Map객체에서 깊은복사 여부
test("cloneDeep: Map", () => {
  expect([...cloneDeep(map).values()][1] === [...map.values()][1]).toEqual(false);
});

const date = new Date();

test("cloneDeep: Date", () => {
  expect(cloneDeep(date)).toEqual(date);
});
