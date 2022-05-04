import { comp, step, trace, filter, map } from "@thi.ng/transducers";
import grayMatter from 'gray-matter';

/*
 {
  id: 'I_kwDOG-ZMMM5IzadX',
  title: 'Match type array and numbered',
 body: '\n' +
    'Conditional type switch on Array vs Object vs subtyped object\n' +
    '\n' +
    '```typescript\n' +
    'type DetectArray<T> = number extends keyof T ? true : false;\n' +
    'DetectArray<string[]> // true\n' +
    'DetectArray<{ [k: number]: unknown } // true\n' +
    '\n' +
    'type DetectStringObj<T> = string extends keyof T ? true : false;\n' +
    'DetectArray<{ [k: string]: unknown } // true\n' +
    'DetectArray<{ x: string } // false\n' +
    '```\n',
  data: {
    title: '#7,Match type array and numbered',
    author: [ 'Ja0nz' ],
    date: 2022-04-26T10:33:00.000Z,
    tags: [ 'typescript' ],
    draft: false,
    milestone: 'micro',
    timestamp: 1650969180000,
    state: 'CLOSED'
  }
  }
 */

const xform = comp(
    map(i => {
        const p = grayMatter(i.body);
        return {...i, body: p.content, data: p.data};
    }),
    trace("oh"),
);

export default step(xform);
