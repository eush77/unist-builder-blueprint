'use strict';

var unistToU = require('..');

var test = require('tape'),
    u = require('unist-builder');

var vm = require('vm');


test('example', function (t) {
  var ast = {
    "type": "root",
    "children": [
      {
        "type": "subtree",
        "id": 1
      },
      {
        "type": "subtree",
        "id": 2,
        "children": [
          {
            "type": "node",
            "children": [
              {
                "type": "leaf",
                "value": "leaf-1"
              },
              {
                "type": "leaf",
                "value": "leaf-2"
              }
            ]
          },
          {
            "type": "leaf",
            "id": 3,
            "value": "leaf-3"
          }
        ]
      }
    ]
  };

  var code = unistToU(ast);

  t.equal(code, [
    "u('root', [",
    "    u('subtree', { id: 1 }),",
    "    u('subtree', { id: 2 }, [",
    "        u('node', [",
    "            u('leaf', 'leaf-1'),",
    "            u('leaf', 'leaf-2')",
    "        ]),",
    "        u('leaf', { id: 3 }, 'leaf-3')",
    "    ])",
    "])"
  ].join('\n'));

  t.deepEqual(vm.runInNewContext(code, { u: u }), ast);
  t.end();
});
