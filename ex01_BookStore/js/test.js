const a = [ "It has roots in a piece of classical Latin literature from 45 BC,",
        "To generate Lorem Ipsum which looks reasonable",
        "The first line of Lorem Ipsum, 'Lorem ipsum' dolor sit amet" ]

const aString = JSON.stringify(a);
console.log(aString);
const b = JSON.parse(aString);
// console.log();

b.map((p) => {console.log(p)})