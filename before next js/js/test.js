// const a = [
//     {
//         category: 'Country :',
//         value: 'India',
//     },
//     {
//         category: 'Language :',
//         value: 'Bengali',
//     },
//     {
//         category: 'Genre :',
//         value: 'Fiction',
//     },
//     {
//         category: 'Publication Date :',
//         value: '2008',
//     }
// ]

// const aString = JSON.stringify(a);
// console.log(aString);
// const b = JSON.parse(aString);
// b.map((q) => {
//     console.log(`${q.category} ${q.value}`);
// })
// console.log();
// ==================================================================

const x = new Set();
x.add({
    category: 'Country :',
    value: 'India',
});
x.add({
    category: 'Language :',
    value: 'Bengali',
});
x.add({
    category: 'Genre :',
    value: 'Fiction',
});
x.add({
    category: 'Publication Date :',
    value: '2008',
});
console.log(x);
x.forEach((y) => {
    console.log(y);
    console.log(typeof y);
})
console.log('TYPE = ',typeof x);
