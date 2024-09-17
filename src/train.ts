// MIT TASK - ZT

function yagonaSon(a: number[]): number {
  const b: { [key: number]: number } = {};

  a.forEach(a => {
      b[a] = (b[a] || 0) + 1;
  });

  let c = 0;
  for (const num in b) {
      if (b[num] === 1) {
          c += Number(num);
      }
  }

  return c;
}

console.log(yagonaSon([1, 2, 3, 2, 5]));


// // MIT TASK - ZS
// function birinchi(str: string): number {
//   const charCount: { [key: string]: number } = {};

//   for (let i = 0; i < str.length; i++) {
//     const char = str[i];
//     if (charCount[char]) {
//       charCount[char]++;
//     } else {
//       charCount[char] = 1;
//     }
//   }

//   for (let i = 0; i < str.length; i++) {
//     const char = str[i];
//     if (charCount[char] === 1) {
//       return i;
//     }
//   }

//   return -1;
// }

// console.log(birinchi("aabbc"));


// // MIT TASK - ZQ
// function counter(str: string): { number: number, letter: number } {
//   let a = 0;
//   let b = 0;

//   for (let char of str) {
//     if (!isNaN(Number(char))) {
//       a++;
//     } else if (char.match(/[a-zA-Z]/)) {
//       b++;
//     }
//   }

//   return { number: a, letter: b };
// }

// console.log(counter("string152%¥^$&^$&%@$#*^$@!@#$%^12345323fdgghfdsgh"));

// // MIT TASK - ZP
// function nusxaQidir(a: number[]): number[] {
//   const nusxa: number[] = [];
//   const qidir: number[] = [];

//   a.forEach((b) => {
//     if (qidir.includes(b) && !nusxa.includes(b)) {
//       nusxa.push(b);
//     }
//     qidir.push(b);
//   });

//   return nusxa;
// }

// console.log(nusxaQidir([1, 2, 3, 12, 13, 12, 13, 7, 9, 7, 4, 5, 4, 3, 4]));

// // MIT TASK - ZO
// function Balance(a: string): boolean {
//     let b = 0;
//     let c = 0;
  
//     for (let i = 0; i < a.length; i++) {
//       if (a[i] === '(') {
//         b++;
//       } else if (a[i] === ')') {
//         c++;
//       }
//     }
  
//     return b === c;
//   }
  
//   console.log(Balance("sam()(qavs)balance()ichida"));
//   console.log(Balance("()string(qavs(ichida)balance"));

// // MIT TASK - ZN
// function rotate(a: number[], num: number): number[] {
//   const rot = [...a.slice(-num), ...a.slice(0, a.length - num)];
//   return rot;
// }

// console.log(rotate([1, 2, 3, 4, 5, 6], 3));

// MIT TASK - ZM
// function aylantir(a: number): string {
//     return a.toString().split('').reverse().join('');
//   };

//   console.log(aylantir(12345678910111214));

// // MIT TASK - Zl

// function kebabCase(a: string): string {
//   return a
//     .toLowerCase()
//     .replace(/\s+/g, '-') 
//     .replace(/[^a-z0-9-]/g, ''); 
// }

// console.log(kebabCase("I love Kebab and I adore Burak Kebabs"));



// // MIT TASk - ZK
// function beshSoniya(): void {
//   let i = 0;
//   const aylanish = setInterval(() => {
//     console.log(i + 1);
//     i++;
//     if (i >= 5) {
//       clearInterval(aylanish);
//     }
//   }, 1000);
// }

// beshSoniya();

// // MIT TASK - ZJ
// function nestedArray(arr: (number | (number | any[])[])[]): number {
//   let a = 0;
//   for (const element of arr) {
//     if (Array.isArray(element)) {
//       a += nestedArray(element);
//     } else {
//       a += element;
//     }
//   }
//   return a;
// }

// console.log(nestedArray([1, [1, 4, [6]]]));


// //  MIT TASK - ZI 
// function HelloWorld(a: string): Promise<string> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(a);
//     }, 3000);
//   });
// }

// HelloWorld("Hello World").then((a) => console.log(a));

// //  MIT TASK - ZH
// function tushibQoldi(a: number[]): number[] {
//     let b = a[0];
//     for (let i = 1; i < a.length; i++) {
//       if (a[i] > b) {
//         b = a[i];
//       }
//     }
  
//     const result: number[] = [];
  
//     for (let i = 1; i <= b; i++) {
//       if (!a.includes(i)) {
//         result.push(i);
//       }
//     }
  
//     return result;
//   }

//   console.log(tushibQoldi([1, 2, 3, 5, 9, 13]));
  

// // ZG MIT TASK 
// function snakeCase(a: string): string {
//   return a
//     .toLowerCase()
//     .replace(/\s+/g, '_')
//     .replace(/[^a-z0-9_]/g, '');
// }

// console.log(snakeCase('assalamu alaykum mani ismim Samandar'));


// function cap(s: string): string {
//   return s.split(' ').map(w => {
//     if (w.length > 2) {
//       return w.charAt(0).toUpperCase() + w.slice(1);
//     } else {
//       return w;
//     }
//   }).join(' ');
// }

// console.log(cap('name should be a string'));

// //  MIT TASK - ZE
// function ikkiBolsaOchir(string: string): string {
//     let result = '';
    
//     for (let i = 0; i < string.length; i++) {
//       if (result.indexOf(string[i]) === -1) {
//         result += string[i];
//       }
//     }
    
//     return result;
//   }
  
//   console.log(ikkiBolsaOchir('arralayotganda'));

// //  MIT TASK - ZD
// function TASKZD(a: number, b: number[], c: number) {
//     const d = [...b];
//     d[a] = c;
//     return d;
//   }
  
//   console.log(TASKZD(1, [1,3,7,2], 2));

// // MIT TASK - ZC

// function Fahrenheit(selsiy: number): number {
//     return (selsiy * 9 / 5) + 32;
//   }
  
//   console.log(Fahrenheit(0));

// // MIT TASK - ZB
// function randomBetween(min: number, max: number): number {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
//   console.log(randomBetween(30, 50));

// // MIT TASK Z
// function sumEvens(arr: number[]): number {
//     return arr.filter(num => num % 2 === 0).reduce((a, b) => a + b, 0);
// }

// console.log(sumEvens([1, 2, 3])); 
// console.log(sumEvens([1, 2, 3, 4])); 

// // MIT TASK - Y
// function findIntersection<T>(arr1: T[], arr2: T[]): T[] {
//   return arr1.filter(value => arr2.includes(value));
// }

// console.log(findIntersection([1,2,3], [3,2,0]));


// // MIT TASK - X

// function sanaNechtaBor(obj: { [key: string]: any }, target: string): number {
//     let count = 0;
  
//     function qidir(obj: { [key: string]: any }): void {
//       Object.keys(obj).forEach((key) => {
//         if (typeof obj[key] === 'object') {
//           qidir(obj[key]);
//         } else if (key === target || obj[key] === target) {
//           count++;
//         }
//       });
//     }
  
//     qidir(obj);
//     return count;
//   }

//   const obj = { model: 'Bugatti', steer: { model: 'HANKOOK', size: 30 } };
//   console.log(sanaNechtaBor(obj, 'model'));

// // MIT TASK - W

// function chunkArray(a:number[], n: number): number[][] {
//     const b:number[][] = [];
//     for (let i = 0; i < a.length; i += n) {
//         b.push(a.slice(i, i + n));
//     }
//     return b;
// }

// console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 2));



// // MIT TASK - U 

// function toqSon(a: number): number {
//     let son = 0;
//     for(let i = 0; i < a; i++) {
//         if ( i % 2 !== 0) {
//             son++;
//         }
//     }
//     return son;
// }

// console.log(toqSon(11));

// // MIT TASK - T

// function tartibla(a1: number[], a2: number[]): number[] {
//     return [...a1, ...a2].sort((a, b) => a - b);
//   }
//  console.log(tartibla([1,4, 6], [2, 5, 9]));

 
// // MIT TASK - S

// function yiqildi(a: number[]): number {
//     a.sort((a, b) => a - b);

//     for (let i: number = 0; i < a.length; i++) {
//         if (a[i] !== i + 1) {
//             return i + 1;
//         }
//     }

//     return a.length + 1;
// }

// console.log(yiqildi([1, 2, 3, 5]));


/*  Project Standards
        - Logging standards
        - Naming standards
            1. function, method, variable => CAMEL
            2. class => PASCAL
            3. folder, file => KEBAB
            4.css => SNAKE
        - Error handling


*/

/* Request: 
    Traditinal API ( form POST )
    Rest API
    GraphQL API 
*/

/* Frontend Development: 
    Traditional API => SSR Adminka (Burak)
    Rest API => SPA Burak Project
*/

/* Cookies: 
even request join
self destroyed
*/

/* Validation:
    Frontend validation
    Backend validation
    Database validation
*/