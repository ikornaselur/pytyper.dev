export default {
  REPORT_URL: 'https://reporter.horus.pw/pytyper',
  EXAMPLE: `{
    "number_int": 123,
    "number_float": 3.0,
    "string": "string",
    "list_single_type": ["a", "b", "c"],
    "list_mixed_type": ["1", 2, 3.0],
    "optional_type": [1, null],
    "nested_dict": {
      "number": 1,
      "string": "value",
      "maybe": "foo"
    },
    "same_nested_dict": {
      "number": 2,
      "string": "different value",
      "maybe": null
    },
    "multipe_levels": {
      "level2": {
        "number": 2,
        "string": "more values",
        "maybe": null
      }
    },
    "nested_invalid": {"numeric-id": 123, "from": "far away"},
    "optional_items": [1, 2, "3", "4", null, 5, 6, null]
  }`,
};
