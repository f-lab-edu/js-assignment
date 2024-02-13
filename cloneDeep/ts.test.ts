const cloneDeepTest = (param: ParameterType) => {
  let copyItem: any;
  const isObject = (value: ParameterType) => {
    // typeof(null) === 'object' 방지
    return Boolean(typeof value === "object" && value !== null);
  };
  if (!isObject(param)) return param;

  // instance별 깊은복사 구현
  if (param instanceof Array) {
    copyItem = param.map((val) => {
      if (isObject(val)) {
        return cloneDeepTest(val);
      } else {
        return val;
      }
    });
  } else if (param instanceof Set) {
    copyItem = new Set();
    param.forEach((val) => {
      if (isObject(val)) {
        copyItem.add(cloneDeepTest(val));
      } else {
        copyItem.add(val);
      }
    });
  } else if (param instanceof Map) {
    copyItem = new Map();
    param.forEach((val, key) => {
      if (isObject(val)) {
        copyItem.set(...[key, cloneDeepTest(val)]);
      } else {
        copyItem.set(...[key, val]);
      }
    });
  } else if (param instanceof Date) {
    copyItem = new Date(param);
  } else if (param instanceof Object) {
    copyItem = {};
    for (let key in param) {
      if (isObject(param[key])) {
        copyItem[key] = cloneDeepTest(param[key]);
      } else {
        copyItem[key] = param[key];
      }
    }
  }

  return copyItem;
};
// primitive type tests
test("cloneDeepTest: String", () => {
  expect(cloneDeepTest("test")).toBe("test");
});

test("cloneDeepTest: Number", () => {
  expect(cloneDeepTest(1)).toBe(1);
});

test("cloneDeepTest: Boolean", () => {
  expect(cloneDeepTest(false)).toBe(false);
});

// reference type tests

const obj = { a: 1, b: 2, c: { d: 3, e: 5 } };

// 두 객체의 프로퍼티값 비교

test("cloneDeepTest: Object", () => {
  expect(cloneDeepTest(obj)).toStrictEqual(obj);
});

// 깊은복사 여부
test("cloneDeepTest: deep copy of Object", () => {
  expect(cloneDeepTest(obj) === obj).toBe(false);
});

// 2depth이상의 객체에서 깊은복사 여부
test("cloneDeepTest: 2depth deep copy of Object", () => {
  expect(cloneDeepTest(obj).c === obj.c).toBe(false);
});

const arr = [3, { a: "b", c: "d" }, 1];

test("cloneDeepTest: Array", () => {
  expect(cloneDeepTest(arr)).toStrictEqual(arr);
});

// 깊은복사 여부
test("cloneDeepTest: deep copy of Array", () => {
  expect(cloneDeepTest(arr) === arr).toBe(false);
});

// 2depth이상의 배열에서 깊은복사 여부
test("cloneDeepTest: 2depth deep copy of Array", () => {
  expect(cloneDeepTest(arr)[1] === arr[1]).toBe(false);
});

const set = new Set([1, { a: 4, b: 5 }, 3, null]);

test("cloneDeepTest: Set", () => {
  expect(cloneDeepTest(set)).toStrictEqual(set);
});

// 깊은복사 여부
test("cloneDeepTest: deep copy of Set", () => {
  expect(cloneDeepTest(set) === set).toBe(false);
});

// 2depth이상의 Set객체에서 깊은복사 여부
test("cloneDeepTest: 2depth deep copy of Set", () => {
  expect([...cloneDeepTest(set)][1] === [...set][1]).toBe(false);
});

const map = new Map();
map.set(0, "a");
map.set(1, { a: "b", b: "c", set: set });

test("cloneDeepTest: Map", () => {
  expect(cloneDeepTest(map)).toStrictEqual(map);
});

// 깊은복사 여부
test("cloneDeepTest: deep copy of Map", () => {
  expect(cloneDeepTest(map) === map).toBe(false);
});

// 2depth이상의 Map객체에서 깊은복사 여부
test("cloneDeepTest: 2depth deep copy of Map", () => {
  expect([...cloneDeepTest(map).values()][1] === [...map.values()][1]).toBe(false);
});

const date = new Date();

test("cloneDeepTest: Date", () => {
  expect(cloneDeepTest(date)).toStrictEqual(date);
});

// 깊은복사 여부
test("cloneDeepTest: deep copy of Date", () => {
  expect(cloneDeepTest(date) === date).toBe(false);
});
